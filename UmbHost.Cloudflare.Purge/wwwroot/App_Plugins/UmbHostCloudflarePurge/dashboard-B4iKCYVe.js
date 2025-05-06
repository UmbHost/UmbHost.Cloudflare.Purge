import { html as s, css as m, customElement as d } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as b } from "@umbraco-cms/backoffice/lit-element";
var n = Object.getOwnPropertyDescriptor, c = (u, l, a, t) => {
  for (var e = t > 1 ? void 0 : t ? n(l, a) : l, r = u.length - 1, i; r >= 0; r--)
    (i = u[r]) && (e = i(e) || e);
  return e;
};
let o = class extends b {
  render() {
    return s`
        <umb-workspace-editor>
          <div slot="actions">
            <uui-button
            pristine=""
            label=${this.localize.term("umbhostCloudflarePurge_purgeeverything")}
            look="secondary"
            color="positive"
            ></uui-button>
            <uui-button
            pristine=""
            label=${this.localize.term("umbhostCloudflarePurge_custompurge")}
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
o.styles = [
  m`
            #main {
                display: block;
                flex: 1 1 0%;
                flex-direction: column;
                overflow-y: auto;
                padding: var(--uui-size-layout-1);
            }
        `
];
o = c([
  d("umbhost-cloudflare-purge-dashboard")
], o);
const h = o;
export {
  o as UmbHostCloudflarePurgeDashboardElement,
  h as default
};
//# sourceMappingURL=dashboard-B4iKCYVe.js.map
