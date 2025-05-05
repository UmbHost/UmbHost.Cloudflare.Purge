import { html as s, css as m, customElement as c } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as d } from "@umbraco-cms/backoffice/lit-element";
var b = Object.getOwnPropertyDescriptor, n = (t, r, a, u) => {
  for (var e = u > 1 ? void 0 : u ? b(r, a) : r, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (e = i(e) || e);
  return e;
};
let l = class extends d {
  render() {
    return s`
    <div id="splitViews">
    <uui-box
      headline=${this.localize.term("umbhostCloudflarePurge_headline")}>
      <umb-localize key="umbhostCloudflarePurge_introduction">Welcome</umb-localize>
      <uui-label for="purgeUrls" required="">
        <umb-localize key="umbhostCloudflarePurge_urls"></umb-localize></uui-label>
      <uui-textarea id="purgeUrls" rows="10" required=""></uui-textarea>
      </uui-box>
    </div>
      <umb-workspace-footer>
      <slot name="actions" slot="actions">
      <uui-button
  pristine=""
  label="Button"
  look="primary"
  color="positive"
></uui-button>
      </slot>
      </umb-workspace-footer>
    `;
  }
};
l.styles = [
  m`
:host {
    width: 100%;
    height: 100%;
    display: flex
;
    flex: 1 1 0%;
    flex-direction: column;
}

#splitViews {
    display: flex
;
    width: 100%;
    height: calc(100% - var(--umb-footer-layout-height));
}

uui-box {
  display: block;
        margin: 24px;
        width: 100%
}
    `
];
l = n([
  c("umbhost-cloudflare-purge-dashboard")
], l);
const f = l;
export {
  l as MyWelcomeDashboardElement,
  f as default
};
//# sourceMappingURL=dashboard-CHw9kTrk.js.map
