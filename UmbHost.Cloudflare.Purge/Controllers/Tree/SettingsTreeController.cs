using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Trees;
using Umbraco.Cms.Web.BackOffice.Trees;
using Umbraco.Cms.Web.Common.Attributes;

namespace UmbHost.Cloudflare.Purge.Controllers.Tree
{
    internal class SettingsTreeController : TreeController
    {
        [Tree("settings", Consts.Tree.SettingsAlias, TreeTitle = Consts.PackageName, TreeGroup = Consts.TreeGroup, IsSingleNodeTree = true, SortOrder = 35)]
        [PluginController(Consts.PackageName)]
        public SettingsTreeController(ILocalizedTextService localizedTextService, UmbracoApiControllerTypeCollection umbracoApiControllerTypeCollection, IEventAggregator eventAggregator) : base(localizedTextService, umbracoApiControllerTypeCollection, eventAggregator)
        {
        }

        protected override ActionResult<TreeNodeCollection> GetTreeNodes(string id, FormCollection queryStrings)
        {
            throw new NotImplementedException();
        }

        protected override ActionResult<MenuItemCollection> GetMenuForNode(string id, FormCollection queryStrings)
        {
            throw new NotImplementedException();
        }
    }
}
