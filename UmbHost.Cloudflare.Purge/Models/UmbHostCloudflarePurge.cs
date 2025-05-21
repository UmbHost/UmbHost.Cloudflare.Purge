using UmbHost.Cloudflare.Purge.Enums;

namespace UmbHost.Cloudflare.Purge.Models
{
    public class UmbHostCloudflarePurge
    {
        public required UmbHostCloudflarePurgeZone[] Zones { get; set; } = [];
        public string? EmailAddress { get; set; }
        public required string AuthKey { get; set; }
        public AuthTypeEnum AuthType { get; set; } = AuthTypeEnum.Global;
        public NotificationHandlers NotificationHandlers { get; set; } = new();
        public bool Disabled { get; set; } = false;
    }

    public class NotificationHandlers
    {
        public bool ContentDeletedNotificationEnabled { get; set; } = true;
        public bool ContentPublishedNotificationEnabled { get; set; } = true;
        public bool ContentUnpublishedNotificationEnabled { get; set; } = true;
        public bool MediaDeletedNotificationEnabled { get; set; } = true;
        public bool MediaSavedNotificationEnabled { get; set; } = true;
    }

    public class UmbHostCloudflarePurgeZone
    {
        public required string Domain { get; set; }
        public required string ZoneId { get; set; }
    }
}
