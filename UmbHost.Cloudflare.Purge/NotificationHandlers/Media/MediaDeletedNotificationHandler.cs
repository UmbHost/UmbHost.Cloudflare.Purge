using Microsoft.Extensions.Options;
using UmbHost.Cloudflare.Purge.Interfaces;
using UmbHost.Cloudflare.Purge.Models;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Cms.Core.Web;
using Umbraco.Extensions;

namespace UmbHost.Cloudflare.Purge.NotificationHandlers.Media
{
    internal class MediaDeletedNotificationHandler(ICloudflareService cloudflareService, IUmbracoContextFactory umbracoContextFactory, IOptions<UmbHostCloudflarePurge> configuration)
        : INotificationAsyncHandler<MediaDeletedNotification>
    {
        private readonly UmbHostCloudflarePurge _configuration = configuration.Value;
        public async Task HandleAsync(MediaDeletedNotification notification, CancellationToken cancellationToken)
        {
            if (_configuration is { Disabled: false, NotificationHandlers.MediaDeletedNotificationEnabled: true })
            {
                var context = umbracoContextFactory.EnsureUmbracoContext().UmbracoContext;
                var urlsToPurge = new List<string>();
                foreach (var publishedEntity in notification.DeletedEntities)
                {
                    var savedMediaItem = context.Media?.GetById(publishedEntity.Id);
                    if (savedMediaItem != null)
                    {
                        urlsToPurge.Add(savedMediaItem.Url(mode: UrlMode.Absolute));
                    }
                }

                await cloudflareService.CustomPurge(new PurgeFilesRequest { Files = urlsToPurge.ToArray() });
            }
        }
    }
}
