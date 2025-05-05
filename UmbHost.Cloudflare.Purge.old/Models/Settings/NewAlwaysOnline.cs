using System.Text.Json.Serialization;

namespace UmbHost.Cloudflare.Purge.Models.Settings
{
    public class NewAlwaysOnline
    {
        [JsonPropertyName("value")]
        public required string Value { get; set; }
    }
}
