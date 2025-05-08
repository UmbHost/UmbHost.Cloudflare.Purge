var c = (t) => {
  throw TypeError(t);
};
var s = (t, e, o) => e.has(t) || c("Cannot " + o);
var l = (t, e, o) => (s(t, e, "read from private field"), o ? o.call(t) : e.get(t)), r = (t, e, o) => e.has(t) ? c("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, o), u = (t, e, o, a) => (s(t, e, "write to private field"), a ? a.call(t, o) : e.set(t, o), o);
import { UMB_DOCUMENT_ENTITY_TYPE as d } from "@umbraco-cms/backoffice/document";
import { UmbEntityActionBase as h } from "@umbraco-cms/backoffice/entity-action";
import { UMB_MODAL_MANAGER_CONTEXT as b, UMB_CONFIRM_MODAL as f } from "@umbraco-cms/backoffice/modal";
import { UmbLocalizationController as p } from "@umbraco-cms/backoffice/localization-api";
var n, i;
class C extends h {
  constructor(o, a) {
    super(o, a);
    r(this, n);
    r(this, i, new p(this));
    this.consumeContext(b, (m) => {
      u(this, n, m);
    });
  }
  async execute() {
    var a;
    const o = (a = l(this, n)) == null ? void 0 : a.open(this, f, {
      data: {
        headline: l(this, i).term("umbhostCloudflarePurge_confirmpurgecdnentityactiontitle"),
        content: l(this, i).term("umbhostCloudflarePurge_confirmpurgecdnentityactioncontent"),
        color: "danger"
      }
    });
    await (o == null ? void 0 : o.onSubmit().then(() => {
      console.log("submit");
    }).catch(() => {
      console.log("cancel");
    }));
  }
}
n = new WeakMap(), i = new WeakMap();
const g = {
  type: "dashboard",
  alias: "umbhost-cloudflare-purge-dashboard",
  name: "Cloudflare CDN Purge Dashboard",
  element: () => import("./dashboard-CWgI01N1.js"),
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
}, y = {
  type: "entityAction",
  alias: "umbhost-cloudflare-purge-cdn-entity-action",
  name: "Cloudflare CDN Purge Entity Action",
  kind: "default",
  weight: 50,
  api: C,
  forEntityTypes: [d],
  meta: {
    icon: "icon-cloud",
    label: "#umbhostCloudflarePurge_entityactionlabel"
  }
}, _ = {
  type: "localization",
  alias: "umbhost-cloudflare-purge-localize-en",
  name: "Cloudflare CDN Purge Localization",
  meta: {
    culture: "en"
  },
  js: () => import("./en-Bm2eZ3E3.js")
}, P = [
  g,
  _,
  y
];
export {
  P as manifests
};
//# sourceMappingURL=umb-host-cloudflare-purge.js.map
