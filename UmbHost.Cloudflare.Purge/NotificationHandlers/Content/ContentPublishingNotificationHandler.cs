using Microsoft.Extensions.Options;
using UmbHost.Cloudflare.Purge.Interfaces;
using UmbHost.Cloudflare.Purge.Models;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Notifications;

namespace UmbHost.Cloudflare.Purge.NotificationHandlers.Content
{
    /// <summary>
    /// Runs before a publish completes: while the published cache still holds the node's old URLs,
    /// it detects URL-segment changes and stashes the old self+descendant URLs on the shared
    /// notification State for <see cref="ContentPublishedNotificationHandler"/> to purge afterwards.
    /// </summary>
    internal class ContentPublishingNotificationHandler(ICloudflarePurgeUrlService purgeUrlService, IOptions<UmbHostCloudflarePurge> configuration)
        : INotificationAsyncHandler<ContentPublishingNotification>
    {
        private readonly UmbHostCloudflarePurge _configuration = configuration.Value;

        public Task HandleAsync(ContentPublishingNotification notification, CancellationToken cancellationToken)
        {
            if (_configuration is { Disabled: false, NotificationHandlers.ContentUrlChangePurgeEnabled: true })
            {
                var urlsToPurge = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
                foreach (var entity in notification.PublishedEntities)
                {
                    if (purgeUrlService.HasUrlSegmentChanged(entity))
                    {
                        urlsToPurge.UnionWith(purgeUrlService.GetPublishedSubtreeUrls(entity.Id));
                    }
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
