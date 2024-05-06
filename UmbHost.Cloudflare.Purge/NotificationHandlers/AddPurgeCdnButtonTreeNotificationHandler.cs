using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Cms.Core.Services;
using Umbraco.Extensions;

namespace UmbHost.Cloudflare.Purge.NotificationHandlers
{
    internal class AddPurgeCdnButtonTreeNotificationHandler(ILocalizedTextService localizedTextService)
        : INotificationHandler<MenuRenderingNotification>
    {
        public void Handle(MenuRenderingNotification notification)
        {
            if (notification.TreeAlias.Equals("content"))
            {
                var menuItem = new Umbraco.Cms.Core.Models.Trees.MenuItem("itemAlias", localizedTextService.Localize("umbhostCloudflarePurge", "purgecdn"));

                menuItem.AdditionalData.Add("actionView", "../App_Plugins/UmbHost.Cloudflare.Purge/purgecdntree.html");

                menuItem.Icon = "cloud";
                notification.Menu.Items.Insert(5, menuItem);

            }
        }
    }
}
