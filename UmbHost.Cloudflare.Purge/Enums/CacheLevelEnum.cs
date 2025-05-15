using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace UmbHost.Cloudflare.Purge.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum CacheLevelEnum
    {
        [EnumMember(Value = "aggressive")]
        Aggressive,
        [EnumMember(Value = "basic")]
        Basic,
        [EnumMember(Value = "simplified")]
        Simplified
    }
}
