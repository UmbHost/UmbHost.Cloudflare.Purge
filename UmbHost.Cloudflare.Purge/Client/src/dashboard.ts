import {css, html, customElement, ifDefined, state} from '@umbraco-cms/backoffice/external/lit';
import { UUIButtonState } from '@umbraco-cms/backoffice/external/uui';
import {UmbLitElement} from '@umbraco-cms/backoffice/lit-element';
import {UmbNotificationContext, UmbNotificationDefaultData, UMB_NOTIFICATION_CONTEXT,} from '@umbraco-cms/backoffice/notification';
import {UmbModalManagerContext, UMB_CONFIRM_MODAL, UMB_MODAL_MANAGER_CONTEXT} from '@umbraco-cms/backoffice/modal'

@customElement('umbhost-cloudflare-purge-dashboard')
export class UmbHostCloudflarePurgeDashboardElement extends UmbLitElement {

  private _notificationContext?: UmbNotificationContext;
  #modalContext?: UmbModalManagerContext;

  @state()
  private purgeEverythingButtonState?: UUIButtonState;

  @state()
  private customPurgeButtonState?: UUIButtonState;

	constructor() {
		super();

		this.consumeContext(UMB_NOTIFICATION_CONTEXT, (notificationContext) => {
			this._notificationContext = notificationContext;
		});

    this.consumeContext(UMB_MODAL_MANAGER_CONTEXT, (_instance) => {
      this.#modalContext = _instance;
  });
	}

	async #handlePurgeEverything() {
    this.purgeEverythingButtonState = 'waiting';

    const modalHandler = this.#modalContext?.open(this, UMB_CONFIRM_MODAL, {
      data: {
          headline: this.localize.term("umbhostCloudflarePurge_confirmpurgeeverythingtitle"),
          content: this.localize.term("umbhostCloudflarePurge_confirmpurgeeverythingcontent"),
      }
    });
    const result = await modalHandler?.onSubmit().then(() => {
      const data: UmbNotificationDefaultData = { headline: this.localize.term("umbhostCloudflarePurge_purgesuccesstitle"), message: this.localize.term("umbhostCloudflarePurge_purgesuccesscontent") };
      this._notificationContext?.peek('positive', { data });
  
      this.purgeEverythingButtonState = 'success';
      return;
		}).catch(() => undefined);

    this.purgeEverythingButtonState = undefined;
	}

  async #handleCustomPurge() {
    this.customPurgeButtonState = 'waiting';

    const modalHandler = this.#modalContext?.open(this, UMB_CONFIRM_MODAL, {
      data: {
          headline: this.localize.term("umbhostCloudflarePurge_confirmcustompurgetitle"),
          content: this.localize.term("umbhostCloudflarePurge_confirmcustompurgecontent"),
      }
    });
    const result = await modalHandler?.onSubmit().then(() => {
      const data: UmbNotificationDefaultData = { headline: this.localize.term("umbhostCloudflarePurge_purgesuccesstitle"), message: this.localize.term("umbhostCloudflarePurge_purgesuccesscontent") };
      this._notificationContext?.peek('positive', { data });
  
      this.customPurgeButtonState = 'success';
      return;
		})
    .catch(() => undefined);
	}

    override render() {
        return html`
        <umb-workspace-editor>
          <div slot="actions">
            <uui-button
            pristine=""
            label=${this.localize.term("umbhostCloudflarePurge_purgeeverything")}
            @click="${() => this.#handlePurgeEverything()}"
            state=${ifDefined(this.purgeEverythingButtonState)}
            look="secondary"
            color="positive"
            ></uui-button>
            <uui-button
            pristine=""
            label=${this.localize.term("umbhostCloudflarePurge_custompurge")}
            @click="${() => this.#handleCustomPurge()}"
            state=${ifDefined(this.customPurgeButtonState)}
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

    static override readonly styles = [
        css`
            #main {
                display: block;
                flex: 1 1 0%;
                flex-direction: column;
                overflow-y: auto;
                padding: var(--uui-size-layout-1);
            }
        `,
    ];
}

export default UmbHostCloudflarePurgeDashboardElement;

declare global {
    interface HTMLElementTagNameMap {
        'umbhost-cloudflare-purge-cdn-dashboard': UmbHostCloudflarePurgeDashboardElement;
    }
}