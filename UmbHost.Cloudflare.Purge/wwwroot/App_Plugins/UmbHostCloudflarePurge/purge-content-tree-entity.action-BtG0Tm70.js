var _ = (e) => {
  throw TypeError(e);
};
var p = (e, i, t) => i.has(e) || _("Cannot " + t);
var s = (e, i, t) => (p(e, i, "read from private field"), t ? t.call(e) : i.get(e)), c = (e, i, t) => i.has(e) ? _("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(e) : i.set(e, t), y = (e, i, t, n) => (p(e, i, "write to private field"), n ? n.call(e, t) : i.set(e, t), t), m = (e, i, t) => (p(e, i, "access private method"), t);
import { UmbEntityActionBase as A, UmbRequestReloadStructureForEntityEvent as T } from "@umbraco-cms/backoffice/entity-action";
import { UMB_MODAL_MANAGER_CONTEXT as b, UMB_CONFIRM_MODAL as U } from "@umbraco-cms/backoffice/modal";
import { UmbLocalizationController as P } from "@umbraco-cms/backoffice/localization-api";
import { UmbDocumentItemRepository as q } from "@umbraco-cms/backoffice/document";
import { UMB_ACTION_EVENT_CONTEXT as O } from "@umbraco-cms/backoffice/action";
import { UMB_NOTIFICATION_CONTEXT as M } from "@umbraco-cms/backoffice/notification";
import { UMB_APP_LANGUAGE_CONTEXT as v } from "@umbraco-cms/backoffice/language";
import { U as I } from "./purge.repository-Dhvy131L.js";
var h, u, l, r, x, E, w, N;
class S extends A {
  constructor(t, n) {
    super(t, n);
    c(this, r);
    c(this, h);
    c(this, u, new P(this));
    c(this, l, new I(this));
    this.consumeContext(v, (o) => {
      this._languageContext = o;
    }), this.consumeContext(M, (o) => {
      this._notificationContext = o;
    }), this.consumeContext(b, (o) => {
      y(this, h, o);
    });
  }
  async execute() {
    var a;
    const t = await m(this, r, w).call(this);
    if (!t) return;
    const n = m(this, r, x).call(this, t), o = (a = s(this, h)) == null ? void 0 : a.open(this, U, {
      data: {
        headline: s(this, u).term("umbhostCloudflarePurge_confirmpurgecdnentityactiontitle"),
        content: s(this, u).string("#umbhostCloudflarePurge_confirmpurgecdnentityactioncontent", n),
        color: "danger"
      }
    });
    await (o == null ? void 0 : o.onSubmit().then(() => {
      m(this, r, E).call(this, t).then((g) => {
        var C, d;
        if (g) {
          const f = { headline: s(this, u).string("#umbhostCloudflarePurge_purgeitemsuccesstitle", n), message: s(this, u).term("umbhostCloudflarePurge_purgeitemsuccesscontent") };
          (C = this._notificationContext) == null || C.peek("positive", { data: f });
        } else {
          const f = { headline: s(this, u).string("#umbhostCloudflarePurge_purgeitemfailedtitle", n), message: s(this, u).term("umbhostCloudflarePurge_purgeitemfailedcontent") };
          (d = this._notificationContext) == null || d.peek("danger", { data: f });
        }
      }), m(this, r, N).call(this);
    }).catch(() => {
    }));
  }
}
h = new WeakMap(), u = new WeakMap(), l = new WeakMap(), r = new WeakSet(), // In Umbraco 17 the document item name lives on the culture variants rather than
// directly on the item. Prefer the variant for the active app culture, else the first.
x = function(t) {
  var a;
  const n = (a = this._languageContext) == null ? void 0 : a.getAppCulture(), o = t.variants.find((g) => g.culture === n) ?? t.variants[0];
  return (o == null ? void 0 : o.name) ?? "";
}, E = async function(t) {
  let n;
  this._languageContext && (n = this._languageContext.getAppCulture());
  const { error: o } = await s(this, l).purgeNode(
    { requestBody: { unique: t.unique, culture: n } },
    { disableNotifications: !0 }
  );
  return !o;
}, w = async function() {
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
//# sourceMappingURL=purge-content-tree-entity.action-BtG0Tm70.js.map
