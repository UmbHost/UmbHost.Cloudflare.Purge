﻿using UmbHost.Cloudflare.Purge.Enums;

namespace UmbHost.Cloudflare.Purge.Models
{
    internal class UmbHostCloudflarePurge
    {
        public required string ZoneId { get; set; }
        public string? EmailAddress { get; set; }
        public required string AuthKey { get; set; }
        public AuthType AuthType { get; set; } = AuthType.Global;
        public NotificationHandlers NotificationHandlers { get; set; } = new();
    }

    internal class NotificationHandlers
    {
        public bool ContentDeletedNotificationEnabled = true;
        public bool ContentPublishedNotificationEnabled = true;
        public bool ContentUnpublishedNotificationEnabled = true;
        public bool MediaDeletedNotificationEnabled = true;
        public bool MediaSavedNotificationEnabled = true;
    }
}
