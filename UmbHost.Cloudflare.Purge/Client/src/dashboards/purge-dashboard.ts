import { css, html, customElement, ifDefined, state, property } from '@umbraco-cms/backoffice/external/lit';
import { UUIButtonState } from '@umbraco-cms/backoffice/external/uui';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { UmbNotificationContext, UmbNotificationDefaultData, UMB_NOTIFICATION_CONTEXT, } from '@umbraco-cms/backoffice/notification';
import { UmbModalManagerContext, UMB_CONFIRM_MODAL, UMB_MODAL_MANAGER_CONTEXT } from '@umbraco-cms/backoffice/modal'
import { CustomData, V1Resource } from '../backend-api';

@customElement('umbhost-cloudflare-purge-dashboard')
export class UmbHostCloudflarePurgeDashboardElement extends UmbLitElement {

  private _notificationContext?: UmbNotificationContext;
  #modalContext?: UmbModalManagerContext;

  @state()
  private purgeEverythingButtonState?: UUIButtonState;

  @state()
  private customPurgeButtonState?: UUIButtonState;
 
  private get purgeUrls(): string[] {
  return this.purgeUrlsInput
    .split(/\r\n|\r|\n/)
    .map(line => line.trim())
    .filter(line => line.length > 0);
  }

  @property({ type: String }) 
  private purgeUrlsInput: string = '';

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
        color: 'danger',
        confirmLabel: this.localize.term("umbhostCloudflarePurge_confirmpurgeeverythingconfirm"),
      }
    });
    await modalHandler?.onSubmit().then(() => {
      const data: UmbNotificationDefaultData = { headline: this.localize.term("umbhostCloudflarePurge_purgesuccesstitle"), message: this.localize.term("umbhostCloudflarePurge_purgesuccesscontent") };
      this._notificationContext?.peek('positive', { data });

      V1Resource.all().then(() => {
        this.purgeEverythingButtonState = 'success';
      return;
      }).catch(() => {
        this.purgeEverythingButtonState = 'failed';
      return;
      });
    }).catch(() => {
      this.purgeEverythingButtonState = undefined;
    });
  }

  async #handleCustomPurge() {
    this.customPurgeButtonState = 'waiting';

    const modalHandler = this.#modalContext?.open(this, UMB_CONFIRM_MODAL, {
      data: {
        headline: this.localize.term("umbhostCloudflarePurge_confirmcustompurgetitle"),
        content: this.localize.term("umbhostCloudflarePurge_confirmcustompurgecontent"),
        color: 'danger',
        confirmLabel: this.localize.term("umbhostCloudflarePurge_confirmcustompurgeconfirm"),
      }
    });
    await modalHandler?.onSubmit().then(() => {
      var customPurge : CustomData = {
        requestBody: this.purgeUrls
      }

      V1Resource.custom(customPurge).then(() => {
        const data: UmbNotificationDefaultData = { headline: this.localize.term("umbhostCloudflarePurge_purgesuccesstitle"), message: this.localize.term("umbhostCloudflarePurge_purgesuccesscontent") };
        this._notificationContext?.peek('positive', { data });
        this.purgeEverythingButtonState = 'success';
      return true;
      }).catch(() => {
        const data: UmbNotificationDefaultData = { headline: this.localize.term("umbhostCloudflarePurge_purgeitemfailedtitle"), message: this.localize.term("umbhostCloudflarePurge_purgeitemfailedcontent") };
        this._notificationContext?.peek('danger', { data });
        this.purgeEverythingButtonState = 'failed';
      return;
      });
      this.customPurgeButtonState = 'failed';
      return;
    })
      .catch(() => {
        this.customPurgeButtonState = undefined;
      });
  }

  private handleTextareaInput(e: Event) {
  const target = e.target as HTMLTextAreaElement;
  this.purgeUrlsInput = target.value;
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
                <uui-textarea id="purgeUrls" rows="10" required="" .value=${this.purgeUrlsInput} @input=${this.handleTextareaInput}></uui-textarea>
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