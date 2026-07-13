var C = (e) => {
  throw TypeError(e);
};
var g = (e, i, t) => i.has(e) || C("Cannot " + t);
var o = (e, i, t) => (g(e, i, "read from private field"), t ? t.call(e) : i.get(e)), a = (e, i, t) => i.has(e) ? C("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(e) : i.set(e, t), y = (e, i, t, n) => (g(e, i, "write to private field"), n ? n.call(e, t) : i.set(e, t), t), m = (e, i, t) => (g(e, i, "access private method"), t);
import { UmbEntityActionBase as b, UmbRequestReloadStructureForEntityEvent as x } from "@umbraco-cms/backoffice/entity-action";
import { UMB_MODAL_MANAGER_CONTEXT as T, UMB_CONFIRM_MODAL as M } from "@umbraco-cms/backoffice/modal";
import { UmbLocalizationController as N } from "@umbraco-cms/backoffice/localization-api";
import { UMB_ACTION_EVENT_CONTEXT as q } from "@umbraco-cms/backoffice/action";
import { UMB_NOTIFICATION_CONTEXT as A } from "@umbraco-cms/backoffice/notification";
import { UmbMediaItemRepository as O } from "@umbraco-cms/backoffice/media";
import { UmbHostCloudflarePurgeRepository as P } from "./purge.repository-C5lnV6pv.js";
var u, r, h, s, _, w, E;
class k extends b {
  constructor(t, n) {
    super(t, n);
    a(this, s);
    a(this, u);
    a(this, r, new N(this));
    a(this, h, new P(this));
    this.consumeContext(A, (c) => {
      this._notificationContext = c;
    }), this.consumeContext(T, (c) => {
      y(this, u, c);
    });
  }
  async execute() {
    var f, l, p;
    const t = await m(this, s, w).call(this);
    if (!t) return;
    const n = (f = o(this, u)) == null ? void 0 : f.open(this, M, {
      data: {
        headline: o(this, r).term("umbhostCloudflarePurge_confirmpurgecdnentityactiontitle"),
        content: o(this, r).string("#umbhostCloudflarePurge_confirmpurgecdnentityactioncontent", t.name),
        color: "danger"
      }
    });
    try {
      await (n == null ? void 0 : n.onSubmit());
    } catch {
      return;
    }
    if (await m(this, s, _).call(this, t)) {
      const d = { headline: o(this, r).string("#umbhostCloudflarePurge_purgeitemsuccesstitle", t.name), message: o(this, r).term("umbhostCloudflarePurge_purgeitemsuccesscontent") };
      (l = this._notificationContext) == null || l.peek("positive", { data: d });
    } else {
      const d = { headline: o(this, r).string("#umbhostCloudflarePurge_purgeitemfailedtitle", t.name), message: o(this, r).term("umbhostCloudflarePurge_purgeitemfailedcontent") };
      (p = this._notificationContext) == null || p.peek("danger", { data: d });
    }
    m(this, s, E).call(this);
  }
}
u = new WeakMap(), r = new WeakMap(), h = new WeakMap(), s = new WeakSet(), _ = async function(t) {
  const { error: n } = await o(this, h).purgeNode(
    { requestBody: { unique: t.unique } },
    { disableNotifications: !0 }
  );
  return !n;
}, w = async function() {
  if (!this.args.unique) throw new Error("Cannot purge an item without a unique identifier.");
  const { data: t } = await new O(this).requestItems([this.args.unique]), n = t == null ? void 0 : t[0];
  if (!n) throw new Error("Item not found.");
  return n;
}, E = async function() {
  const t = await this.getContext(q);
  if (!t)
    throw new Error("Action event context not found.");
  const n = new x({
    unique: this.args.unique,
    entityType: this.args.entityType
  });
  t.dispatchEvent(n);
};
export {
  k as PurgeCdnMediaEntityAction,
  k as api
};
//# sourceMappingURL=purge-media-tree-entity.action-DdkI_Q78.js.map
