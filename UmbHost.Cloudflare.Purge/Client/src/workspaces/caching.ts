import { LitElement, html, customElement, css } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";

@customElement('umbhost-cloudflare-purge-settings-caching')
export default class UmbHostCloudflarePurgeCachingViewElement extends UmbElementMixin(LitElement) {

    render() {
        return html`   
        <p>Hello World!</p>  
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
        'umbhost-cloudflare-purge-settings-caching': UmbHostCloudflarePurgeCachingViewElement
    }
}
