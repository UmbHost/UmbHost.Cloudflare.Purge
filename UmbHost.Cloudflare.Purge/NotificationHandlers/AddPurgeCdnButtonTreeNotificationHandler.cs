using Microsoft.Extensions.Options;
using UmbHost.Cloudflare.Purge.Models;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Cms.Core.Services;
using Umbraco.Extensions;

namespace UmbHost.Cloudflare.Purge.NotificationHandlers
{
    internal class AddPurgeCdnButtonTreeNotificationHandler(ILocalizedTextService localizedTextService, IOptions<UmbHostCloudflarePurge> configuration)
        : INotificationHandler<MenuRenderingNotification>
    {
        private readonly UmbHostCloudflarePurge _configuration = configuration.Value;
        public void Handle(MenuRenderingNotification notification)
        {
            if (_configuration is { Disabled: false, TreeMenuEnabled: true })
            {
                if (notification.TreeAlias.Equals("content"))
                {
                    var menuItem = new Umbraco.Cms.Core.Models.Trees.MenuItem(Consts.Tree.Alias, localizedTextService.Localize(Consts.Localizations.Area, Consts.Localizations.PurgeCdnAlias));

                    menuItem.AdditionalData.Add("actionView", "../App_Plugins/UmbHost.Cloudflare.Purge/purgecdntree.html");

                    menuItem.Icon = "cloud";
                    notification.Menu.Items.Insert(5, menuItem);

                }
            }
        }
    }
}
