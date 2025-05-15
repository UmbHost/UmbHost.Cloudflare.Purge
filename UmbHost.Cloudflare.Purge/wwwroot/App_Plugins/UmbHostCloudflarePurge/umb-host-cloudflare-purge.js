var l = (e) => {
  throw TypeError(e);
};
var r = (e, o, t) => o.has(e) || l("Cannot " + t);
var s = (e, o, t) => (r(e, o, "read from private field"), t ? t.call(e) : o.get(e)), u = (e, o, t) => o.has(e) ? l("Cannot add the same private member more than once") : o instanceof WeakSet ? o.add(e) : o.set(e, t), c = (e, o, t, a) => (r(e, o, "write to private field"), a ? a.call(e, t) : o.set(e, t), t);
import { UMB_DOCUMENT_ENTITY_TYPE as g } from "@umbraco-cms/backoffice/document";
import { UmbEntityActionBase as d } from "@umbraco-cms/backoffice/entity-action";
import { UMB_MODAL_MANAGER_CONTEXT as h, UMB_CONFIRM_MODAL as p } from "@umbraco-cms/backoffice/modal";
import { UmbLocalizationController as f } from "@umbraco-cms/backoffice/localization-api";
import { UMB_MEDIA_ENTITY_TYPE as b } from "@umbraco-cms/backoffice/media";
import { UMB_SETTINGS_SECTION_ALIAS as C } from "@umbraco-cms/backoffice/settings";
var n, i;
class y extends d {
  constructor(t, a) {
    super(t, a);
    u(this, n);
    u(this, i, new f(this));
    this.consumeContext(h, (m) => {
      c(this, n, m);
    });
  }
  async execute() {
    var a;
    const t = (a = s(this, n)) == null ? void 0 : a.open(this, p, {
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
const w = {
  type: "entityAction",
  alias: "umbhost-cloudflare-purge-cdn-entity-action",
  name: "Cloudflare CDN Purge Entity Action",
  kind: "default",
  weight: 50,
  api: y,
  forEntityTypes: [g, b],
  meta: {
    icon: "icon-cloud",
    label: "#umbhostCloudflarePurge_entityactionlabel"
  }
}, v = [
  w
], P = {
  type: "dashboard",
  alias: "umbhost-cloudflare-purge-dashboard",
  name: "Cloudflare CDN Purge Dashboard",
  element: () => import("./purge-dashboard-CWgI01N1.js"),
  elementName: "umbhost-cloudflare-purge-dashboard",
  weight: 15,
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
}, _ = [
  P
], N = {
  type: "workspace",
  kind: "default",
  alias: "umbhost-cloudflare-purge-workspace",
  name: "Cloudflare CDN Purge Settings Workspace",
  meta: {
    entityType: "umbhost-cloudflare-purge",
    headline: "#umbhostCloudflarePurge_workspacetitle"
  }
}, M = {
  type: "workspaceView",
  alias: "umbhost-cloudflare-purge-settings-overview",
  name: "Cloudflare CDN Purge Settings Overview",
  element: () => import("./overview-CaBDznbx.js"),
  elementName: "umbhost-cloudflare-purge-settings-overview",
  meta: {
    label: "#umbhostCloudflarePurge_settingsoverview",
    pathname: "overview",
    icon: "icon-dashboard"
  },
  conditions: [
    {
      alias: "Umb.Condition.WorkspaceAlias",
      match: "umbhost-cloudflare-purge-workspace"
    }
  ]
}, A = {
  type: "workspaceView",
  alias: "umbhost-cloudflare-purge-settings-caching",
  name: "Cloudflare CDN Purge Settings Caching",
  element: () => import("./caching-CxIJVZmX.js"),
  elementName: "umbhost-cloudflare-purge-settings-caching",
  meta: {
    label: "#umbhostCloudflarePurge_settingscaching",
    pathname: "caching",
    icon: "icon-cloud"
  },
  conditions: [
    {
      alias: "Umb.Condition.WorkspaceAlias",
      match: "umbhost-cloudflare-purge-workspace"
    }
  ]
}, D = [
  N,
  M,
  A
], S = {
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
}, E = {
  type: "menuItem",
  alias: "umbhost-cloudflare-purge-settings-overview-menu-item",
  name: "Cloudflare CDN Purge Settings Overview Menu Item",
  meta: {
    label: "#umbhostCloudflarePurge_settingsoverview",
    icon: "icon-dashboard",
    entityType: "umbhost-cloudflare-purge/overview",
    menus: ["umbhost-cloudflare-purge-settings-menu"]
  }
}, k = {
  type: "menuItem",
  alias: "umbhost-cloudflare-purge-settings-caching-menu-item",
  name: "Cloudflare CDN Purge Settings Caching Menu Item",
  meta: {
    label: "#umbhostCloudflarePurge_settingscaching",
    icon: "icon-cloud",
    entityType: "umbhost-cloudflare-purge/view/caching",
    menus: ["umbhost-cloudflare-purge-settings-menu"]
  }
}, I = [
  S,
  T,
  E,
  k
], U = {
  type: "localization",
  alias: "umbhost-cloudflare-purge-localize-en",
  name: "Cloudflare CDN Purge Localization",
  meta: {
    culture: "en"
  },
  js: () => import("./en-BjCuqtR1.js")
}, O = [
  U
], G = [
  ..._,
  ...O,
  ...v,
  ...I,
  ...D
];
export {
  G as manifests
};
//# sourceMappingURL=umb-host-cloudflare-purge.js.map
