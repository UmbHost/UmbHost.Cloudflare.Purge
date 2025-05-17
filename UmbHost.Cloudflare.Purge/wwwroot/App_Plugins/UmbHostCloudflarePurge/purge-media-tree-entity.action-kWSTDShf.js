var p = (e) => {
  throw TypeError(e);
};
var m = (e, i, t) => i.has(e) || p("Cannot " + t);
var s = (e, i, t) => (m(e, i, "read from private field"), t ? t.call(e) : i.get(e)), c = (e, i, t) => i.has(e) ? p("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(e) : i.set(e, t), g = (e, i, t, n) => (m(e, i, "write to private field"), n ? n.call(e, t) : i.set(e, t), t), h = (e, i, t) => (m(e, i, "access private method"), t);
import { UmbEntityActionBase as _, UmbRequestReloadStructureForEntityEvent as E } from "@umbraco-cms/backoffice/entity-action";
import { UMB_MODAL_MANAGER_CONTEXT as w, UMB_CONFIRM_MODAL as y } from "@umbraco-cms/backoffice/modal";
import { UmbLocalizationController as T } from "@umbraco-cms/backoffice/localization-api";
import { UMB_ACTION_EVENT_CONTEXT as x } from "@umbraco-cms/backoffice/action";
import { UMB_NOTIFICATION_CONTEXT as M } from "@umbraco-cms/backoffice/notification";
import { UmbMediaItemRepository as b } from "@umbraco-cms/backoffice/media";
var u, o, a, C, d;
class B extends _ {
  constructor(t, n) {
    super(t, n);
    c(this, a);
    c(this, u);
    c(this, o, new T(this));
    this.consumeContext(M, (r) => {
      this._notificationContext = r;
    }), this.consumeContext(w, (r) => {
      g(this, u, r);
    });
  }
  async execute() {
    var r;
    const t = await h(this, a, C).call(this);
    if (!t) return;
    const n = (r = s(this, u)) == null ? void 0 : r.open(this, y, {
      data: {
        headline: s(this, o).term("umbhostCloudflarePurge_confirmpurgecdnentityactiontitle"),
        content: s(this, o).string("#umbhostCloudflarePurge_confirmpurgecdnentityactioncontent", t.name),
        color: "danger"
      }
    });
    await (n == null ? void 0 : n.onSubmit().then(() => {
      var f;
      const l = { headline: s(this, o).string("#umbhostCloudflarePurge_purgeitemsuccesstitle", t.name), message: s(this, o).term("umbhostCloudflarePurge_purgeitemsuccesscontent") };
      (f = this._notificationContext) == null || f.peek("positive", { data: l }), h(this, a, d).call(this);
    }).catch(() => {
    }));
  }
}
u = new WeakMap(), o = new WeakMap(), a = new WeakSet(), C = async function() {
  if (!this.args.unique) throw new Error("Cannot purge an item without a unique identifier.");
  const { data: t } = await new b(this).requestItems([this.args.unique]), n = t == null ? void 0 : t[0];
  if (!n) throw new Error("Item not found.");
  return n;
}, d = async function() {
  const t = await this.getContext(x);
  if (!t)
    throw new Error("Action event context not found.");
  const n = new E({
    unique: this.args.unique,
    entityType: this.args.entityType
  });
  t.dispatchEvent(n);
};
export {
  B as PurgeCdnMediaEntityAction,
  B as api
};
//# sourceMappingURL=purge-media-tree-entity.action-kWSTDShf.js.map
