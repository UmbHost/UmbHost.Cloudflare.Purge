using Microsoft.Extensions.Options;
using UmbHost.Cloudflare.Purge.Interfaces;
using UmbHost.Cloudflare.Purge.Models;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Notifications;

namespace UmbHost.Cloudflare.Purge.NotificationHandlers.Content
{
    /// <summary>
    /// Runs before a move completes: a move always changes the node's (and its descendants') URLs,
    /// so it captures the old self+descendant URLs on the shared notification State for
    /// <see cref="ContentMovedNotificationHandler"/> to purge afterwards.
    /// </summary>
    internal class ContentMovingNotificationHandler(ICloudflarePurgeUrlService purgeUrlService, IOptions<UmbHostCloudflarePurge> configuration)
        : INotificationAsyncHandler<ContentMovingNotification>
    {
        private readonly UmbHostCloudflarePurge _configuration = configuration.Value;

        public Task HandleAsync(ContentMovingNotification notification, CancellationToken cancellationToken)
        {
            if (_configuration is { Disabled: false, NotificationHandlers.ContentMovedNotificationEnabled: true })
            {
                var urlsToPurge = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
                foreach (var moveInfo in notification.MoveInfoCollection)
                {
                    urlsToPurge.UnionWith(purgeUrlService.GetPublishedSubtreeUrls(moveInfo.Entity.Id));
                }

                if (urlsToPurge.Count > 0)
                {
                    notification.State[Constants.UrlChangeOldUrlsStateKey] = urlsToPurge;
                }
            }

            return Task.CompletedTask;
        }
    }
}
