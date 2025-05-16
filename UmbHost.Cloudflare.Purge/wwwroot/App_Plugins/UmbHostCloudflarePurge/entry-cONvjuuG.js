var l = (t) => {
  throw TypeError(t);
};
var c = (t, o, e) => o.has(t) || l("Cannot " + e);
var a = (t, o, e) => (c(t, o, "read from private field"), e ? e.call(t) : o.get(t)), u = (t, o, e) => o.has(t) ? l("Cannot add the same private member more than once") : o instanceof WeakSet ? o.add(t) : o.set(t, e), m = (t, o, e, n) => (c(t, o, "write to private field"), n ? n.call(t, e) : o.set(t, e), e);
import { UMB_AUTH_CONTEXT as h } from "@umbraco-cms/backoffice/auth";
import { UMB_DOCUMENT_ENTITY_TYPE as f } from "@umbraco-cms/backoffice/document";
import { UmbEntityActionBase as p } from "@umbraco-cms/backoffice/entity-action";
import { UMB_MODAL_MANAGER_CONTEXT as b, UMB_CONFIRM_MODAL as C } from "@umbraco-cms/backoffice/modal";
import { UmbLocalizationController as E } from "@umbraco-cms/backoffice/localization-api";
import { UMB_MEDIA_ENTITY_TYPE as _ } from "@umbraco-cms/backoffice/media";
import { UMB_SETTINGS_SECTION_ALIAS as N } from "@umbraco-cms/backoffice/settings";
var s, i;
class A extends p {
  constructor(e, n) {
    super(e, n);
    u(this, s);
    u(this, i, new E(this));
    this.consumeContext(b, (g) => {
      m(this, s, g);
    });
  }
  async execute() {
    var n;
    const e = (n = a(this, s)) == null ? void 0 : n.open(this, C, {
      data: {
        headline: a(this, i).term("umbhostCloudflarePurge_confirmpurgecdnentityactiontitle"),
        content: a(this, i).term("umbhostCloudflarePurge_confirmpurgecdnentityactioncontent"),
        color: "danger"
      }
    });
    await (e == null ? void 0 : e.onSubmit().then(() => {
      console.log("submit");
    }).catch(() => {
      console.log("cancel");
    }));
  }
}
s = new WeakMap(), i = new WeakMap();
const w = {
  type: "entityAction",
  alias: "umbhost-cloudflare-purge-cdn-entity-action",
  name: "Cloudflare CDN Purge Entity Action",
  kind: "default",
  weight: 50,
  api: A,
  forEntityTypes: [f, _],
  meta: {
    icon: "icon-cloud",
    label: "#umbhostCloudflarePurge_entityactionlabel"
  }
}, y = [
  w
], v = {
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
}, T = [
  v
], S = {
  type: "workspace",
  kind: "default",
  alias: "umbhost-cloudflare-purge-workspace",
  name: "Cloudflare CDN Purge Settings Workspace",
  meta: {
    entityType: "umbhost-cloudflare-purge",
    headline: "#umbhostCloudflarePurge_workspacetitle"
  }
}, P = {
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
}, D = {
  type: "workspaceView",
  alias: "umbhost-cloudflare-purge-settings-caching",
  name: "Cloudflare CDN Purge Settings Caching",
  element: () => import("./caching-BNoVNgGv.js"),
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
}, M = [
  S,
  P,
  D
], I = {
  type: "menu",
  alias: "umbhost-cloudflare-purge-settings-menu",
  name: "Cloudflare CDN Purge Settings Menu"
}, O = {
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
      match: N
    }
  ]
}, U = {
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
}, R = [
  I,
  O,
  U,
  k
], B = {
  type: "localization",
  alias: "umbhost-cloudflare-purge-localize-en",
  name: "Cloudflare CDN Purge Localization",
  meta: {
    culture: "en"
  },
  js: () => import("./en-BjCuqtR1.js")
}, L = [
  B
];
function x(t) {
  t.registerMany([
    ...T,
    ...L,
    ...y,
    ...R,
    ...M
  ]);
}
class d {
  constructor() {
    this._fns = [];
  }
  eject(o) {
    const e = this._fns.indexOf(o);
    e !== -1 && (this._fns = [...this._fns.slice(0, e), ...this._fns.slice(e + 1)]);
  }
  use(o) {
    this._fns = [...this._fns, o];
  }
}
const r = {
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
    request: new d(),
    response: new d()
  }
}, K = (t, o) => {
  t.consumeContext(h, (e) => {
    const n = e.getOpenApiConfiguration();
    r.BASE = n.base, r.WITH_CREDENTIALS = n.withCredentials, r.CREDENTIALS = n.credentials, r.TOKEN = n.token;
  }), x(o);
};
export {
  r as O,
  K as o
};
//# sourceMappingURL=entry-cONvjuuG.js.map
