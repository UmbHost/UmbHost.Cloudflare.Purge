using UmbHost.Cloudflare.Purge.Enums;

namespace UmbHost.Cloudflare.Purge.Models
{
    internal class UmbHostCloudflarePurge
    {
        public required string ZoneId { get; set; }
        public string? EmailAddress { get; set; }
        public required string AuthKey { get; set; }
        public AuthType AuthType { get; set; } = AuthType.Global;
    }
}
