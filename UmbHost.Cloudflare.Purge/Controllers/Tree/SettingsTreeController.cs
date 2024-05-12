using System.Globalization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Trees;
using Umbraco.Cms.Web.BackOffice.Trees;
using Umbraco.Cms.Web.Common.Attributes;
using Umbraco.Extensions;

namespace UmbHost.Cloudflare.Purge.Controllers.Tree
{
    [Tree("settings", Consts.Tree.SettingsAlias, TreeTitle = Consts.Tree.TreeName, TreeGroup = Consts.Tree.TreeGroup, IsSingleNodeTree = true, SortOrder = 35)]
    [PluginController(Consts.PackageName)]
    public class SettingsTreeController : TreeController
    {
        private readonly IMenuItemCollectionFactory _menuItemCollectionFactory;
        private readonly ILocalizedTextService _localizedTextService;

        public SettingsTreeController(ILocalizedTextService localizedTextService, UmbracoApiControllerTypeCollection umbracoApiControllerTypeCollection, IEventAggregator eventAggregator, IMenuItemCollectionFactory menuItemCollectionFactory) : base(localizedTextService, umbracoApiControllerTypeCollection, eventAggregator)
        {
            _localizedTextService = localizedTextService;
            _menuItemCollectionFactory = menuItemCollectionFactory;
        }

        protected override ActionResult<TreeNodeCollection> GetTreeNodes(string id, FormCollection queryStrings)
        {
            var nodes = new TreeNodeCollection();

            if (id == Constants.System.Root.ToInvariantString())
            {
                nodes.Add(CreateTreeNode("1", "-1", queryStrings, _localizedTextService.Localize(Consts.Localizations.Area, Consts.Localizations.CdnSettings, CultureInfo.CurrentUICulture), "icon-settings", false, $"{Constants.Applications.Settings}/{Consts.Tree.SettingsAlias}/{Consts.Tree.CdnSettings}"));
            }

            return nodes;
        }

        protected override ActionResult<MenuItemCollection> GetMenuForNode(string id, FormCollection queryStrings)
        {
            var menu = _menuItemCollectionFactory.Create();
            return menu;
        }

        protected override ActionResult<TreeNode?> CreateRootNode(FormCollection queryStrings)
        {
            var rootResult = base.CreateRootNode(queryStrings);
            if (rootResult.Result is not null)
            {
                return rootResult;
            }

            var root = rootResult.Value;

            if (root != null)
            {
                root.RoutePath = $"{Constants.Applications.Settings}/{Consts.Tree.SettingsAlias}/overview";

                root.Icon = "icon-cloud";
                root.HasChildren = true;
                root.MenuUrl = null;
            }

            return root;
        }
    }
}
