using UmbHost.Cloudflare.Purge.Enums;

namespace UmbHost.Cloudflare.Purge.Models
{
    public class UmbHostCloudflarePurge
    {
        public required string ZoneId { get; set; }
        public string? EmailAddress { get; set; }
        public required string AuthKey { get; set; }
        public AuthType AuthType { get; set; } = AuthType.Global;
        public NotificationHandlers NotificationHandlers { get; set; } = new();
        public bool Disabled { get; set; } = false;
        public TreeMenuItems TreeMenuItems = new();
    }

    public class NotificationHandlers
    {
        public bool ContentDeletedNotificationEnabled { get; set; } = true;
        public bool ContentPublishedNotificationEnabled { get; set; } = true;
        public bool ContentUnpublishedNotificationEnabled { get; set; } = true;
        public bool MediaDeletedNotificationEnabled { get; set; } = true;
        public bool MediaSavedNotificationEnabled { get; set; } = true;
    }

    public class TreeMenuItems
    {
        public bool TreeMenuItemsEnabled { get; set; } = true;
        public bool ContentTreeMenuItemEnabled { get; set; } = true;
        public bool MediaFolderTreeMenuItemEnabled { get; set; } = true;
        public bool MediaItemTreeMenuItemEnabled { get; set; } = true;
    }
}
