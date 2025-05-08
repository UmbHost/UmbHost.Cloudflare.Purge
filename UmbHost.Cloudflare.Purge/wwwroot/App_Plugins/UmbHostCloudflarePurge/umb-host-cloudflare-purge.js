var r = (e) => {
  throw TypeError(e);
};
var u = (e, o, t) => o.has(e) || r("Cannot " + t);
var s = (e, o, t) => (u(e, o, "read from private field"), t ? t.call(e) : o.get(e)), l = (e, o, t) => o.has(e) ? r("Cannot add the same private member more than once") : o instanceof WeakSet ? o.add(e) : o.set(e, t), m = (e, o, t, a) => (u(e, o, "write to private field"), a ? a.call(e, t) : o.set(e, t), t);
import { UMB_DOCUMENT_ENTITY_TYPE as d } from "@umbraco-cms/backoffice/document";
import { UmbEntityActionBase as g } from "@umbraco-cms/backoffice/entity-action";
import { UMB_MODAL_MANAGER_CONTEXT as p, UMB_CONFIRM_MODAL as h } from "@umbraco-cms/backoffice/modal";
import { UmbLocalizationController as f } from "@umbraco-cms/backoffice/localization-api";
import { UMB_MEDIA_ENTITY_TYPE as b } from "@umbraco-cms/backoffice/media";
import { UMB_SETTINGS_SECTION_ALIAS as C } from "@umbraco-cms/backoffice/settings";
var n, i;
class y extends g {
  constructor(t, a) {
    super(t, a);
    l(this, n);
    l(this, i, new f(this));
    this.consumeContext(p, (c) => {
      m(this, n, c);
    });
  }
  async execute() {
    var a;
    const t = (a = s(this, n)) == null ? void 0 : a.open(this, h, {
      data: {
        headline: s(this, i).term("umbhostCloudflarePurge_confirmpurgecdnentityactiontitle"),
        content: s(this, i).term("umbhostCloudflarePurge_confirmpurgecdnentityactioncontent"),
        color: "danger"
      }
    });
    await (t == null ? void 0 : t.onSubmit().then(() => {
      console.log("submit");
    }).catch(() => {
      console.log("cancel");
    }));
  }
}
n = new WeakMap(), i = new WeakMap();
const _ = {
  type: "dashboard",
  alias: "umbhost-cloudflare-purge-dashboard",
  name: "Cloudflare CDN Purge Dashboard",
  element: () => import("./purge-dashboard-CWgI01N1.js"),
  elementName: "umbhost-cloudflare-purge-dashboard",
  weight: 30,
  meta: {
    label: "Cloudflare CDN Purge Dashboard",
    pathname: "umbhost-cloudflare-purge-dashboard"
  },
  conditions: [
    {
      alias: "Umb.Condition.SectionAlias",
      match: "Umb.Section.Content"
    }
  ]
}, M = {
  type: "entityAction",
  alias: "umbhost-cloudflare-purge-cdn-entity-action",
  name: "Cloudflare CDN Purge Entity Action",
  kind: "default",
  weight: 50,
  api: y,
  forEntityTypes: [d, b],
  meta: {
    icon: "icon-cloud",
    label: "#umbhostCloudflarePurge_entityactionlabel"
  }
}, N = {
  type: "menu",
  alias: "umbhost-cloudflare-purge-settings-menu",
  name: "Cloudflare CDN Purge Settings Menu"
}, w = {
  type: "sectionSidebarApp",
  kind: "menu",
  alias: "umbhost-cloudflare-purge-settings-sidebar-menu",
  name: "Cloudflare CDN Purge Settings Menu",
  weight: -100,
  meta: {
    label: "#umbhostCloudflarePurge_cloudflare",
    menu: "umbhost-cloudflare-purge-settings-menu"
  },
  conditions: [
    {
      alias: "Umb.Condition.SectionAlias",
      match: C
    }
  ]
}, P = {
  type: "menuItem",
  alias: "umbhost-cloudflare-purge-settings-menu-item",
  name: "Cloudflare CDN Purge Settings Menu Item",
  // element: uSyncMenuElement,
  meta: {
    label: "#umbhostCloudflarePurge_settingsoverview",
    icon: "icon-cloud",
    entityType: "umbhost-cloudflare-purge/settings-root",
    menus: ["umbhost-cloudflare-purge-settings-menu"]
  }
}, A = {
  type: "workspace",
  kind: "default",
  alias: "umbhost-cloudflare-purge-workspace",
  name: "Cloudflare CDN Purge Settings Workspace",
  meta: {
    entityType: "umbhost-cloudflare-purge",
    headline: "#umbhostCloudflarePurge_workspace"
  }
}, D = {
  type: "workspaceView",
  alias: "umbhost-cloudflare-purge-settings-overview",
  name: "Cloudflare CDN Purge Settings Overview",
  element: () => import("./overview-F1msRxiI.js"),
  elementName: "my-workspaceview",
  meta: {
    label: "My Workspace View",
    pathname: "/settings-root",
    icon: "icon-add"
  },
  conditions: [
    {
      alias: "Umb.Condition.WorkspaceAlias",
      match: "umbhost-cloudflare-purge-workspace"
    }
  ]
}, E = {
  type: "localization",
  alias: "umbhost-cloudflare-purge-localize-en",
  name: "Cloudflare CDN Purge Localization",
  meta: {
    culture: "en"
  },
  js: () => import("./en-CLtP8MwH.js")
}, z = [
  _,
  E,
  M,
  N,
  w,
  P,
  A,
  D
];
export {
  z as manifests
};
//# sourceMappingURL=umb-host-cloudflare-purge.js.map
