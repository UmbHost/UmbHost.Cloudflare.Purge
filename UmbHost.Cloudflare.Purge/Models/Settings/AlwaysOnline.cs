using System.Text.Json.Serialization;
using UmbHost.Cloudflare.Purge.Enums;

namespace UmbHost.Cloudflare.Purge.Models.Settings
{
    public class AlwaysOnline
    {
        [JsonPropertyName("id")]
        public required string Id { get; set; }
        [JsonPropertyName("value")]
        public SettingsValue Value { get; set; }
        [JsonPropertyName("modified_on")]
        public DateTime? ModifiedOn { get; set; }
        [JsonPropertyName("editable")]
        public bool Editable { get; set; }
    }
}
