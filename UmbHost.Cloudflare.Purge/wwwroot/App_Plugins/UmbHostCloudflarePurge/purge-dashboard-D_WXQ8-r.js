import { ifDefined as m, html as y, css as z, state as d, property as S, customElement as x } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as E } from "@umbraco-cms/backoffice/lit-element";
import { UMB_NOTIFICATION_CONTEXT as B } from "@umbraco-cms/backoffice/notification";
import { UMB_MODAL_MANAGER_CONTEXT as U, UMB_CONFIRM_MODAL as f } from "@umbraco-cms/backoffice/modal";
import { V as _ } from "./services.gen-Ce7SQPJn.js";
var w = Object.defineProperty, k = Object.getOwnPropertyDescriptor, v = (t) => {
  throw TypeError(t);
}, l = (t, e, r, i) => {
  for (var o = i > 1 ? void 0 : i ? k(e, r) : e, n = t.length - 1, c; n >= 0; n--)
    (c = t[n]) && (o = (i ? c(e, r, o) : c(o)) || o);
  return i && o && w(e, r, o), o;
}, h = (t, e, r) => e.has(t) || v("Cannot " + r), b = (t, e, r) => (h(t, e, "read from private field"), e.get(t)), p = (t, e, r) => e.has(t) ? v("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, r), I = (t, e, r, i) => (h(t, e, "write to private field"), e.set(t, r), r), g = (t, e, r) => (h(t, e, "access private method"), r), s, a, C, P;
let u = class extends E {
  constructor() {
    super(), p(this, a), p(this, s), this.purgeUrlsInput = "", this.consumeContext(B, (t) => {
      this._notificationContext = t;
    }), this.consumeContext(U, (t) => {
      I(this, s, t);
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
            @click="${() => g(this, a, C).call(this)}"
            state=${m(this.purgeEverythingButtonState)}
            look="secondary"
            color="positive"
            ></uui-button>
            <uui-button
            pristine=""
            label=${this.localize.term("umbhostCloudflarePurge_custompurge")}
            @click="${() => g(this, a, P).call(this)}"
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
                <uui-textarea id="purgeUrls" rows="10" required="" .value=${this.purgeUrlsInput} @input=${this.handleTextareaInput}></uui-textarea>
            </uui-box>
          </div>
        </umb-workspace-editor>
    `;
  }
};
s = /* @__PURE__ */ new WeakMap();
a = /* @__PURE__ */ new WeakSet();
C = async function() {
  var e;
  this.purgeEverythingButtonState = "waiting";
  const t = (e = b(this, s)) == null ? void 0 : e.open(this, f, {
    data: {
      headline: this.localize.term("umbhostCloudflarePurge_confirmpurgeeverythingtitle"),
      content: this.localize.term("umbhostCloudflarePurge_confirmpurgeeverythingcontent"),
      color: "danger",
      confirmLabel: this.localize.term("umbhostCloudflarePurge_confirmpurgeeverythingconfirm")
    }
  });
  await (t == null ? void 0 : t.onSubmit().then(() => {
    var i;
    const r = { headline: this.localize.term("umbhostCloudflarePurge_purgesuccesstitle"), message: this.localize.term("umbhostCloudflarePurge_purgesuccesscontent") };
    (i = this._notificationContext) == null || i.peek("positive", { data: r }), _.all().then(() => {
      this.purgeEverythingButtonState = "success";
    }).catch(() => {
      this.purgeEverythingButtonState = "failed";
    });
  }).catch(() => {
    this.purgeEverythingButtonState = void 0;
  }));
};
P = async function() {
  var e;
  this.customPurgeButtonState = "waiting";
  const t = (e = b(this, s)) == null ? void 0 : e.open(this, f, {
    data: {
      headline: this.localize.term("umbhostCloudflarePurge_confirmcustompurgetitle"),
      content: this.localize.term("umbhostCloudflarePurge_confirmcustompurgecontent"),
      color: "danger",
      confirmLabel: this.localize.term("umbhostCloudflarePurge_confirmcustompurgeconfirm")
    }
  });
  await (t == null ? void 0 : t.onSubmit().then(() => {
    var r = {
      requestBody: this.purgeUrls
    };
    _.custom(r).then(() => {
      var o;
      const i = { headline: this.localize.term("umbhostCloudflarePurge_purgesuccesstitle"), message: this.localize.term("umbhostCloudflarePurge_purgesuccesscontent") };
      return (o = this._notificationContext) == null || o.peek("positive", { data: i }), this.customPurgeButtonState = "success", !0;
    }).catch(() => {
      var o;
      const i = { headline: this.localize.term("umbhostCloudflarePurge_purgeitemfailedtitle"), message: this.localize.term("umbhostCloudflarePurge_purgeitemfailedcontent") };
      (o = this._notificationContext) == null || o.peek("danger", { data: i }), this.customPurgeButtonState = "failed";
    });
  }).catch(() => {
    this.customPurgeButtonState = void 0;
  }));
};
u.styles = [
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
l([
  d()
], u.prototype, "purgeEverythingButtonState", 2);
l([
  d()
], u.prototype, "customPurgeButtonState", 2);
l([
  S({ type: String })
], u.prototype, "purgeUrlsInput", 2);
u = l([
  x("umbhost-cloudflare-purge-dashboard")
], u);
const A = u;
export {
  u as UmbHostCloudflarePurgeDashboardElement,
  A as default
};
//# sourceMappingURL=purge-dashboard-D_WXQ8-r.js.map
