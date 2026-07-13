var _ = (e) => {
  throw TypeError(e);
};
var f = (e, i, t) => i.has(e) || _("Cannot " + t);
var s = (e, i, t) => (f(e, i, "read from private field"), t ? t.call(e) : i.get(e)), a = (e, i, t) => i.has(e) ? _("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(e) : i.set(e, t), y = (e, i, t, n) => (f(e, i, "write to private field"), n ? n.call(e, t) : i.set(e, t), t), c = (e, i, t) => (f(e, i, "access private method"), t);
import { UmbEntityActionBase as A, UmbRequestReloadStructureForEntityEvent as T } from "@umbraco-cms/backoffice/entity-action";
import { UMB_MODAL_MANAGER_CONTEXT as b, UMB_CONFIRM_MODAL as P } from "@umbraco-cms/backoffice/modal";
import { UmbLocalizationController as U } from "@umbraco-cms/backoffice/localization-api";
import { UmbDocumentItemRepository as q } from "@umbraco-cms/backoffice/document";
import { UMB_ACTION_EVENT_CONTEXT as O } from "@umbraco-cms/backoffice/action";
import { UMB_NOTIFICATION_CONTEXT as M } from "@umbraco-cms/backoffice/notification";
import { UMB_APP_LANGUAGE_CONTEXT as v } from "@umbraco-cms/backoffice/language";
import { UmbHostCloudflarePurgeRepository as I } from "./purge.repository-C5lnV6pv.js";
var m, u, g, r, w, x, E, N;
class S extends A {
  constructor(t, n) {
    super(t, n);
    a(this, r);
    a(this, m);
    a(this, u, new U(this));
    a(this, g, new I(this));
    this.consumeContext(v, (o) => {
      this._languageContext = o;
    }), this.consumeContext(M, (o) => {
      this._notificationContext = o;
    }), this.consumeContext(b, (o) => {
      y(this, m, o);
    });
  }
  async execute() {
    var h, C, d;
    const t = await c(this, r, E).call(this);
    if (!t) return;
    const n = c(this, r, w).call(this, t), o = (h = s(this, m)) == null ? void 0 : h.open(this, P, {
      data: {
        headline: s(this, u).term("umbhostCloudflarePurge_confirmpurgecdnentityactiontitle"),
        content: s(this, u).string("#umbhostCloudflarePurge_confirmpurgecdnentityactioncontent", n),
        color: "danger"
      }
    });
    try {
      await (o == null ? void 0 : o.onSubmit());
    } catch {
      return;
    }
    if (await c(this, r, x).call(this, t)) {
      const p = { headline: s(this, u).string("#umbhostCloudflarePurge_purgeitemsuccesstitle", n), message: s(this, u).term("umbhostCloudflarePurge_purgeitemsuccesscontent") };
      (C = this._notificationContext) == null || C.peek("positive", { data: p });
    } else {
      const p = { headline: s(this, u).string("#umbhostCloudflarePurge_purgeitemfailedtitle", n), message: s(this, u).term("umbhostCloudflarePurge_purgeitemfailedcontent") };
      (d = this._notificationContext) == null || d.peek("danger", { data: p });
    }
    c(this, r, N).call(this);
  }
}
m = new WeakMap(), u = new WeakMap(), g = new WeakMap(), r = new WeakSet(), // In Umbraco 17 the document item name lives on the culture variants rather than
// directly on the item. Prefer the variant for the active app culture, else the first.
w = function(t) {
  var l;
  const n = (l = this._languageContext) == null ? void 0 : l.getAppCulture(), o = t.variants.find((h) => h.culture === n) ?? t.variants[0];
  return (o == null ? void 0 : o.name) ?? "";
}, x = async function(t) {
  let n;
  this._languageContext && (n = this._languageContext.getAppCulture());
  const { error: o } = await s(this, g).purgeNode(
    { requestBody: { unique: t.unique, culture: n } },
    { disableNotifications: !0 }
  );
  return !o;
}, E = async function() {
  if (!this.args.unique) throw new Error("Cannot purge an item without a unique identifier.");
  const { data: t } = await new q(this).requestItems([this.args.unique]), n = t == null ? void 0 : t[0];
  if (!n) throw new Error("Item not found.");
  return n;
}, N = async function() {
  const t = await this.getContext(O);
  if (!t)
    throw new Error("Action event context not found.");
  const n = new T({
    unique: this.args.unique,
    entityType: this.args.entityType
  });
  t.dispatchEvent(n);
};
export {
  S as PurgeCdnContentEntityAction,
  S as api
};
//# sourceMappingURL=purge-content-tree-entity.action-uKCyPErM.js.map
