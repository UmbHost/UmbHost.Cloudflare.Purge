var C = (e) => {
  throw TypeError(e);
};
var l = (e, i, t) => i.has(e) || C("Cannot " + t);
var s = (e, i, t) => (l(e, i, "read from private field"), t ? t.call(e) : i.get(e)), c = (e, i, t) => i.has(e) ? C("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(e) : i.set(e, t), d = (e, i, t, n) => (l(e, i, "write to private field"), n ? n.call(e, t) : i.set(e, t), t), m = (e, i, t) => (l(e, i, "access private method"), t);
import { UmbEntityActionBase as y, UmbRequestReloadStructureForEntityEvent as w } from "@umbraco-cms/backoffice/entity-action";
import { UMB_MODAL_MANAGER_CONTEXT as T, UMB_CONFIRM_MODAL as A } from "@umbraco-cms/backoffice/modal";
import { UmbLocalizationController as N } from "@umbraco-cms/backoffice/localization-api";
import { UmbDocumentItemRepository as b } from "@umbraco-cms/backoffice/document";
import { UMB_ACTION_EVENT_CONTEXT as q } from "@umbraco-cms/backoffice/action";
import { UMB_NOTIFICATION_CONTEXT as O } from "@umbraco-cms/backoffice/notification";
import { V as P } from "./services.gen-Ce7SQPJn.js";
import { UMB_APP_LANGUAGE_CONTEXT as U } from "@umbraco-cms/backoffice/language";
var a, r, u, p, _, E;
class G extends y {
  constructor(t, n) {
    super(t, n);
    c(this, u);
    c(this, a);
    c(this, r, new N(this));
    this.consumeContext(U, (o) => {
      this._languageContext = o;
    }), this.consumeContext(O, (o) => {
      this._notificationContext = o;
    }), this.consumeContext(T, (o) => {
      d(this, a, o);
    });
  }
  async execute() {
    var o;
    const t = await m(this, u, _).call(this);
    if (!t) return;
    const n = (o = s(this, a)) == null ? void 0 : o.open(this, A, {
      data: {
        headline: s(this, r).term("umbhostCloudflarePurge_confirmpurgecdnentityactiontitle"),
        content: s(this, r).string("#umbhostCloudflarePurge_confirmpurgecdnentityactioncontent", t.name),
        color: "danger"
      }
    });
    await (n == null ? void 0 : n.onSubmit().then(() => {
      m(this, u, p).call(this, t).then((x) => {
        var g, f;
        if (x) {
          const h = { headline: s(this, r).string("#umbhostCloudflarePurge_purgeitemsuccesstitle", t.name), message: s(this, r).term("umbhostCloudflarePurge_purgeitemsuccesscontent") };
          (g = this._notificationContext) == null || g.peek("positive", { data: h });
        } else {
          const h = { headline: s(this, r).string("#umbhostCloudflarePurge_purgeitemfailedtitle", t.name), message: s(this, r).term("umbhostCloudflarePurge_purgeitemfailedcontent") };
          (f = this._notificationContext) == null || f.peek("danger", { data: h });
        }
      }), m(this, u, E).call(this);
    }).catch(() => {
    }));
  }
}
a = new WeakMap(), r = new WeakMap(), u = new WeakSet(), p = async function(t) {
  let n;
  this._languageContext && (n = this._languageContext.getAppCulture());
  const o = {
    requestBody: {
      unique: t.unique,
      culture: n
    }
  };
  return P.node(o).then(() => !0).catch(() => !1), !1;
}, _ = async function() {
  if (!this.args.unique) throw new Error("Cannot purge an item without a unique identifier.");
  const { data: t } = await new b(this).requestItems([this.args.unique]), n = t == null ? void 0 : t[0];
  if (!n) throw new Error("Item not found.");
  return n;
}, E = async function() {
  const t = await this.getContext(q);
  if (!t)
    throw new Error("Action event context not found.");
  const n = new w({
    unique: this.args.unique,
    entityType: this.args.entityType
  });
  t.dispatchEvent(n);
};
export {
  G as PurgeCdnContentEntityAction,
  G as api
};
//# sourceMappingURL=purge-content-tree-entity.action-FV6dMJMe.js.map
