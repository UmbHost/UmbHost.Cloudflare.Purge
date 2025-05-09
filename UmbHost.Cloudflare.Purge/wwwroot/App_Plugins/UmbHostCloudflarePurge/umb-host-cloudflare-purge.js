var r = (e) => {
  throw TypeError(e);
};
var u = (e, o, t) => o.has(e) || r("Cannot " + t);
var i = (e, o, t) => (u(e, o, "read from private field"), t ? t.call(e) : o.get(e)), l = (e, o, t) => o.has(e) ? r("Cannot add the same private member more than once") : o instanceof WeakSet ? o.add(e) : o.set(e, t), m = (e, o, t, n) => (u(e, o, "write to private field"), n ? n.call(e, t) : o.set(e, t), t);
import { UMB_DOCUMENT_ENTITY_TYPE as d } from "@umbraco-cms/backoffice/document";
import { UmbEntityActionBase as g } from "@umbraco-cms/backoffice/entity-action";
import { UMB_MODAL_MANAGER_CONTEXT as p, UMB_CONFIRM_MODAL as f } from "@umbraco-cms/backoffice/modal";
import { UmbLocalizationController as h } from "@umbraco-cms/backoffice/localization-api";
import { UMB_MEDIA_ENTITY_TYPE as b } from "@umbraco-cms/backoffice/media";
import { UMB_SETTINGS_SECTION_ALIAS as C } from "@umbraco-cms/backoffice/settings";
var a, s;
class y extends g {
  constructor(t, n) {
    super(t, n);
    l(this, a);
    l(this, s, new h(this));
    this.consumeContext(p, (c) => {
      m(this, a, c);
    });
  }
  async execute() {
    var n;
    const t = (n = i(this, a)) == null ? void 0 : n.open(this, f, {
      data: {
        headline: i(this, s).term("umbhostCloudflarePurge_confirmpurgecdnentityactiontitle"),
        content: i(this, s).term("umbhostCloudflarePurge_confirmpurgecdnentityactioncontent"),
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
a = new WeakMap(), s = new WeakMap();
const _ = {
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
}, M = [
  _
], N = {
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
}, w = [
  N
], P = {
  type: "workspace",
  kind: "default",
  alias: "umbhost-cloudflare-purge-workspace",
  name: "Cloudflare CDN Purge Settings Workspace",
  meta: {
    entityType: "umbhost-cloudflare-purge",
    headline: "#umbhostCloudflarePurge_workspace"
  }
}, A = {
  type: "workspaceView",
  alias: "umbhost-cloudflare-purge-settings-overview",
  name: "Cloudflare CDN Purge Settings Overview",
  element: () => import("./overview-CFwlISOx.js"),
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
}, D = [
  P,
  A
], E = {
  type: "menu",
  alias: "umbhost-cloudflare-purge-settings-menu",
  name: "Cloudflare CDN Purge Settings Menu"
}, T = {
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
}, S = {
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
}, k = [
  E,
  T,
  S
], U = {
  type: "localization",
  alias: "umbhost-cloudflare-purge-localize-en",
  name: "Cloudflare CDN Purge Localization",
  meta: {
    culture: "en"
  },
  js: () => import("./en-CLtP8MwH.js")
}, I = [
  U
], W = [
  ...w,
  ...I,
  ...M,
  ...k,
  ...D
];
export {
  W as manifests
};
//# sourceMappingURL=umb-host-cloudflare-purge.js.map
