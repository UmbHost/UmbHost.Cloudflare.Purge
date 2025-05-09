import { LitElement as s, html as n, css as m, customElement as b } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as c } from "@umbraco-cms/backoffice/element-api";
var g = Object.getOwnPropertyDescriptor, p = (u, o, a, r) => {
  for (var e = r > 1 ? void 0 : r ? g(o, a) : o, t = u.length - 1, l; t >= 0; t--)
    (l = u[t]) && (e = l(e) || e);
  return e;
};
let i = class extends c(s) {
  render() {
    return n`   
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
                        label=${this.localize.term("umbhostCloudflarePurge_settingsoverviewcachingbutton")}
                        target="_blank"></uui-button>
            </uui-box>  
            <uui-box headline=${this.localize.term("umbhostCloudflarePurge_settingsoverviewsecuritytitle")}>
                <p>
                    <umb-localize key="umbhostCloudflarePurge_settingsoverviewsecuritydescription"></umb-localize>
                </p>
                <uui-button
						look="primary"
						href="https://umbraco.com/training/"
						label=${this.localize.term("umbhostCloudflarePurge_settingsoverviewsecuritybutton")}
						target="_blank"></uui-button>
            </uui-box>  
            <uui-box headline=${this.localize.term("umbhostCloudflarePurge_settingsoverviewoptimizationtitle")}>
                <p>
                    <umb-localize key="umbhostCloudflarePurge_settingsoverviewoptimizationdescription"></umb-localize>
                </p>
                <uui-button
						look="primary"
						href="https://umbraco.com/training/"
						label=${this.localize.term("umbhostCloudflarePurge_settingsoverviewoptimizationbutton")}
						target="_blank"></uui-button>
            </uui-box>   
        </section>         
    `;
  }
};
i.styles = m`
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
  `;
i = p([
  b("umbhost-cloudflare-purge-settings-overview")
], i);
export {
  i as default
};
//# sourceMappingURL=overview-CFwlISOx.js.map
