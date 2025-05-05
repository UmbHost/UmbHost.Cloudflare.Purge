using System.Text.Json.Serialization;

namespace UmbHost.Cloudflare.Purge.Models
{
    public class PurgeResult
    {
        [JsonPropertyName("id")]
        public string Id { get; set; } = string.Empty;
    }
}
