import { ifDefined as p, html as P, css as E, state as d, property as S, customElement as z } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as B } from "@umbraco-cms/backoffice/lit-element";
import { UMB_NOTIFICATION_CONTEXT as x } from "@umbraco-cms/backoffice/notification";
import { UMB_MODAL_MANAGER_CONTEXT as U, UMB_CONFIRM_MODAL as f } from "@umbraco-cms/backoffice/modal";
import { V as v } from "./services.gen-DB8iTMsS.js";
var w = Object.defineProperty, I = Object.getOwnPropertyDescriptor, _ = (t) => {
  throw TypeError(t);
}, n = (t, e, r, o) => {
  for (var u = o > 1 ? void 0 : o ? I(e, r) : e, l = t.length - 1, c; l >= 0; l--)
    (c = t[l]) && (u = (o ? c(e, r, u) : c(u)) || u);
  return o && u && w(e, r, u), u;
}, h = (t, e, r) => e.has(t) || _("Cannot " + r), b = (t, e, r) => (h(t, e, "read from private field"), e.get(t)), m = (t, e, r) => e.has(t) ? _("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, r), O = (t, e, r, o) => (h(t, e, "write to private field"), e.set(t, r), r), g = (t, e, r) => (h(t, e, "access private method"), r), s, a, C, y;
let i = class extends B {
  constructor() {
    super(), m(this, a), m(this, s), this.purgeUrlsInput = "", this.consumeContext(x, (t) => {
      this._notificationContext = t;
    }), this.consumeContext(U, (t) => {
      O(this, s, t);
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
    return P`
        <umb-workspace-editor>
          <div slot="actions">
            <uui-button
            pristine=""
            label=${this.localize.term("umbhostCloudflarePurge_purgeeverything")}
            @click="${() => g(this, a, C).call(this)}"
            state=${p(this.purgeEverythingButtonState)}
            look="secondary"
            color="positive"
            ></uui-button>
            <uui-button
            pristine=""
            label=${this.localize.term("umbhostCloudflarePurge_custompurge")}
            @click="${() => g(this, a, y).call(this)}"
            state=${p(this.customPurgeButtonState)}
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
    var o;
    const r = { headline: this.localize.term("umbhostCloudflarePurge_purgesuccesstitle"), message: this.localize.term("umbhostCloudflarePurge_purgesuccesscontent") };
    (o = this._notificationContext) == null || o.peek("positive", { data: r }), v.all().then(() => {
      this.purgeEverythingButtonState = "success";
    }).catch(() => {
      this.purgeEverythingButtonState = "failed";
    });
  }).catch(() => {
    this.purgeEverythingButtonState = void 0;
  }));
};
y = async function() {
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
    var u;
    const r = { headline: this.localize.term("umbhostCloudflarePurge_purgesuccesstitle"), message: this.localize.term("umbhostCloudflarePurge_purgesuccesscontent") };
    (u = this._notificationContext) == null || u.peek("positive", { data: r });
    var o = {
      requestBody: this.purgeUrls
    };
    v.custom(o).then(() => {
      this.purgeEverythingButtonState = "success";
    }).catch(() => {
      this.purgeEverythingButtonState = "failed";
    }), this.customPurgeButtonState = "success";
  }).catch(() => {
    this.customPurgeButtonState = void 0;
  }));
};
i.styles = [
  E`
            #main {
                display: block;
                flex: 1 1 0%;
                flex-direction: column;
                overflow-y: auto;
                padding: var(--uui-size-layout-1);
            }
        `
];
n([
  d()
], i.prototype, "purgeEverythingButtonState", 2);
n([
  d()
], i.prototype, "customPurgeButtonState", 2);
n([
  S({ type: String })
], i.prototype, "purgeUrlsInput", 2);
i = n([
  z("umbhost-cloudflare-purge-dashboard")
], i);
const A = i;
export {
  i as UmbHostCloudflarePurgeDashboardElement,
  A as default
};
//# sourceMappingURL=purge-dashboard-0vntYjlv.js.map
