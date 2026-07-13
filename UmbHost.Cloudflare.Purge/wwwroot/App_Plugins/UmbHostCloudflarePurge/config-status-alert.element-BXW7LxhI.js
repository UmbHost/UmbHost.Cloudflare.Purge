import { css as C, state as p, customElement as z, nothing as h, html as u } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as w } from "@umbraco-cms/backoffice/lit-element";
import { UmbHostCloudflarePurgeRepository as y } from "./purge.repository-NmZ86NGk.js";
var P = Object.defineProperty, k = Object.getOwnPropertyDescriptor, m = (e) => {
  throw TypeError(e);
}, c = (e, r, t, i) => {
  for (var a = i > 1 ? void 0 : i ? k(r, t) : r, l = e.length - 1, n; l >= 0; l--)
    (n = e[l]) && (a = (i ? n(r, t, a) : n(a)) || a);
  return i && a && P(r, t, a), a;
}, _ = (e, r, t) => r.has(e) || m("Cannot " + t), E = (e, r, t) => (_(e, r, "read from private field"), t ? t.call(e) : r.get(e)), g = (e, r, t) => r.has(e) ? m("Cannot add the same private member more than once") : r instanceof WeakSet ? r.add(e) : r.set(e, t), f = (e, r, t) => (_(e, r, "access private method"), t), d, s, v, b;
let o = class extends w {
  constructor() {
    super(...arguments), g(this, s), g(this, d, new y(this)), this._loaded = !1;
  }
  connectedCallback() {
    super.connectedCallback(), f(this, s, v).call(this);
  }
  render() {
    return !this._loaded || !this._status ? h : this._status.isConfigured ? this._status.isDisabled ? u`
                <div class="alert alert-warning" role="alert">
                    <h5 class="alert-heading">${this.localize.term("umbhostCloudflarePurge_configdisabledtitle")}</h5>
                    <p><umb-localize key="umbhostCloudflarePurge_configdisabledcontent"></umb-localize></p>
                </div>
            ` : h : u`
                <div class="alert alert-danger" role="alert">
                    <h5 class="alert-heading">${this.localize.term("umbhostCloudflarePurge_confignotconfiguredtitle")}</h5>
                    <p><umb-localize key="umbhostCloudflarePurge_confignotconfiguredintro"></umb-localize></p>
                    <ul>
                        ${f(this, s, b).call(this, this._status).map((e) => u`<li>${e}</li>`)}
                    </ul>
                </div>
            `;
  }
};
d = /* @__PURE__ */ new WeakMap();
s = /* @__PURE__ */ new WeakSet();
v = async function() {
  const { data: e } = await E(this, d).getConfigurationStatus({ disableNotifications: !0 });
  this._status = e, this._loaded = !0;
};
b = function(e) {
  const r = [];
  return e.hasAuthKey || r.push(this.localize.term("umbhostCloudflarePurge_confignotconfiguredauthkey")), e.requiresEmail && !e.hasEmail && r.push(this.localize.term("umbhostCloudflarePurge_confignotconfiguredemail")), e.hasZones || r.push(this.localize.term("umbhostCloudflarePurge_confignotconfiguredzones")), r;
};
o.styles = C`
        :host {
            display: block;
        }

        /* Bootstrap-style inline alert, themed with UUI colour tokens. */
        .alert {
            width: 100%;
            box-sizing: border-box;
            border: 1px solid transparent;
            border-radius: var(--uui-border-radius, 3px);
            padding: var(--uui-size-space-4) var(--uui-size-space-5);
            margin-bottom: var(--uui-size-space-4);
        }

        .alert-danger {
            background-color: var(--uui-color-danger);
            border-color: var(--uui-color-danger-emphasis);
            color: var(--uui-color-danger-contrast);
        }

        .alert-warning {
            background-color: var(--uui-color-warning);
            border-color: var(--uui-color-warning-emphasis);
            color: var(--uui-color-warning-contrast);
        }

        .alert-heading {
            margin: 0 0 var(--uui-size-space-2);
        }

        .alert p {
            margin: 0;
        }

        .alert ul {
            margin: var(--uui-size-space-2) 0 0;
            padding-left: var(--uui-size-5);
        }
    `;
c([
  p()
], o.prototype, "_loaded", 2);
c([
  p()
], o.prototype, "_status", 2);
o = c([
  z("umbhost-cloudflare-purge-config-status-alert")
], o);
//# sourceMappingURL=config-status-alert.element-BXW7LxhI.js.map
