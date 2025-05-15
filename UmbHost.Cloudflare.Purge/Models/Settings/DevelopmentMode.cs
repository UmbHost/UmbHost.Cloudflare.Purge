using System.Text.Json.Serialization;
using UmbHost.Cloudflare.Purge.Enums;

namespace UmbHost.Cloudflare.Purge.Models.Settings
{
    public class DevelopmentMode
    {
        [JsonPropertyName("id")]
        public required string Id { get; set; }
        [JsonPropertyName("value")]
        public SettingsValueEnum Value { get; set; }
        [JsonPropertyName("modified_on")]
        public DateTime ModifiedOn { get; set; }
        [JsonPropertyName("time_remaining")]
        public int TimeRemaining { get; set; }
        [JsonPropertyName("editable")]
        public bool Editable { get; set; }
    }

}
