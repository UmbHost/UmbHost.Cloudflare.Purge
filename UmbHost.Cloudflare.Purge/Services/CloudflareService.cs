using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using UmbHost.Cloudflare.Purge.Enums;
using UmbHost.Cloudflare.Purge.Interfaces;
using UmbHost.Cloudflare.Purge.Models;
using UmbHost.Cloudflare.Purge.Models.Settings;
using Umbraco.Cms.Core.Services;
using Umbraco.Extensions;

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

            using var response = await _httpClient.PostAsync($"{Consts.CloudflareApiUrl}client/{Consts.CloudflareApiVersion}/zones/{_configuration.ZoneId}/purge_cache", GenerateHttpContent(new PurgeAll{ PurgeEverything = true }));
            var body = await response.Content.ReadAsStringAsync();
            var result = JsonSerializer.Deserialize<CloudflareResponseArray>(body);

            if (response.IsSuccessStatusCode)
            {
                return true;
            }

            logger.LogError($"{localizedTextService.Localize(Consts.Localizations.Area, Consts.Localizations.PurgeCdnErrorMessage)}: {JsonSerializer.Serialize(result?.Errors)}");
            return false;
        }

        public async Task<bool> CustomPurge(PurgeFilesRequest purgeRequest)
        {
            if (_configuration.Disabled)
            {
                return false;
            }

            CloudflareResponseArray? result = null;
            for (var i = 0; i < purgeRequest.Files.Length; i += 30)
            {
                var pr = new PurgeFilesRequest
                {
                    Files = purgeRequest.Files.Skip(i).Take(30).ToArray()
                };

                using var response = await _httpClient.PostAsync($"{Consts.CloudflareApiUrl}client/{Consts.CloudflareApiVersion}/zones/{_configuration.ZoneId}/purge_cache", GenerateHttpContent(pr));
                var body = await response.Content.ReadAsStringAsync();
                result = JsonSerializer.Deserialize<CloudflareResponseArray>(body);

                if (response.IsSuccessStatusCode)
                {
                    LogPurgeUrls(purgeRequest.Files);
                    return true;
                }
            }

            logger.LogError($"{localizedTextService.Localize(Consts.Localizations.Area, Consts.Localizations.PurgeCdnErrorMessage)}: {JsonSerializer.Serialize(result?.Errors)}");
            return false;
        }

        public async Task<DevelopmentMode?> ToggleDevelopmentMode(NewDevelopmentMode developmentMode)
        {
            if (_configuration.Disabled)
            {
                return null;
            }

            CloudflareResponseObject? result = null;
            using var response = await _httpClient.PatchAsync($"{Consts.CloudflareApiUrl}client/{Consts.CloudflareApiVersion}/zones/{_configuration.ZoneId}/settings/development_mode", GenerateHttpContent(developmentMode));
            var body = await response.Content.ReadAsStringAsync();
            result = JsonSerializer.Deserialize<CloudflareResponseObject>(body);

            if (response.IsSuccessStatusCode)
            {
                return result.Result.Deserialize<DevelopmentMode>();
            }

            logger.LogError($"{localizedTextService.Localize(Consts.Localizations.Area, Consts.Localizations.PurgeCdnErrorMessage)}: {JsonSerializer.Serialize(result?.Errors)}");
            return null;
        }

        public async Task<AllSettings?> GetAllZoneSettings()
        {
            if (_configuration.Disabled)
            {
                return null;
            }

            //var client = _httpClient.DefaultRequestHeaders = GenerateRequestHeaders();

            GenerateRequestHeaders();

            using var response = await _httpClient.GetAsync($"{Consts.CloudflareApiUrl}client/{Consts.CloudflareApiVersion}/zones/{_configuration.ZoneId}/settings");
            var body = await response.Content.ReadAsStringAsync();
            var result = JsonSerializer.Deserialize<CloudflareResponseArray>(body);

            var results = result.Result;

            var allSettings = new AllSettings();

            foreach (var json in results)
            {
                var idToken = json["id"];
                if (idToken == null)
                {
                    throw new InvalidOperationException($"The setting does not have an id property.\n{json}");
                }

                var id = idToken.GetValue<string>();

                switch (id)
                {
                    //case "always_online":
                    //    allSettings.AlwaysOnline = json.ToObject<AlwaysOnline>();
                    //    break;
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
                    //case "browser_cache_ttl":
                    //    allSettings.BrowserCacheTtl = json.ToObject<BrowserCacheTtl>();
                    //    break;
                    //case "cache_level":
                    //    allSettings.CacheLevel = json.ToObject<CacheLevel>();
                    //    break;
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
                    default:
                        break;
                }
            }

            if (response.IsSuccessStatusCode)
            {
                return allSettings;
            }

            logger.LogError($"{localizedTextService.Localize(Consts.Localizations.Area, Consts.Localizations.PurgeCdnErrorMessage)}: {JsonSerializer.Serialize(result?.Errors)}");
            return null;
        }

        private void LogPurgeUrls(string[] purgeUrls)
        {
            foreach (var purgeUrl in purgeUrls)
            {
                logger.LogInformation($"{localizedTextService.Localize(Consts.Localizations.Area, Consts.Localizations.PurgedUrlAlias)}: {purgeUrl}");
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
                case AuthType.Global:
                    _httpClient.DefaultRequestHeaders.Add(Consts.HeaderKeys.XAuthEmail, _configuration.EmailAddress);
                    _httpClient.DefaultRequestHeaders.Add(Consts.HeaderKeys.XAuthKey, _configuration.AuthKey);
                    break;
                case AuthType.Bearer:
                    _httpClient.DefaultRequestHeaders.Add(Consts.HeaderKeys.Authorization, $"Bearer {_configuration.AuthKey}");
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }
    }
}
