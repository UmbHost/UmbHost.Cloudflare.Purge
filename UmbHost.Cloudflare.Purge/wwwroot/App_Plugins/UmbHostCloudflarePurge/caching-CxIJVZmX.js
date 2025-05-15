import { LitElement as m, nothing as d, html as r, css as c, state as b, customElement as g } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as h } from "@umbraco-cms/backoffice/element-api";
var p = Object.defineProperty, f = Object.getOwnPropertyDescriptor, n = (s, l, a, o) => {
  for (var e = o > 1 ? void 0 : o ? f(l, a) : l, t = s.length - 1, u; t >= 0; t--)
    (u = s[t]) && (e = (o ? u(l, a, e) : u(e)) || e);
  return o && e && p(l, a, e), e;
};
let i = class extends h(m) {
  constructor() {
    super(...arguments), this.loading = !0;
  }
  connectedCallback() {
    super.connectedCallback(), setTimeout(() => {
      this.loading = !1;
    }, 5e3);
  }
  render() {
    return r`
		<section id="umbhost-cloudflare-purdge-caching">
<uui-box class="introduction" headline=${this.localize.term("umbhostCloudflarePurge_cachingtitle")}>
			<umb-localize key="umbhostCloudflarePurge_cachingintroduction"></umb-localize>
		</uui-box>  

		${this.loading ? r`<uui-loader-circle></uui-loader-circle>` : d}

		${this.loading ? d : r`
		<uui-box headline=${this.localize.term("umbhostCloudflarePurge_developermodetitle")}>
			<div class="description">
				<umb-localize key="umbhostCloudflarePurge_developermodedescription"></umb-localize>
				<p class="alert alert-warning">
					<umb-localize key="umbhostCloudflarePurge_developermodewarning"></umb-localize>
				</p>
			</div>
			<umb-input-toggle showLabels labelOn=${this.localize.term("umbhostCloudflarePurge_developermodetoggleon")} labelOff=${this.localize.term("umbhostCloudflarePurge_developermodetoggleoff")}></umb-input-toggle>
			<div class="lastmodified">
				<small>
					<strong>
						<umb-localize key="umbhostCloudflarePurge_lastmodified"></umb-localize>:
					</strong> 
					{{vm.developerModeLastModified}}
				</small>
			</div>
		</uui-box>  

		<uui-box headline=${this.localize.term("umbhostCloudflarePurge_cachingleveltitle")}>
			<div class="description">
				<umb-localize key="umbhostCloudflarePurge_cachingleveldescription"></umb-localize>
			</div>
			<umb-input-radio-button-list .list=${[
      {
        label: this.localize.term("umbhostCloudflarePurge_cachinglevelbasic"),
        value: "1"
      },
      {
        label: this.localize.term("umbhostCloudflarePurge_cachinglevelsimplified"),
        value: "2"
      },
      {
        label: this.localize.term("umbhostCloudflarePurge_cachinglevelaggressive"),
        value: "3"
      }
    ]} value="3"></umb-input-radio-button-list>
			<div class="lastmodified">
				<small>
					<strong>
						<umb-localize key="umbhostCloudflarePurge_lastmodified"></umb-localize>:
					</strong> 
					{{vm.developerModeLastModified}}
				</small>
			</div>
		</uui-box> 

		<uui-box headline=${this.localize.term("umbhostCloudflarePurge_browsercachettltitle")}>
			<div class="description">
				<umb-localize key="umbhostCloudflarePurge_browsercachettldescription"></umb-localize>
			</div>
			<uui-select placeholder="Select an option" .options=${[
      {
        name: "Carrot",
        value: "orange"
      },
      {
        name: "Cucumber",
        value: "green"
      },
      {
        name: "Aubergine",
        value: "purple"
      },
      {
        name: "Blueberry",
        value: "Blue"
      },
      {
        name: "Banana",
        value: "yellow"
      },
      {
        name: "Strawberry",
        value: "red"
      }
    ]} value="orange"></uui-select>
			<div class="lastmodified">
				<small>
					<strong>
						<umb-localize key="umbhostCloudflarePurge_lastmodified"></umb-localize>:
					</strong> 
					{{vm.developerModeLastModified}}
				</small>
			</div>
		</uui-box>  

		
		<uui-box headline=${this.localize.term("umbhostCloudflarePurge_alwaysonlinetitle")}>
			<div class="description">
				<umb-localize key="umbhostCloudflarePurge_alwaysonlinedescription"></umb-localize>
			</div>
			<div class="description">
				<umb-localize key="umbhostCloudflarePurge_alwaysonlineterms"></umb-localize>
			</div>
			<umb-input-toggle showLabels labelOn=${this.localize.term("umbhostCloudflarePurge_alwaysonlinetoggleon")} labelOff=${this.localize.term("umbhostCloudflarePurge_alwaysonlinetoggleoff")}></umb-input-toggle>
			<div class="lastmodified">
				<small>
					<strong>
						<umb-localize key="umbhostCloudflarePurge_lastmodified"></umb-localize>:
					</strong> 
					{{vm.developerModeLastModified}}
				</small>
			</div>
		</uui-box>`}
		</section>  
    `;
  }
};
i.styles = c`

	uui-loader-circle {
		display: block;
		text-align: center;
		margin: 0 auto;
		padding-top: var(--uui-size-10);
		font-size: 2em;
	}

			uui-box {
				p:first-child {
					margin-top: 0;
				}
			}

			#umbhost-cloudflare-purdge-caching {
				padding: var(--uui-size-layout-1);
			}

			uui-box:not(:last-of-type) {
				margin-bottom: var(--uui-size-layout-1);
			}

			.description:not(:has(.alert)) {
				padding-bottom: var(--uui-size-6);
			}

			.lastmodified {
				padding-top: var(--uui-size-3);
			}

			.alert {
				border: 1px solid transparent;
				border-radius: 0;
				margin-bottom: 20px;
				padding: 8px 35px 8px 14px;
				position: relative;
			}
			.alert-warning {
				background-color: #f0ac00;
				border-color: transparent;
				color: #fff;
			}
  `;
n([
  b()
], i.prototype, "loading", 2);
i = n([
  g("umbhost-cloudflare-purge-settings-caching")
], i);
export {
  i as default
};
//# sourceMappingURL=caching-CxIJVZmX.js.map
