import { UMB_AUTH_CONTEXT as u } from "@umbraco-cms/backoffice/auth";
import { UMB_DOCUMENT_ENTITY_TYPE as i } from "@umbraco-cms/backoffice/document";
import { UMB_MEDIA_ENTITY_TYPE as l } from "@umbraco-cms/backoffice/media";
import { UMB_SETTINGS_SECTION_ALIAS as m } from "@umbraco-cms/backoffice/settings";
const c = {
  type: "entityAction",
  alias: "umbhost-cloudflare-purge-cdn-entity-action-content",
  name: "Cloudflare CDN Purge Content Entity Action",
  kind: "default",
  weight: 50,
  api: () => import("./purge-content-tree-entity.action-BX7qPGR2.js"),
  forEntityTypes: [i],
  meta: {
    icon: "icon-cloud",
    label: "#umbhostCloudflarePurge_entityactionlabel"
  },
  conditions: [
    {
      alias: "Umb.Condition.UserPermission.Document",
      allOf: ["UmbHostCloudflarePurgeContent"]
    }
  ]
}, d = {
  type: "entityAction",
  alias: "umbhost-cloudflare-purge-cdn-entity-action-media",
  name: "Cloudflare CDN Purge Media Entity Action",
  kind: "default",
  weight: 50,
  api: () => import("./purge-media-tree-entity.action-CXpF9OpE.js"),
  forEntityTypes: [l],
  meta: {
    icon: "icon-cloud",
    label: "#umbhostCloudflarePurge_entityactionlabel"
  },
  // Note: the backoffice has no `Umb.Condition.UserPermission.Media`. The media purge
  // verb is therefore registered as a document user permission (see userpermissions/manifests.ts)
  // and gated via the document permission condition. This is a deliberate workaround for the
  // lack of granular media permissions in core; it acts as a coarse "does this user group have
  // the purge-media verb" gate.
  conditions: [
    {
      alias: "Umb.Condition.UserPermission.Document",
      allOf: ["UmbHostCloudflarePurgeMedia"]
    }
  ]
}, g = [
  c,
  d
], r = "UmbHost.Cloudflare.Purge.Condition.IsConfigured", p = [
  {
    type: "condition",
    name: "Cloudflare CDN Purge Is Configured Condition",
    alias: r,
    api: () => import("./is-configured.condition-CXR6f7C4.js")
  }
], f = {
  type: "dashboard",
  alias: "umbhost-cloudflare-purge-dashboard",
  name: "Cloudflare CDN Purge Dashboard",
  element: () => import("./purge-dashboard.element-EJoWbqUN.js"),
  elementName: "umbhost-cloudflare-purge-dashboard",
  forEntityTypes: [i],
  weight: 15,
  meta: {
    label: "Cloudflare CDN Purge Dashboard",
    pathname: "umbhost-cloudflare-purge-dashboard"
  },
  conditions: [
    {
      alias: "Umb.Condition.SectionAlias",
      match: "Umb.Section.Content"
    },
    {
      alias: "Umb.Condition.CurrentUser.GroupId",
      oneOf: ["74faa29d-d43d-44bf-b3df-e02e8b38e08f"]
    },
    {
      alias: r
    }
  ]
}, C = [
  f
], b = {
  type: "workspace",
  kind: "default",
  alias: "umbhost-cloudflare-purge-workspace",
  name: "Cloudflare CDN Purge Settings Workspace",
  meta: {
    entityType: "umbhost-cloudflare-purge",
    headline: "#umbhostCloudflarePurge_workspacetitle"
  },
  conditions: [
    {
      alias: "Umb.Condition.SectionAlias",
      match: "Umb.Section.Settings"
    }
  ]
}, h = {
  type: "workspaceContext",
  alias: "UmbHost.CloudflarePurge.CachingContext",
  name: "Cloudflare CDN Purge Caching Context",
  api: () => import("./caching-workspace.context-D2RzgKG7.js"),
  conditions: [
    {
      alias: "Umb.Condition.WorkspaceAlias",
      match: "umbhost-cloudflare-purge-workspace"
    }
  ]
}, y = {
  type: "workspaceView",
  alias: "umbhost-cloudflare-purge-settings-overview",
  name: "Cloudflare CDN Purge Settings Overview",
  element: () => import("./overview.element-DFyYM-xs.js"),
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
}, P = {
  type: "workspaceView",
  alias: "umbhost-cloudflare-purge-settings-caching",
  name: "Cloudflare CDN Purge Settings Caching",
  element: () => import("./caching.element-CbXKK6l1.js"),
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
}, E = [
  b,
  h,
  y,
  P
], _ = {
  type: "menu",
  alias: "umbhost-cloudflare-purge-settings-menu",
  name: "Cloudflare CDN Purge Settings Menu"
}, U = {
  type: "sectionSidebarApp",
  kind: "menu",
  alias: "umbhost-cloudflare-purge-settings-sidebar-menu",
  name: "Cloudflare CDN Purge Settings Menu",
  weight: 1e3,
  meta: {
    label: "#umbhostCloudflarePurge_cloudflare",
    menu: "umbhost-cloudflare-purge-settings-menu"
  },
  conditions: [
    {
      alias: "Umb.Condition.SectionAlias",
      match: m
    }
  ]
}, N = {
  type: "menuItem",
  alias: "umbhost-cloudflare-purge-settings-overview-menu-item",
  name: "Cloudflare CDN Purge Settings Overview Menu Item",
  meta: {
    label: "#umbhostCloudflarePurge_settingsoverview",
    icon: "icon-dashboard",
    entityType: "umbhost-cloudflare-purge/overview",
    menus: ["umbhost-cloudflare-purge-settings-menu"]
  }
}, T = {
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
  _,
  U,
  N,
  T
], S = {
  type: "localization",
  alias: "umbhost-cloudflare-purge-localize-en",
  name: "Cloudflare CDN Purge Localization",
  meta: {
    culture: "en"
  },
  js: () => import("./en-BOsW8X14.js")
}, A = [
  S
], D = {
  type: "entityUserPermission",
  alias: "umbhost-cloudflare-purge-userpermissions-content",
  name: "Purge Content Items from Cloudflare CDN",
  forEntityTypes: [i],
  meta: {
    verbs: ["UmbHostCloudflarePurgeContent"],
    label: "#umbhostCloudflarePurge_usercontentpermissionslabel",
    description: "#umbhostCloudflarePurge_usercontentpermissionsdescription",
    group: "umbHostCloudflarePurge"
  }
}, v = {
  type: "entityUserPermission",
  alias: "umbhost-cloudflare-purge-userpermissions-media",
  name: "Purge Media Items from Cloudflare CDN",
  forEntityTypes: [i],
  meta: {
    verbs: ["UmbHostCloudflarePurgeMedia"],
    label: "#umbhostCloudflarePurge_usermediapermissionslabel",
    description: "#umbhostCloudflarePurge_usermediapermissionsdescription",
    group: "umbHostCloudflarePurge"
  }
}, w = [
  D,
  v
], M = "UmbHost.CloudflarePurge.Repository", O = {
  type: "repository",
  alias: M,
  name: "UmbHost Cloudflare Purge Repository",
  api: () => import("./purge.repository-Dor1msDS.js")
}, k = [
  O
];
async function H(o) {
  o.registerMany([
    ...k,
    ...C,
    ...A,
    ...g,
    ...I,
    ...E,
    ...w,
    ...p
  ]);
}
class a {
  constructor() {
    this._fns = [];
  }
  eject(t) {
    const e = this._fns.indexOf(t);
    e !== -1 && (this._fns = [...this._fns.slice(0, e), ...this._fns.slice(e + 1)]);
  }
  use(t) {
    this._fns = [...this._fns, t];
  }
}
const s = {
  BASE: "",
  CREDENTIALS: "include",
  ENCODE_PATH: void 0,
  HEADERS: void 0,
  PASSWORD: void 0,
  TOKEN: void 0,
  USERNAME: void 0,
  VERSION: "1.0",
  WITH_CREDENTIALS: !1,
  interceptors: {
    request: new a(),
    response: new a()
  }
}, W = (o, t) => {
  o.consumeContext(u, (e) => {
    if (!e) return;
    const n = e.getOpenApiConfiguration();
    s.BASE = n.base ?? "", s.CREDENTIALS = n.credentials ?? "same-origin", s.WITH_CREDENTIALS = n.credentials === "include", s.TOKEN = async () => await n.token() ?? "";
  }), H(t);
};
export {
  s as O,
  W as o
};
//# sourceMappingURL=entry-C8BXjPez.js.map
