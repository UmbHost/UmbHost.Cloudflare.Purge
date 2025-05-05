import { css, html, customElement } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';

@customElement('umbhost-cloudflare-purge-dashboard')
export class MyWelcomeDashboardElement extends UmbLitElement {

  override render() {
    return html`
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

  static override readonly styles = [
    css`
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
    `,
  ];
}

export default MyWelcomeDashboardElement;

declare global {
  interface HTMLElementTagNameMap {
    'my-welcome-dashboard': MyWelcomeDashboardElement;
  }
}