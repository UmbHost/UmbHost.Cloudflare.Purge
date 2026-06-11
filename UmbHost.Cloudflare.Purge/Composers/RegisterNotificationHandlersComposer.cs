using UmbHost.Cloudflare.Purge.NotificationHandlers.Content;
using UmbHost.Cloudflare.Purge.NotificationHandlers.Media;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Notifications;

namespace UmbHost.Cloudflare.Purge.Composers
{
    internal class RegisterNotificationHandlersComposer : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {
            builder.AddNotificationAsyncHandler<ContentPublishingNotification, ContentPublishingNotificationHandler>();
            builder.AddNotificationAsyncHandler<ContentPublishedNotification, ContentPublishedNotificationHandler>();
            builder.AddNotificationAsyncHandler<ContentUnpublishedNotification, ContentUnpublishedNotificationHandler>();
            builder.AddNotificationAsyncHandler<ContentDeletedNotification, ContentDeletedNotificationHandler>();
            builder.AddNotificationAsyncHandler<ContentMovingNotification, ContentMovingNotificationHandler>();
            builder.AddNotificationAsyncHandler<ContentMovedNotification, ContentMovedNotificationHandler>();
            builder.AddNotificationAsyncHandler<MediaSavedNotification, MediaSavedNotificationHandler>();
            builder.AddNotificationAsyncHandler<MediaDeletedNotification, MediaDeletedNotificationHandler>();
        }
    }
}
