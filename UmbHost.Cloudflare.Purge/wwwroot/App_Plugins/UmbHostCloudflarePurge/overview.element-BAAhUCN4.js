import { html as s, css as m, customElement as n } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as c } from "@umbraco-cms/backoffice/lit-element";
import "./config-status-alert.element-D98q-Vp6.js";
var g = Object.getOwnPropertyDescriptor, b = (u, o, a, r) => {
  for (var e = r > 1 ? void 0 : r ? g(o, a) : o, t = u.length - 1, l; t >= 0; t--)
    (l = u[t]) && (e = l(e) || e);
  return e;
};
let i = class extends c {
  render() {
    return s`
        <umbhost-cloudflare-purge-config-status-alert></umbhost-cloudflare-purge-config-status-alert>
        <uui-box class="introduction" headline=${this.localize.term("umbhostCloudflarePurge_settingsoverviewtitle")}>
            <umb-localize key="umbhostCloudflarePurge_settingsoverviewintroduction"></umb-localize>
        </uui-box>  
        <section id="umbhost-cloudflare-purge-overview">
            <uui-box headline=${this.localize.term("umbhostCloudflarePurge_settingsoverviewcachingtitle")}>
                <p>
                    <umb-localize key="umbhostCloudflarePurge_settingsoverviewcachingdescription"></umb-localize>
                </p>
                <uui-button
                        look="primary"
                        href="/umbraco/section/settings/workspace/umbhost-cloudflare-purge/view/caching"
                        label=${this.localize.term("umbhostCloudflarePurge_settingsoverviewcachingbutton")}></uui-button>
            </uui-box>  
            <uui-box headline=${this.localize.term("umbhostCloudflarePurge_settingsoverviewsecuritytitle")}>
                <p>
                    <umb-localize key="umbhostCloudflarePurge_settingsoverviewsecuritydescription"></umb-localize>
                </p>
                <uui-button
						look="primary"
						href=""
                        disabled
						label=${this.localize.term("umbhostCloudflarePurge_settingsoverviewsecuritybutton")}
						target="_blank"></uui-button>
            </uui-box>  
            <uui-box headline=${this.localize.term("umbhostCloudflarePurge_settingsoverviewoptimizationtitle")}>
                <p>
                    <umb-localize key="umbhostCloudflarePurge_settingsoverviewoptimizationdescription"></umb-localize>
                </p>
                <uui-button
						look="primary"
                        disabled
						href=""
						label=${this.localize.term("umbhostCloudflarePurge_settingsoverviewoptimizationbutton")}
						target="_blank"></uui-button>
            </uui-box>   
        </section>         
    `;
  }
};
i.styles = m`
			#umbhost-cloudflare-purge-overview {
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
				#umbhost-cloudflare-purge-overview {
					grid-template-columns: repeat(2, 1fr);
				}
			}

			@media (max-width: 800px) {
				#umbhost-cloudflare-purge-overview {
					grid-template-columns: repeat(1, 1fr);
				}
			}

            umbhost-cloudflare-purge-config-status-alert {
                display: block;
                margin: var(--uui-size-layout-1) var(--uui-size-layout-1) 0;
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
  `;
i = b([
  n("umbhost-cloudflare-purge-settings-overview")
], i);
export {
  i as default
};
//# sourceMappingURL=overview.element-BAAhUCN4.js.map
