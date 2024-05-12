using System.Text.Json.Serialization;

namespace UmbHost.Cloudflare.Purge.Models.Settings
{
    public class NewCacheLevel
    {
        [JsonPropertyName("value")]
        public required string Value { get; set; }
    }
}
