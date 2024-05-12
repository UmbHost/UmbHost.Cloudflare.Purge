using System.Text.Json.Serialization;

namespace UmbHost.Cloudflare.Purge.Models
{
    public class Setting
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }
        [JsonPropertyName("value")]
        public object Value { get; set; }
        [JsonPropertyName("modified_on")]
        public DateTime? ModifiedOn { get; set; }
        [JsonPropertyName("editable")]
        public bool Editable { get; set; }
        [JsonPropertyName("time_remaining")]
        public int TimeRemaining { get; set; }
        [JsonPropertyName("certificate_status")]
        public string? CertificateStatus { get; set; }
        [JsonPropertyName("validation_errors")]
        public object[]? ValidationErrors { get; set; }
    }
}
