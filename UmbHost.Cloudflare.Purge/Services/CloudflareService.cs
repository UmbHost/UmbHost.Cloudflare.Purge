using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using UmbHost.Cloudflare.Purge.Enums;
using UmbHost.Cloudflare.Purge.Interfaces;
using UmbHost.Cloudflare.Purge.Models;

namespace UmbHost.Cloudflare.Purge.Services
{
    internal class CloudflareService(IHttpClientFactory httpClientFactory, IOptions<UmbHostCloudflarePurge> configuration, ILogger<CloudflareService> logger) : ICloudflareService
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

            using var response = await _httpClient.PostAsync($"https://api.cloudflare.com/client/v4/zones/{_configuration.ZoneId}/purge_cache", GenerateHttpContent(new PurgeAll{ PurgeEverything = true }));
            var body = await response.Content.ReadAsStringAsync();
            var result = JsonSerializer.Deserialize<PurgeResponse>(body);

            if (response.IsSuccessStatusCode)
            {
                return true;
            }

            logger.LogError($"Unable to purge CDN, the following errors may help: {JsonSerializer.Serialize(result?.errors)}");
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

                using var response = await _httpClient.PostAsync($"https://api.cloudflare.com/client/v4/zones/{_configuration.ZoneId}/purge_cache", GenerateHttpContent(pr));
                var body = await response.Content.ReadAsStringAsync();
                result = JsonSerializer.Deserialize<PurgeResponse>(body);

                if (response.IsSuccessStatusCode)
                {
                    return true;
                }
            }

            logger.LogError($"Unable to purge CDN, the following errors may help: {JsonSerializer.Serialize(result?.errors)}");
            return false;
        }

        private StringContent GenerateHttpContent<T>(T purgeRequest)
        {
            var jsonData = JsonSerializer.Serialize(purgeRequest, JsonSerializerOptions);

            var httpContent = new StringContent(jsonData, Encoding.UTF8, "application/json");

            switch (_configuration.AuthType)
            {
                case AuthType.Global:
                    _httpClient.DefaultRequestHeaders.Add("X-Auth-Email", _configuration.EmailAddress);
                    _httpClient.DefaultRequestHeaders.Add("X-Auth-Key", _configuration.AuthKey);
                    break;
                case AuthType.Bearer:
                    _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {_configuration.AuthKey}");
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
            
            return httpContent;
        }
    }
}
