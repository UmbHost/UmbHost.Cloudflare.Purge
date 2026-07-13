import { ifDefined as f, html as y, css as z, state as g, customElement as w } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as x } from "@umbraco-cms/backoffice/lit-element";
import { UMB_NOTIFICATION_CONTEXT as U } from "@umbraco-cms/backoffice/notification";
import { UMB_MODAL_MANAGER_CONTEXT as E, UMB_CONFIRM_MODAL as b } from "@umbraco-cms/backoffice/modal";
import { UmbHostCloudflarePurgeRepository as S } from "./purge.repository-Dor1msDS.js";
var B = Object.defineProperty, k = Object.getOwnPropertyDescriptor, v = (t) => {
  throw TypeError(t);
}, h = (t, e, r, i) => {
  for (var o = i > 1 ? void 0 : i ? k(e, r) : e, u = t.length - 1, a; u >= 0; u--)
    (a = t[u]) && (o = (i ? a(e, r, o) : a(o)) || o);
  return i && o && B(e, r, o), o;
}, d = (t, e, r) => e.has(t) || v("Cannot " + r), c = (t, e, r) => (d(t, e, "read from private field"), e.get(t)), p = (t, e, r) => e.has(t) ? v("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, r), I = (t, e, r, i) => (d(t, e, "write to private field"), e.set(t, r), r), _ = (t, e, r) => (d(t, e, "access private method"), r), l, m, n, C, P;
let s = class extends x {
  constructor() {
    super(), p(this, n), p(this, l), p(this, m, new S(this)), this.purgeUrlsInput = "", this.consumeContext(U, (t) => {
      this._notificationContext = t;
    }), this.consumeContext(E, (t) => {
      I(this, l, t);
    });
  }
  get purgeUrls() {
    return this.purgeUrlsInput.split(/\r\n|\r|\n/).map((t) => t.trim()).filter((t) => t.length > 0);
  }
  handleTextareaInput(t) {
    const e = t.target;
    this.purgeUrlsInput = e.value;
  }
  render() {
    return y`
        <umb-workspace-editor>
          <div slot="actions">
            <uui-button
            pristine=""
            label=${this.localize.term("umbhostCloudflarePurge_purgeeverything")}
            @click="${() => _(this, n, C).call(this)}"
            state=${f(this.purgeEverythingButtonState)}
            look="secondary"
            color="positive"
            ></uui-button>
            <uui-button
            pristine=""
            label=${this.localize.term("umbhostCloudflarePurge_custompurge")}
            @click="${() => _(this, n, P).call(this)}"
            state=${f(this.customPurgeButtonState)}
            look="primary"
            color="positive"
            ></uui-button>
          </div>
          <div id="main">
            <uui-box headline=${this.localize.term("umbhostCloudflarePurge_headline")}>
                <umb-localize key="umbhostCloudflarePurge_introduction">Welcome</umb-localize>
                <uui-label for="purgeUrls" required="">
                  <umb-localize key="umbhostCloudflarePurge_urls"></umb-localize></uui-label>
                <uui-textarea id="purgeUrls" rows="10" required="" .value=${this.purgeUrlsInput} @input=${this.handleTextareaInput}></uui-textarea>
            </uui-box>
          </div>
        </umb-workspace-editor>
    `;
  }
};
l = /* @__PURE__ */ new WeakMap();
m = /* @__PURE__ */ new WeakMap();
n = /* @__PURE__ */ new WeakSet();
C = async function() {
  var i, o, u;
  const t = (i = c(this, l)) == null ? void 0 : i.open(this, b, {
    data: {
      headline: this.localize.term("umbhostCloudflarePurge_confirmpurgeeverythingtitle"),
      content: this.localize.term("umbhostCloudflarePurge_confirmpurgeeverythingcontent"),
      color: "danger",
      confirmLabel: this.localize.term("umbhostCloudflarePurge_confirmpurgeeverythingconfirm")
    }
  });
  try {
    await (t == null ? void 0 : t.onSubmit());
  } catch {
    return;
  }
  this.purgeEverythingButtonState = "waiting";
  const { error: e } = await c(this, m).purgeAll({ disableNotifications: !0 });
  if (e) {
    const a = { headline: this.localize.term("umbhostCloudflarePurge_purgeitemfailedtitle"), message: this.localize.term("umbhostCloudflarePurge_purgeitemfailedcontent") };
    (o = this._notificationContext) == null || o.peek("danger", { data: a }), this.purgeEverythingButtonState = "failed";
    return;
  }
  const r = { headline: this.localize.term("umbhostCloudflarePurge_purgesuccesstitle"), message: this.localize.term("umbhostCloudflarePurge_purgesuccesscontent") };
  (u = this._notificationContext) == null || u.peek("positive", { data: r }), this.purgeEverythingButtonState = "success";
};
P = async function() {
  var i, o, u;
  const t = (i = c(this, l)) == null ? void 0 : i.open(this, b, {
    data: {
      headline: this.localize.term("umbhostCloudflarePurge_confirmcustompurgetitle"),
      content: this.localize.term("umbhostCloudflarePurge_confirmcustompurgecontent"),
      color: "danger",
      confirmLabel: this.localize.term("umbhostCloudflarePurge_confirmcustompurgeconfirm")
    }
  });
  try {
    await (t == null ? void 0 : t.onSubmit());
  } catch {
    return;
  }
  this.customPurgeButtonState = "waiting";
  const { error: e } = await c(this, m).purgeCustom({ requestBody: this.purgeUrls }, { disableNotifications: !0 });
  if (e) {
    const a = { headline: this.localize.term("umbhostCloudflarePurge_purgeitemfailedtitle"), message: this.localize.term("umbhostCloudflarePurge_purgeitemfailedcontent") };
    (o = this._notificationContext) == null || o.peek("danger", { data: a }), this.customPurgeButtonState = "failed";
    return;
  }
  const r = { headline: this.localize.term("umbhostCloudflarePurge_purgesuccesstitle"), message: this.localize.term("umbhostCloudflarePurge_purgesuccesscontent") };
  (u = this._notificationContext) == null || u.peek("positive", { data: r }), this.customPurgeButtonState = "success";
};
s.styles = [
  z`
            #main {
                display: block;
                flex: 1 1 0%;
                flex-direction: column;
                overflow-y: auto;
                padding: var(--uui-size-layout-1);
            }
        `
];
h([
  g()
], s.prototype, "purgeEverythingButtonState", 2);
h([
  g()
], s.prototype, "customPurgeButtonState", 2);
h([
  g()
], s.prototype, "purgeUrlsInput", 2);
s = h([
  w("umbhost-cloudflare-purge-dashboard")
], s);
const N = s;
export {
  s as UmbHostCloudflarePurgeDashboardElement,
  N as default
};
//# sourceMappingURL=purge-dashboard.element-EJoWbqUN.js.map
