import { LitElement, html, customElement, css } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";

@customElement('umbhost-cloudflare-purge-settings-overview')
export default class UmbHostCloudflarePurgeOverviewViewElement extends UmbElementMixin(LitElement) {

    render() {
        return html`   
        <uui-box class="introduction" headline=${this.localize.term("umbhostCloudflarePurge_settingsoverviewtitle")}>
            <umb-localize key="umbhostCloudflarePurge_settingsoverviewintroduction"></umb-localize>
        </uui-box>  
        <section id="umbhost-cloudflare-purdge-overview">
            <uui-box headline=${this.localize.term("umbhostCloudflarePurge_settingsoverviewcachingtitle")}>
                <p>
                    <umb-localize key="umbhostCloudflarePurge_settingsoverviewcachingdescription"></umb-localize>
                </p>
                <uui-button
                        look="primary"
                        href="https://umbraco.com/training/"
                        label=${this.localize.term('umbhostCloudflarePurge_settingsoverviewcachingbutton')}
                        target="_blank"></uui-button>
            </uui-box>  
            <uui-box headline=${this.localize.term("umbhostCloudflarePurge_settingsoverviewsecuritytitle")}>
                <p>
                    <umb-localize key="umbhostCloudflarePurge_settingsoverviewsecuritydescription"></umb-localize>
                </p>
                <uui-button
						look="primary"
						href="https://umbraco.com/training/"
						label=${this.localize.term('umbhostCloudflarePurge_settingsoverviewsecuritybutton')}
						target="_blank"></uui-button>
            </uui-box>  
            <uui-box headline=${this.localize.term("umbhostCloudflarePurge_settingsoverviewoptimizationtitle")}>
                <p>
                    <umb-localize key="umbhostCloudflarePurge_settingsoverviewoptimizationdescription"></umb-localize>
                </p>
                <uui-button
						look="primary"
						href="https://umbraco.com/training/"
						label=${this.localize.term('umbhostCloudflarePurge_settingsoverviewoptimizationbutton')}
						target="_blank"></uui-button>
            </uui-box>   
        </section>         
    `
    }

    static styles = css`
			#umbhost-cloudflare-purdge-overview {
				display: grid;
				grid-gap: var(--uui-size-7);
				grid-template-columns: repeat(3, 1fr);
				padding: var(--uui-size-layout-1);
			}

			uui-box {
				p:first-child {
					margin-top: 0;
				}
			}

			@media (max-width: 1200px) {
				#umbhost-cloudflare-purdge-overview {
					grid-template-columns: repeat(2, 1fr);
				}
			}

			@media (max-width: 800px) {
				#umbhost-cloudflare-purdge-overview {
					grid-template-columns: repeat(1, 1fr);
				}
			}

            .introduction {
                margin-top: var(--uui-size-layout-1);
                margin-left: var(--uui-size-layout-1);
                margin-right: var(--uui-size-layout-1);
            }

			.button-group {
				display: flex;
				flex-wrap: wrap;
				gap: var(--uui-size-space-2);
			}
  `
}

declare global {
    interface HTMLElementTagNameMap {
        'umbhost-cloudflare-purge-settings-overview': UmbHostCloudflarePurgeOverviewViewElement
    }
}
