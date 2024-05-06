using UmbHost.Cloudflare.Purge.NotificationHandlers;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Notifications;

namespace UmbHost.Cloudflare.Purge.Composers
{
    internal class RegisterNotificationHandlersComposer : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {
            builder.AddNotificationHandler<MenuRenderingNotification, AddPurgeCdnButtonTreeNotificationHandler>();
        }
    }
}
