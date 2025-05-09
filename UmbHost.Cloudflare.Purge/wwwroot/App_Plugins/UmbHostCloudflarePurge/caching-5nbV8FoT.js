import { LitElement as s, html as p, css as m, customElement as d } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as n } from "@umbraco-cms/backoffice/element-api";
var g = Object.getOwnPropertyDescriptor, c = (i, a, o, u) => {
  for (var e = u > 1 ? void 0 : u ? g(a, o) : a, r = i.length - 1, l; r >= 0; r--)
    (l = i[r]) && (e = l(e) || e);
  return e;
};
let t = class extends n(s) {
  render() {
    return p`   
        <p>Hello World!</p>  
    `;
  }
};
t.styles = m`
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
t = c([
  d("umbhost-cloudflare-purge-settings-caching")
], t);
export {
  t as default
};
//# sourceMappingURL=caching-5nbV8FoT.js.map
