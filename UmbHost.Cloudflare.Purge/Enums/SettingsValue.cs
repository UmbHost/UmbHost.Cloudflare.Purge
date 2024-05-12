using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace UmbHost.Cloudflare.Purge.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum SettingsValue
    {
        [EnumMember(Value = "on")]
        On,
        [EnumMember(Value = "off")]
        Off,
        [EnumMember(Value = "lossless")]
        Lossless,
        [EnumMember(Value = "lossy")]
        Lossy
    }
}
