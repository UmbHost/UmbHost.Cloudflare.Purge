﻿using Microsoft.Extensions.Options;
using UmbHost.Cloudflare.Purge.Interfaces;
using UmbHost.Cloudflare.Purge.Models;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Cms.Core.Web;
using Umbraco.Extensions;

namespace UmbHost.Cloudflare.Purge.NotificationHandlers.Content
{
    internal class ContentPublishedNotificationHandler(ICloudflareService cloudflareService, IUmbracoContextFactory umbracoContextFactory, IOptions<UmbHostCloudflarePurge> configuration)
        : INotificationAsyncHandler<ContentPublishedNotification>
    {
        private readonly UmbHostCloudflarePurge _configuration = configuration.Value;
        public async Task HandleAsync(ContentPublishedNotification notification, CancellationToken cancellationToken)
        {
            if (_configuration is { Disabled: false, NotificationHandlers.ContentPublishedNotificationEnabled: true })
            {
                var context = umbracoContextFactory.EnsureUmbracoContext().UmbracoContext;
                var urlsToPurge = new List<string>();
                foreach (var publishedEntity in notification.PublishedEntities)
                {
                    var publishedContent = context.Content?.GetById(publishedEntity.Id);
                    if (publishedContent != null)
                    {
                        urlsToPurge.AddRange(publishedEntity.PublishedCultures.Select(publishedCulture => publishedContent.Url(mode: UrlMode.Absolute, culture: publishedCulture)));
                    }
                }

                await cloudflareService.CustomPurge(new PurgeFilesRequest { Files = urlsToPurge.ToArray() });
            }
        }
    }
}
