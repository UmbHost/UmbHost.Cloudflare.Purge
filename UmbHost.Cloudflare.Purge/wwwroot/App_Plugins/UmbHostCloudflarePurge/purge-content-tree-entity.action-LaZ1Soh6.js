var p = (e) => {
  throw TypeError(e);
};
var m = (e, n, t) => n.has(e) || p("Cannot " + t);
var s = (e, n, t) => (m(e, n, "read from private field"), t ? t.call(e) : n.get(e)), a = (e, n, t) => n.has(e) ? p("Cannot add the same private member more than once") : n instanceof WeakSet ? n.add(e) : n.set(e, t), C = (e, n, t, i) => (m(e, n, "write to private field"), i ? i.call(e, t) : n.set(e, t), t), h = (e, n, t) => (m(e, n, "access private method"), t);
import { UmbEntityActionBase as _, UmbRequestReloadStructureForEntityEvent as E } from "@umbraco-cms/backoffice/entity-action";
import { UMB_MODAL_MANAGER_CONTEXT as w, UMB_CONFIRM_MODAL as y } from "@umbraco-cms/backoffice/modal";
import { UmbLocalizationController as T } from "@umbraco-cms/backoffice/localization-api";
import { UmbDocumentItemRepository as x } from "@umbraco-cms/backoffice/document";
import { UMB_ACTION_EVENT_CONTEXT as b } from "@umbraco-cms/backoffice/action";
import { UMB_NOTIFICATION_CONTEXT as A } from "@umbraco-cms/backoffice/notification";
var c, o, u, g, l;
class B extends _ {
  constructor(t, i) {
    super(t, i);
    a(this, u);
    a(this, c);
    a(this, o, new T(this));
    this.consumeContext(A, (r) => {
      this._notificationContext = r;
    }), this.consumeContext(w, (r) => {
      C(this, c, r);
    });
  }
  async execute() {
    var r;
    const t = await h(this, u, g).call(this);
    if (!t) return;
    const i = (r = s(this, c)) == null ? void 0 : r.open(this, y, {
      data: {
        headline: s(this, o).term("umbhostCloudflarePurge_confirmpurgecdnentityactiontitle"),
        content: s(this, o).string("#umbhostCloudflarePurge_confirmpurgecdnentityactioncontent", t.name),
        color: "danger"
      }
    });
    await (i == null ? void 0 : i.onSubmit().then(() => {
      var f;
      const d = { headline: s(this, o).string("#umbhostCloudflarePurge_purgeitemsuccesstitle", t.name), message: s(this, o).term("umbhostCloudflarePurge_purgeitemsuccesscontent") };
      (f = this._notificationContext) == null || f.peek("positive", { data: d }), h(this, u, l).call(this);
    }).catch(() => {
    }));
  }
}
c = new WeakMap(), o = new WeakMap(), u = new WeakSet(), g = async function() {
  if (!this.args.unique) throw new Error("Cannot purge an item without a unique identifier.");
  const { data: t } = await new x(this).requestItems([this.args.unique]), i = t == null ? void 0 : t[0];
  if (!i) throw new Error("Item not found.");
  return i;
}, l = async function() {
  const t = await this.getContext(b);
  if (!t)
    throw new Error("Action event context not found.");
  const i = new E({
    unique: this.args.unique,
    entityType: this.args.entityType
  });
  t.dispatchEvent(i);
};
export {
  B as PurgeCdnContentEntityAction,
  B as api
};
//# sourceMappingURL=purge-content-tree-entity.action-LaZ1Soh6.js.map
