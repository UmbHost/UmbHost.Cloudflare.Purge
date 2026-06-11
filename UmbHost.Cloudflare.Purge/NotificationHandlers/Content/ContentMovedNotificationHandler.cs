using Microsoft.Extensions.Options;
using UmbHost.Cloudflare.Purge.Interfaces;
using UmbHost.Cloudflare.Purge.Models;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Notifications;

namespace UmbHost.Cloudflare.Purge.NotificationHandlers.Content
{
    /// <summary>
    /// Runs after a move completes: purges the old self+descendant URLs captured by
    /// <see cref="ContentMovingNotificationHandler"/> so the CDN drops the now-stale cached pages.
    /// </summary>
    internal class ContentMovedNotificationHandler(ICloudflareService cloudflareService, IOptions<UmbHostCloudflarePurge> configuration)
        : INotificationAsyncHandler<ContentMovedNotification>
    {
        private readonly UmbHostCloudflarePurge _configuration = configuration.Value;

        public async Task HandleAsync(ContentMovedNotification notification, CancellationToken cancellationToken)
        {
            if (_configuration is { Disabled: false, NotificationHandlers.ContentMovedNotificationEnabled: true }
                && notification.State.TryGetValue(Constants.UrlChangeOldUrlsStateKey, out var stored)
                && stored is IReadOnlyCollection<string> oldUrls
                && oldUrls.Count > 0)
            {
                await cloudflareService.CustomPurge(new PurgeFilesRequest { Files = oldUrls.ToArray() });
            }
        }
    }
}
