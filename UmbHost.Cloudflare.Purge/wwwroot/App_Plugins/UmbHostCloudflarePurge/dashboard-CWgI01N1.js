import { ifDefined as m, html as P, css as y, state as p, customElement as z } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as E } from "@umbraco-cms/backoffice/lit-element";
import { UMB_NOTIFICATION_CONTEXT as S } from "@umbraco-cms/backoffice/notification";
import { UMB_MODAL_MANAGER_CONTEXT as w, UMB_CONFIRM_MODAL as f } from "@umbraco-cms/backoffice/modal";
var x = Object.defineProperty, B = Object.getOwnPropertyDescriptor, _ = (t) => {
  throw TypeError(t);
}, c = (t, e, o, r) => {
  for (var i = r > 1 ? void 0 : r ? B(e, o) : e, l = t.length - 1, n; l >= 0; l--)
    (n = t[l]) && (i = (r ? n(e, o, i) : n(i)) || i);
  return r && i && x(e, o, i), i;
}, h = (t, e, o) => e.has(t) || _("Cannot " + o), v = (t, e, o) => (h(t, e, "read from private field"), e.get(t)), d = (t, e, o) => e.has(t) ? _("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, o), O = (t, e, o, r) => (h(t, e, "write to private field"), e.set(t, o), o), g = (t, e, o) => (h(t, e, "access private method"), o), s, a, b, C;
let u = class extends E {
  constructor() {
    super(), d(this, a), d(this, s), this.consumeContext(S, (t) => {
      this._notificationContext = t;
    }), this.consumeContext(w, (t) => {
      O(this, s, t);
    });
  }
  render() {
    return P`
        <umb-workspace-editor>
          <div slot="actions">
            <uui-button
            pristine=""
            label=${this.localize.term("umbhostCloudflarePurge_purgeeverything")}
            @click="${() => g(this, a, b).call(this)}"
            state=${m(this.purgeEverythingButtonState)}
            look="secondary"
            color="positive"
            ></uui-button>
            <uui-button
            pristine=""
            label=${this.localize.term("umbhostCloudflarePurge_custompurge")}
            @click="${() => g(this, a, C).call(this)}"
            state=${m(this.customPurgeButtonState)}
            look="primary"
            color="positive"
            ></uui-button>
          </div>
          <div id="main">
            <uui-box headline=${this.localize.term("umbhostCloudflarePurge_headline")}>
                <umb-localize key="umbhostCloudflarePurge_introduction">Welcome</umb-localize>
                <uui-label for="purgeUrls" required="">
                  <umb-localize key="umbhostCloudflarePurge_urls"></umb-localize></uui-label>
                <uui-textarea id="purgeUrls" rows="10" required=""></uui-textarea>
            </uui-box>
          </div>
        </umb-workspace-editor>
    `;
  }
};
s = /* @__PURE__ */ new WeakMap();
a = /* @__PURE__ */ new WeakSet();
b = async function() {
  var e;
  this.purgeEverythingButtonState = "waiting";
  const t = (e = v(this, s)) == null ? void 0 : e.open(this, f, {
    data: {
      headline: this.localize.term("umbhostCloudflarePurge_confirmpurgeeverythingtitle"),
      content: this.localize.term("umbhostCloudflarePurge_confirmpurgeeverythingcontent"),
      color: "danger",
      confirmLabel: this.localize.term("umbhostCloudflarePurge_confirmpurgeeverythingconfirm")
    }
  });
  await (t == null ? void 0 : t.onSubmit().then(() => {
    var r;
    const o = { headline: this.localize.term("umbhostCloudflarePurge_purgesuccesstitle"), message: this.localize.term("umbhostCloudflarePurge_purgesuccesscontent") };
    (r = this._notificationContext) == null || r.peek("positive", { data: o }), this.purgeEverythingButtonState = "success";
  }).catch(() => {
    this.purgeEverythingButtonState = void 0;
  }));
};
C = async function() {
  var e;
  this.customPurgeButtonState = "waiting";
  const t = (e = v(this, s)) == null ? void 0 : e.open(this, f, {
    data: {
      headline: this.localize.term("umbhostCloudflarePurge_confirmcustompurgetitle"),
      content: this.localize.term("umbhostCloudflarePurge_confirmcustompurgecontent"),
      color: "danger",
      confirmLabel: this.localize.term("umbhostCloudflarePurge_confirmcustompurgeconfirm")
    }
  });
  await (t == null ? void 0 : t.onSubmit().then(() => {
    var r;
    const o = { headline: this.localize.term("umbhostCloudflarePurge_purgesuccesstitle"), message: this.localize.term("umbhostCloudflarePurge_purgesuccesscontent") };
    (r = this._notificationContext) == null || r.peek("positive", { data: o }), this.customPurgeButtonState = "success";
  }).catch(() => {
    this.customPurgeButtonState = void 0;
  }));
};
u.styles = [
  y`
            #main {
                display: block;
                flex: 1 1 0%;
                flex-direction: column;
                overflow-y: auto;
                padding: var(--uui-size-layout-1);
            }
        `
];
c([
  p()
], u.prototype, "purgeEverythingButtonState", 2);
c([
  p()
], u.prototype, "customPurgeButtonState", 2);
u = c([
  z("umbhost-cloudflare-purge-dashboard")
], u);
const $ = u;
export {
  u as UmbHostCloudflarePurgeDashboardElement,
  $ as default
};
//# sourceMappingURL=dashboard-CWgI01N1.js.map
