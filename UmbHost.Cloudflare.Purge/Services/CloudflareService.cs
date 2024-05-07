﻿using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using UmbHost.Cloudflare.Purge.Enums;
using UmbHost.Cloudflare.Purge.Interfaces;
using UmbHost.Cloudflare.Purge.Models;
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
            PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower,
        };

        public async Task<bool> PurgeAll()
        {
            if (_configuration.Disabled)
            {
                return false;
            }

            using var response = await _httpClient.PostAsync($"{Consts.CloudflareApiUrl}client/{Consts.CloudflareApiVersion}/zones/{_configuration.ZoneId}/purge_cache", GenerateHttpContent(new PurgeAll{ PurgeEverything = true }));
            var body = await response.Content.ReadAsStringAsync();
            var result = JsonSerializer.Deserialize<PurgeResponse>(body);

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

            PurgeResponse? result = null;
            for (var i = 0; i < purgeRequest.Files.Length; i += 30)
            {
                var pr = new PurgeFilesRequest
                {
                    Files = purgeRequest.Files.Skip(i).Take(30).ToArray()
                };

                using var response = await _httpClient.PostAsync($"{Consts.CloudflareApiUrl}client/{Consts.CloudflareApiVersion}/zones/{_configuration.ZoneId}/purge_cache", GenerateHttpContent(pr));
                var body = await response.Content.ReadAsStringAsync();
                result = JsonSerializer.Deserialize<PurgeResponse>(body);

                if (response.IsSuccessStatusCode)
                {
                    LogPurgeUrls(purgeRequest.Files);
                    return true;
                }
            }

            logger.LogError($"{localizedTextService.Localize(Consts.Localizations.Area, Consts.Localizations.PurgeCdnErrorMessage)}: {JsonSerializer.Serialize(result?.Errors)}");
            return false;
        }

        private void LogPurgeUrls(string[] purgeUrls)
        {
            foreach (var purgeUrl in purgeUrls)
            {
                logger.LogInformation($"{localizedTextService.Localize(Consts.Localizations.Area, Consts.Localizations.PurgedUrlAlias)}: {purgeUrl}");
            }
        }

        private StringContent GenerateHttpContent<T>(T purgeRequest)
        {
            var jsonData = JsonSerializer.Serialize(purgeRequest, JsonSerializerOptions);

            var httpContent = new StringContent(jsonData, Encoding.UTF8, "application/json");

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
            
            return httpContent;
        }
    }
}
