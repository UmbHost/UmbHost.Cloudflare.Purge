using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Text;
using System.Text.Json;
using UmbHost.Cloudflare.Purge.Enums;
using UmbHost.Cloudflare.Purge.Interfaces;
using UmbHost.Cloudflare.Purge.Models;
using UmbHost.Cloudflare.Purge.Models.Settings;
using Umbraco.Cms.Core.Services;
using Umbraco.Extensions;
using BrowserCacheTtl = UmbHost.Cloudflare.Purge.Models.Settings.BrowserCacheTtl;
using CacheLevel = UmbHost.Cloudflare.Purge.Models.Settings.CacheLevel;

namespace UmbHost.Cloudflare.Purge.Services
{
    internal class CloudflareService(IHttpClientFactory httpClientFactory, IOptions<UmbHostCloudflarePurge> configuration, ILogger<CloudflareService> logger, ILocalizedTextService localizedTextService) : ICloudflareService
    {
        private readonly HttpClient _httpClient = httpClientFactory.CreateClient();
        private readonly UmbHostCloudflarePurge _configuration = configuration.Value;
        private static readonly JsonSerializerOptions JsonSerializerOptions = new()
        {
            PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower
        };

        public async Task<bool> PurgeAll()
        {
            if (_configuration.Disabled)
            {
                return false;
            }

            var anyErrors = false;
            foreach (var zone in _configuration.Zones)
            {
                using var response = await _httpClient.PostAsync($"{Constants.CloudflareApiUrl}client/{Constants.CloudflareApiVersion}/zones/{zone.ZoneId}/purge_cache", GenerateHttpContent(new PurgeAll { PurgeEverything = true }));
                var body = await response.Content.ReadAsStringAsync();
                var result = JsonSerializer.Deserialize<CloudflareResponseArray>(body);
                if (!response.IsSuccessStatusCode || result is { Success: false })
                {
                    anyErrors = true;
                    logger.LogError($"{localizedTextService.Localize(Constants.Localizations.Area, Constants.Localizations.PurgeCdnErrorMessage)}: {JsonSerializer.Serialize(result?.Errors)}");
                }
            }
            return !anyErrors;
        }

        // Pseudocode:
        // 1. Filter purgeRequest.Files for valid absolute HTTP/HTTPS URLs.
        // 2. For each URL, find the matching zone from _configuration.Zones where the URL's hostname contains the zone's domain (case-insensitive).
        // 3. Group the URLs by the matched zone.
        // 4. For each group (zone), send the purge request with the correct zoneId and up to 30 URLs per request.

        public async Task<bool> CustomPurge(PurgeFilesRequest purgeRequest)
        {
            if (_configuration.Disabled)
            {
                return false;
            }

            // Step 1: Filter valid URLs and parse them
            var validUrls = purgeRequest.Files
                .Where(url => !string.IsNullOrWhiteSpace(url)
                              && Uri.TryCreate(url, UriKind.Absolute, out var uriResult)
                              && (uriResult.Scheme == Uri.UriSchemeHttp || uriResult.Scheme == Uri.UriSchemeHttps))
                .Select(url => new { Url = url, Uri = new Uri(url) })
                .ToList();

            // Step 2: Group URLs by zone
            var zoneGroups = validUrls
                .SelectMany(item =>
                    _configuration.Zones
                        .Where(zone => item.Uri.Host.Contains(zone.Domain, StringComparison.InvariantCultureIgnoreCase))
                        .Select(zone => new { Zone = zone, Url = item.Url })
                )
                .GroupBy(x => x.Zone)
                .ToList();

            bool anyErrors = validUrls.Count == 0;
            CloudflareResponseObject? result = null;

            // Step 3: Iterate over each zone group and send requests in batches of 30
            foreach (var group in zoneGroups)
            {
                var zone = group.Key;
                var urls = group.Select(x => x.Url).ToArray();

                for (var i = 0; i < urls.Length; i += 30)
                {
                    var batch = urls.Skip(i).Take(30).ToArray();
                    var pr = new PurgeFilesRequest { Files = batch };

                    using var response = await _httpClient.PostAsync(
                        $"{Constants.CloudflareApiUrl}client/{Constants.CloudflareApiVersion}/zones/{zone.ZoneId}/purge_cache",
                        GenerateHttpContent(pr)
                    );
                    var body = await response.Content.ReadAsStringAsync();
                    result = JsonSerializer.Deserialize<CloudflareResponseObject>(body);

                    if (response.IsSuccessStatusCode && result is { Success: true })
                    {
                        var purgeResult = result.Result.Deserialize<PurgeResult>();
                        if (purgeResult != null)
                            LogPurgeUrls(batch, purgeResult.Id);
                    }
                    else
                    {
                        anyErrors = true;
                        logger.LogError($"{localizedTextService.Localize(Constants.Localizations.Area, Constants.Localizations.PurgeCdnErrorMessage)}: {JsonSerializer.Serialize(result?.Errors)}");
                    }
                }
            }

            return !anyErrors;
        }

        public async Task<DevelopmentMode?> ToggleDevelopmentMode(NewDevelopmentMode developmentMode, string zoneId)
        {
            if (_configuration.Disabled)
            {
                return null;
            }

            using var response = await _httpClient.PatchAsync($"{Constants.CloudflareApiUrl}client/{Constants.CloudflareApiVersion}/zones/{zoneId}/settings/development_mode", GenerateHttpContent(developmentMode));
            var body = await response.Content.ReadAsStringAsync();
            var result = JsonSerializer.Deserialize<CloudflareResponseObject>(body);

            if (response.IsSuccessStatusCode && result is { Success: true })
            {
                return result.Result.Deserialize<DevelopmentMode>();
            }

            logger.LogError($"{JsonSerializer.Serialize(result?.Errors)}");
            return null;
        }

        public async Task<CacheLevel?> ToggleCacheLevel(NewCacheLevel cacheLevel, string zoneId)
        {
            if (_configuration.Disabled)
            {
                return null;
            }

            using var response = await _httpClient.PatchAsync($"{Constants.CloudflareApiUrl}client/{Constants.CloudflareApiVersion}/zones/{zoneId}/settings/cache_level", GenerateHttpContent(cacheLevel));
            var body = await response.Content.ReadAsStringAsync();
            var result = JsonSerializer.Deserialize<CloudflareResponseObject>(body);

            if (response.IsSuccessStatusCode && result is { Success: true })
            {
                return result.Result.Deserialize<CacheLevel>();
            }

            logger.LogError($"{JsonSerializer.Serialize(result?.Errors)}");
            return null;
        }

        public async Task<AlwaysOnline?> ToggleAlwaysOnline(NewAlwaysOnline alwaysOnline, string zoneId)
        {
            if (_configuration.Disabled)
            {
                return null;
            }

            using var response = await _httpClient.PatchAsync($"{Constants.CloudflareApiUrl}client/{Constants.CloudflareApiVersion}/zones/{zoneId}/settings/always_online", GenerateHttpContent(alwaysOnline));
            var body = await response.Content.ReadAsStringAsync();
            var result = JsonSerializer.Deserialize<CloudflareResponseObject>(body);

            if (response.IsSuccessStatusCode && result is { Success: true })
            {
                return result.Result.Deserialize<AlwaysOnline>();
            }

            logger.LogError($"{JsonSerializer.Serialize(result?.Errors)}");
            return null;
        }

        public async Task<BrowserCacheTtl?> ToggleBrowserCacheTtl(NewBrowserCacheTtl browserCacheTtl, string zoneId)
        {
            if (_configuration.Disabled)
            {
                return null;
            }

            using var response = await _httpClient.PatchAsync($"{Constants.CloudflareApiUrl}client/{Constants.CloudflareApiVersion}/zones/{zoneId}/settings/browser_cache_ttl", GenerateHttpContent(browserCacheTtl));
            var body = await response.Content.ReadAsStringAsync();
            var result = JsonSerializer.Deserialize<CloudflareResponseObject>(body);

            if (response.IsSuccessStatusCode && result is { Success: true })
            {
                return result.Result.Deserialize<BrowserCacheTtl>();
            }

            logger.LogError($"{localizedTextService.Localize(Constants.Localizations.Area, Constants.Localizations.PurgeCdnErrorMessage)}: {JsonSerializer.Serialize(result?.Errors)}");
            return null;
        }

        public async Task<AllSettings?> GetAllZoneSettings(string zoneId)
        {
            if (_configuration.Disabled)
            {
                return null;
            }

            //var client = _httpClient.DefaultRequestHeaders = GenerateRequestHeaders();

            GenerateRequestHeaders();

            using var response = await _httpClient.GetAsync($"{Constants.CloudflareApiUrl}client/{Constants.CloudflareApiVersion}/zones/{zoneId}/settings");
            var body = await response.Content.ReadAsStringAsync();
            var result = JsonSerializer.Deserialize<CloudflareResponseArray>(body);

            var results = result?.Result;
            var allSettings = new AllSettings();

            if (results != null)
            {
                foreach (var json in results)
                {
                    if (json == null)
                        continue;

                    var idToken = json["id"];
                    if (idToken == null)
                    {
                        throw new InvalidOperationException($"The setting does not have an id property.\n{json}");
                    }

                    var id = idToken.GetValue<string>();

                    switch (id)
                    {
                        case "always_online":
                            allSettings.AlwaysOnline = json.Deserialize<AlwaysOnline>();
                            break;
                        //case "always_use_https":
                        //    allSettings.AlwaysUseHttps = json.ToObject<AlwaysUseHttps>();
                        //    break;
                        //case "automatic_https_rewrites":
                        //    allSettings.AutomaticHttpsRewrites = json.ToObject<AutomaticHttpsRewrites>();
                        //    break;
                        //case "brotli":
                        //    allSettings.Brotli = json.ToObject<Brotli>();
                        //    break;
                        //case "browser_check":
                        //    allSettings.BrowserCheck = json.ToObject<BrowserCheck>();
                        //    break;
                        //case "email_obfuscation":
                        //    allSettings.EmailObfuscation = json.ToObject<EmailObfuscation>();
                        //    break;
                        //case "hotlink_protection":
                        //    allSettings.HotlinkProtection = json.ToObject<HotlinkProtection>();
                        //    break;
                        //case "ip_geolocation":
                        //    allSettings.IpGeolocation = json.ToObject<IpGeolocation>();
                        //    break;
                        //case "mirage":
                        //    allSettings.Mirage = json.ToObject<Mirage>();
                        //    break;
                        case "browser_cache_ttl":
                            allSettings.BrowserCacheTtl = json.Deserialize<BrowserCacheTtl>();
                            break;
                        case "cache_level":
                            allSettings.CacheLevel = json.Deserialize<CacheLevel>();
                            break;
                        //case "polish":
                        //    allSettings.Polish = json.ToObject<Polish>();
                        //    break;
                        //case "rocket_loader":
                        //    allSettings.RocketLoader = json.ToObject<RocketLoader>();
                        //    break;
                        case "development_mode":
                            allSettings.DevelopmentMode = json.Deserialize<DevelopmentMode>();
                            break;
                        //case "minify":
                        //    allSettings.Minify = json.ToObject<Minify>();
                        //    break;
                        //case "security_header":
                        //    allSettings.SecurityHeaderHsts = json.ToObject<SecurityHeaderHsts>();
                        //    break;
                        //case "opportunistic_onion":
                        //    allSettings.OpportunisticOnion = json.ToObject<OpportunisticOnion>();
                        //    break;
                        //case "min_tls_version":
                        //    allSettings.MinimumTlsVersion = json.ToObject<MinimumTlsVersion>();
                        //    break;
                        //case "webp":
                        //    allSettings.WebP = json.ToObject<WebP>();
                        //    break;
                        //case "opportunistic_encryption":
                        //    allSettings.OpportunisticEncryption = json.ToObject<OpportunisticEncryption>();
                        //    break;
                        //case "early_hints":
                        //    allSettings.EarlyHints = json.ToObject<EarlyHints>();
                        //    break;
                    }
                }
            }

            if (response.IsSuccessStatusCode && result is { Success: true })
            {
                return allSettings;
            }

            logger.LogError($"{JsonSerializer.Serialize(result?.Errors)}");
            return null;
        }

        private void LogPurgeUrls(string[] purgeUrls, string id = "")
        {
            logger.LogInformation($"{localizedTextService.Localize(Constants.Localizations.Area, Constants.Localizations.PurgedUrlAlias)}: {id}");
            foreach (var purgeUrl in purgeUrls)
            {
                logger.LogInformation($"{localizedTextService.Localize(Constants.Localizations.Area, Constants.Localizations.PurgedUrlAlias)}: {purgeUrl}");
            }
        }

        private StringContent GenerateHttpContent<T>(T request)
        {
            var jsonData = JsonSerializer.Serialize(request, JsonSerializerOptions);

            var httpContent = new StringContent(jsonData, Encoding.UTF8, "application/json");

            GenerateRequestHeaders();
            
            return httpContent;
        }

        private void GenerateRequestHeaders()
        {
            switch (_configuration.AuthType)
            {
                case AuthTypeEnum.Global:
                    _httpClient.DefaultRequestHeaders.Add(Constants.HeaderKeys.XAuthEmail, _configuration.EmailAddress);
                    _httpClient.DefaultRequestHeaders.Add(Constants.HeaderKeys.XAuthKey, _configuration.AuthKey);
                    break;
                case AuthTypeEnum.Bearer:
                    _httpClient.DefaultRequestHeaders.Add(Constants.HeaderKeys.Authorization, $"Bearer {_configuration.AuthKey}");
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }
    }
}
