var p = (e) => {
  throw TypeError(e);
};
var g = (e, o, t) => o.has(e) || p("Cannot " + t);
var u = (e, o, t) => (g(e, o, "read from private field"), t ? t.call(e) : o.get(e)), m = (e, o, t) => o.has(e) ? p("Cannot add the same private member more than once") : o instanceof WeakSet ? o.add(e) : o.set(e, t), C = (e, o, t, n) => (g(e, o, "write to private field"), n ? n.call(e, t) : o.set(e, t), t), h = (e, o, t) => (g(e, o, "access private method"), t);
import { UmbEntityActionBase as E, UmbRequestReloadStructureForEntityEvent as y } from "@umbraco-cms/backoffice/entity-action";
import { UMB_MODAL_MANAGER_CONTEXT as x, UMB_CONFIRM_MODAL as w } from "@umbraco-cms/backoffice/modal";
import { UmbLocalizationController as T } from "@umbraco-cms/backoffice/localization-api";
import { UmbDocumentItemRepository as A } from "@umbraco-cms/backoffice/document";
import { UMB_ACTION_EVENT_CONTEXT as N } from "@umbraco-cms/backoffice/action";
import { UMB_NOTIFICATION_CONTEXT as q } from "@umbraco-cms/backoffice/notification";
import { V as O } from "./services.gen-D1nWWM7g.js";
import { UMB_APP_LANGUAGE_CONTEXT as U } from "@umbraco-cms/backoffice/language";
var c, s, r, f, d, _;
class X extends E {
  constructor(t, n) {
    super(t, n);
    m(this, r);
    m(this, c);
    m(this, s, new T(this));
    this.consumeContext(U, (i) => {
      this._languageContext = i;
    }), this.consumeContext(q, (i) => {
      this._notificationContext = i;
    }), this.consumeContext(x, (i) => {
      C(this, c, i);
    });
  }
  async execute() {
    var i;
    const t = await h(this, r, d).call(this);
    if (!t) return;
    const n = (i = u(this, c)) == null ? void 0 : i.open(this, w, {
      data: {
        headline: u(this, s).term("umbhostCloudflarePurge_confirmpurgecdnentityactiontitle"),
        content: u(this, s).string("#umbhostCloudflarePurge_confirmpurgecdnentityactioncontent", t.name),
        color: "danger"
      }
    });
    await (n == null ? void 0 : n.onSubmit().then(() => {
      var l;
      h(this, r, f).call(this, t);
      const a = { headline: u(this, s).string("#umbhostCloudflarePurge_purgeitemsuccesstitle", t.name), message: u(this, s).term("umbhostCloudflarePurge_purgeitemsuccesscontent") };
      (l = this._notificationContext) == null || l.peek("positive", { data: a }), h(this, r, _).call(this);
    }).catch(() => {
    }));
  }
}
c = new WeakMap(), s = new WeakMap(), r = new WeakSet(), f = async function(t) {
  let n;
  this._languageContext && (n = this._languageContext.getAppCulture());
  const i = {
    requestBody: {
      unique: t.unique,
      culture: n
    }
  };
  O.node(i).then((a) => {
    console.log("Purge response:", a);
  }).catch((a) => {
    console.error("Error during purge:", a);
  });
}, d = async function() {
  if (!this.args.unique) throw new Error("Cannot purge an item without a unique identifier.");
  const { data: t } = await new A(this).requestItems([this.args.unique]), n = t == null ? void 0 : t[0];
  if (!n) throw new Error("Item not found.");
  return n;
}, _ = async function() {
  const t = await this.getContext(N);
  if (!t)
    throw new Error("Action event context not found.");
  const n = new y({
    unique: this.args.unique,
    entityType: this.args.entityType
  });
  t.dispatchEvent(n);
};
export {
  X as PurgeCdnContentEntityAction,
  X as api
};
//# sourceMappingURL=purge-content-tree-entity.action-CdSexDzZ.js.map
