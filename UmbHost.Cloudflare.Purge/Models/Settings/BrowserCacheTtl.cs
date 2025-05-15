using System.Text.Json.Serialization;

namespace UmbHost.Cloudflare.Purge.Models.Settings
{
    public class BrowserCacheTtl
    {
        [JsonPropertyName("id")]
        public required string Id { get; set; }
        [JsonPropertyName("value")]
        public Enums.BrowserCacheTtlEnum Value { get; set; }
        [JsonPropertyName("modified_on")]
        public DateTime? ModifiedOn { get; set; }
        [JsonPropertyName("editable")]
        public bool Editable { get; set; }
    }
}
