import { UMB_AUTH_CONTEXT as r } from "@umbraco-cms/backoffice/auth";
import { UMB_DOCUMENT_ENTITY_TYPE as i } from "@umbraco-cms/backoffice/document";
import { UMB_MEDIA_ENTITY_TYPE as u } from "@umbraco-cms/backoffice/media";
import { UMB_SETTINGS_SECTION_ALIAS as l } from "@umbraco-cms/backoffice/settings";
const m = {
  type: "entityAction",
  alias: "umbhost-cloudflare-purge-cdn-entity-action-content",
  name: "Cloudflare CDN Purge Entity Action",
  kind: "default",
  weight: 50,
  api: () => import("./purge-content-tree-entity.action-FV6dMJMe.js"),
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
}, c = {
  type: "entityAction",
  alias: "umbhost-cloudflare-purge-cdn-entity-action-media",
  name: "Cloudflare CDN Purge Entity Action",
  kind: "default",
  weight: 50,
  api: () => import("./purge-media-tree-entity.action-kWSTDShf.js"),
  forEntityTypes: [u],
  meta: {
    icon: "icon-cloud",
    label: "#umbhostCloudflarePurge_entityactionlabel"
  },
  conditions: [
    {
      alias: "Umb.Condition.UserPermission.Document",
      allOf: ["UmbHostCloudflarePurgeMedia"]
    }
  ]
}, d = [
  m,
  c
], g = {
  type: "dashboard",
  alias: "umbhost-cloudflare-purge-dashboard",
  name: "Cloudflare CDN Purge Dashboard",
  element: () => import("./purge-dashboard-D_WXQ8-r.js"),
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
    }
  ]
}, f = [
  g
], p = {
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
}, b = {
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
}, h = {
  type: "workspaceView",
  alias: "umbhost-cloudflare-purge-settings-caching",
  name: "Cloudflare CDN Purge Settings Caching",
  element: () => import("./caching-BLugEKU4.js"),
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
}, C = [
  p,
  b,
  h
], y = {
  type: "menu",
  alias: "umbhost-cloudflare-purge-settings-menu",
  name: "Cloudflare CDN Purge Settings Menu"
}, P = {
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
      match: l
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
}, _ = {
  type: "menuItem",
  alias: "umbhost-cloudflare-purge-settings-caching-menu-item",
  name: "Cloudflare CDN Purge Settings Caching Menu Item",
  meta: {
    label: "#umbhostCloudflarePurge_settingscaching",
    icon: "icon-cloud",
    entityType: "umbhost-cloudflare-purge/view/caching",
    menus: ["umbhost-cloudflare-purge-settings-menu"]
  }
}, N = [
  y,
  P,
  E,
  _
], T = {
  type: "localization",
  alias: "umbhost-cloudflare-purge-localize-en",
  name: "Cloudflare CDN Purge Localization",
  meta: {
    culture: "en"
  },
  js: () => import("./en-bClKMIMB.js")
}, v = [
  T
], S = {
  type: "entityUserPermission",
  alias: "umbhost-cloudflare-purge-userpermissions-content",
  name: "Purge Content Items from Cloudflare CDN",
  forEntityTypes: [i],
  meta: {
    verbs: ["UmbHostCloudflarePurgeContent"],
    label: "#umbhostCloudflarePurge_usercontentpermissionslabel",
    description: "#umbhostCloudflarePurge_usercontentpermissionsdescription",
    group: "UmbHost Cloudflare Purge"
  }
}, w = {
  type: "entityUserPermission",
  alias: "umbhost-cloudflare-purge-userpermissions-media",
  name: "Purge Media Items from Cloudflare CDN",
  forEntityTypes: [i],
  meta: {
    verbs: ["UmbHostCloudflarePurgeMedia"],
    label: "#umbhostCloudflarePurge_usermediapermissionslabel",
    description: "#umbhostCloudflarePurge_usermediapermissionsdescription",
    group: "UmbHost Cloudflare Purge"
  }
}, A = [
  S,
  w
];
async function U(o) {
  o.registerMany([
    ...f,
    ...v,
    ...d,
    ...N,
    ...C,
    ...A
  ]);
}
class a {
  constructor() {
    this._fns = [];
  }
  eject(e) {
    const t = this._fns.indexOf(e);
    t !== -1 && (this._fns = [...this._fns.slice(0, t), ...this._fns.slice(t + 1)]);
  }
  use(e) {
    this._fns = [...this._fns, e];
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
}, k = (o, e) => {
  o.consumeContext(r, (t) => {
    const n = t.getOpenApiConfiguration();
    s.BASE = n.base, s.WITH_CREDENTIALS = n.withCredentials, s.CREDENTIALS = n.credentials, s.TOKEN = n.token;
  }), U(e);
};
export {
  s as O,
  k as o
};
//# sourceMappingURL=entry-xREBUgli.js.map
