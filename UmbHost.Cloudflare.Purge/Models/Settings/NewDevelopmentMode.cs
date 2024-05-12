using Newtonsoft.Json;

namespace UmbHost.Cloudflare.Purge.Models.Settings
{
    public class NewDevelopmentMode
    {
        [JsonProperty("value")]
        public required string Value { get; set; }
    }
}
