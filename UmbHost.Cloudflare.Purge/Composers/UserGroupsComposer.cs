using UmbHost.Cloudflare.Purge.NotificationHandlers.UserGroups;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Notifications;

namespace UmbHost.Cloudflare.Purge.Composers
{
    internal class UserGroupsComposer : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {
            builder.AddNotificationHandler<UmbracoApplicationStartingNotification, RunUmbHostCloudflarePurgeUserGroupMigration>();
        }
    }
}
