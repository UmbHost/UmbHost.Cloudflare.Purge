import { LitElement as O, nothing as r, html as u, css as z, state as n, customElement as T } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as $ } from "@umbraco-cms/backoffice/element-api";
import { V as p } from "./services.gen-Bl82s6UX.js";
import { UmbChangeEvent as v } from "@umbraco-cms/backoffice/event";
var P = Object.defineProperty, U = Object.getOwnPropertyDescriptor, f = (o) => {
  throw TypeError(o);
}, a = (o, l, e, t) => {
  for (var s = t > 1 ? void 0 : t ? U(l, e) : l, c = o.length - 1, h; c >= 0; c--)
    (h = o[c]) && (s = (t ? h(l, e, s) : h(s)) || s);
  return t && s && P(l, e, s), s;
}, M = (o, l, e) => l.has(o) || f("Cannot " + e), x = (o, l, e) => l.has(o) ? f("Cannot add the same private member more than once") : l instanceof WeakSet ? l.add(o) : l.set(o, e), m = (o, l, e) => (M(o, l, "access private method"), e), g, w, C, y, L;
let i = class extends $(O) {
  constructor() {
    super(...arguments), x(this, g), this.loading = !0, this.browserCacheTtlLoading = !1, this.alwaysOnlineLoading = !1, this.developerModeLoading = !1, this.cachingLevelLoading = !1, this.cachingLevelOptions = [
      {
        label: this.localize.term("umbhostCloudflarePurge_cachinglevelbasic"),
        value: "basic"
      },
      {
        label: this.localize.term("umbhostCloudflarePurge_cachinglevelsimplified"),
        value: "simplified"
      },
      {
        label: this.localize.term("umbhostCloudflarePurge_cachinglevelaggressive"),
        value: "aggressive"
      }
    ];
  }
  updated(o) {
    if (super.updated(o), o.has("browserCacheTtlValue") && this.browserCacheTtlOptions) {
      const l = this.browserCacheTtlValue;
      this.browserCacheTtlOptions = this.browserCacheTtlOptions.map((e) => ({
        ...e,
        selected: e.value === l
      }));
    }
  }
  connectedCallback() {
    super.connectedCallback(), this.loadData();
  }
  async loadData() {
    var o, l, e, t, s, c, h, b;
    this.loading = !0;
    try {
      const [_, d] = await Promise.all([
        p.browserTtlOptions(),
        p.getCacheSettings()
      ]);
      this.browserCacheTtlOptions = _, this.browserCacheTtlValue = ((o = d.browserCacheTtl) == null ? void 0 : o.value) !== void 0 ? Number(d.browserCacheTtl.value) : void 0, this.browserCacheTtlUpdated = (l = d.browserCacheTtl) != null && l.modified_on ? new Date(d.browserCacheTtl.modified_on).toLocaleString() : void 0, this.alwaysOnlineValue = ((e = d.alwaysOnline) == null ? void 0 : e.value.toLowerCase()) === "on", this.alwaysOnlineUpdated = (t = d.alwaysOnline) != null && t.modified_on ? new Date(d.alwaysOnline.modified_on).toLocaleString() : void 0, this.developerModeValue = ((s = d.developmentMode) == null ? void 0 : s.value.toLowerCase()) === "on", this.developerModeUpdated = (c = d.developmentMode) != null && c.modified_on ? new Date(d.developmentMode.modified_on).toLocaleString() : void 0, this.cachingLevelUpdated = (h = d.cacheLevel) != null && h.modified_on ? new Date(d.cacheLevel.modified_on).toLocaleString() : void 0, this.cachingLevelValue = (b = d.cacheLevel) == null ? void 0 : b.value.toLowerCase();
    } finally {
      this.loading = !1;
    }
  }
  render() {
    return u`
		<section id="umbhost-cloudflare-purdge-caching">
			<uui-box class="introduction" headline=${this.localize.term("umbhostCloudflarePurge_cachingtitle")}>
				<umb-localize key="umbhostCloudflarePurge_cachingintroduction"></umb-localize>
			</uui-box>  

			${this.loading ? u`<uui-loader-circle></uui-loader-circle>` : r}

			${this.loading ? r : u`
			<uui-box headline=${this.localize.term("umbhostCloudflarePurge_developermodetitle")}>
				${this.developerModeLoading ? u`<uui-loader></uui-loader>` : r}
				${this.developerModeLoading ? r : u`
				<div class="description">
					<umb-localize key="umbhostCloudflarePurge_developermodedescription"></umb-localize>
					<p class="alert alert-warning">
						<umb-localize key="umbhostCloudflarePurge_developermodewarning"></umb-localize>
					</p>
				</div>
				<umb-input-toggle showLabels @change=${m(this, g, y)} ?checked=${this.developerModeValue} labelOn=${this.localize.term("umbhostCloudflarePurge_developermodetoggleon")} labelOff=${this.localize.term("umbhostCloudflarePurge_developermodetoggleoff")}></umb-input-toggle>
				<div class="lastmodified">
					<small>
						<strong>
							<umb-localize key="umbhostCloudflarePurge_lastmodified"></umb-localize>:
						</strong> 
						${this.developerModeUpdated ? this.developerModeUpdated : r}
					</small>
				</div>
				`}
			</uui-box>  

			<uui-box headline=${this.localize.term("umbhostCloudflarePurge_cachingleveltitle")}>
				${this.cachingLevelLoading ? u`<uui-loader></uui-loader>` : r}
				${this.cachingLevelLoading ? r : u`
				<div class="description">
					<umb-localize key="umbhostCloudflarePurge_cachingleveldescription"></umb-localize>
				</div>
				<umb-input-radio-button-list .list=${this.cachingLevelOptions} .value=${this.cachingLevelValue ?? ""} @change=${m(this, g, L)} ></umb-input-radio-button-list>
				<div class="lastmodified">
					<small>
						<strong>
							<umb-localize key="umbhostCloudflarePurge_lastmodified"></umb-localize>:
						</strong> 
						${this.cachingLevelUpdated ? this.cachingLevelUpdated : r}
					</small>
				</div>
				`}
			</uui-box> 

			<uui-box headline=${this.localize.term("umbhostCloudflarePurge_browsercachettltitle")}>
				${this.browserCacheTtlLoading ? u`<uui-loader></uui-loader>` : r}
				${this.browserCacheTtlLoading ? r : u`
					<div class="description">
						<umb-localize key="umbhostCloudflarePurge_browsercachettldescription"></umb-localize>
					</div>
					<uui-select id="browserCacheTtl" 
						placeholder="Select an option" 
						.options=${this.browserCacheTtlOptions ?? []}
						@change=${m(this, g, w)} >
					</uui-select>
					<div class="lastmodified">
						<small>
							<strong>
								<umb-localize key="umbhostCloudflarePurge_lastmodified"></umb-localize>:
							</strong> 
							${this.browserCacheTtlUpdated ? this.browserCacheTtlUpdated : r}
						</small>
					</div>
				`}
			</uui-box>  

			
			<uui-box headline=${this.localize.term("umbhostCloudflarePurge_alwaysonlinetitle")}>
				${this.alwaysOnlineLoading ? u`<uui-loader></uui-loader>` : r}
				${this.alwaysOnlineLoading ? r : u`
				<div class="description">
					<umb-localize key="umbhostCloudflarePurge_alwaysonlinedescription"></umb-localize>
				</div>
				<div class="description">
					<umb-localize key="umbhostCloudflarePurge_alwaysonlineterms"></umb-localize>
				</div>
				<umb-input-toggle @change=${m(this, g, C)} ?checked=${this.alwaysOnlineValue}  showLabels labelOn=${this.localize.term("umbhostCloudflarePurge_alwaysonlinetoggleon")} labelOff=${this.localize.term("umbhostCloudflarePurge_alwaysonlinetoggleoff")}></umb-input-toggle>
				<div class="lastmodified">
					<small>
						<strong>
							<umb-localize key="umbhostCloudflarePurge_lastmodified"></umb-localize>:
						</strong> 
						${this.alwaysOnlineUpdated ? this.alwaysOnlineUpdated : r}
					</small>
				</div>
				`}
			</uui-box>`}
		</section>  
    `;
  }
};
g = /* @__PURE__ */ new WeakSet();
w = function(o) {
  var t;
  this.browserCacheTtlLoading = !0;
  const l = o.target, e = (t = this.browserCacheTtlOptions) == null ? void 0 : t.find((s) => s.value === Number(l.value));
  if (e) {
    const s = {
      requestBody: {
        value: e.value
      }
    };
    p.toggleBrowserCacheTtl(s).then((c) => {
      this.browserCacheTtlValue = Number(c.value), this.browserCacheTtlUpdated = c.modified_on ? new Date(c.modified_on).toLocaleString() : void 0;
    }).finally(() => {
      this.browserCacheTtlLoading = !1, this.dispatchEvent(new v());
    });
  }
};
C = function(o) {
  this.alwaysOnlineLoading = !0;
  const e = {
    requestBody: {
      value: o.target.checked ? "on" : "off"
    }
  };
  p.toggleAlwaysOnline(e).then((t) => {
    this.alwaysOnlineValue = t.value.toLowerCase() === "on", this.alwaysOnlineUpdated = t.modified_on ? new Date(t.modified_on).toLocaleString() : void 0;
  }).finally(() => {
    this.alwaysOnlineLoading = !1, this.dispatchEvent(new v());
  });
};
y = function(o) {
  this.developerModeLoading = !0;
  const e = {
    requestBody: {
      value: o.target.checked ? "on" : "off"
    }
  };
  p.toggleDevelopmentMode(e).then((t) => {
    this.developerModeValue = t.value.toLowerCase() === "on", this.developerModeUpdated = t.modified_on ? new Date(t.modified_on).toLocaleString() : void 0;
  }).finally(() => {
    this.developerModeLoading = !1, this.dispatchEvent(new v());
  });
};
L = function(o) {
  this.cachingLevelLoading = !0;
  const l = {
    requestBody: {
      value: o.target.value
    }
  };
  p.toggleCachingLevel(l).then((e) => {
    this.cachingLevelValue = e == null ? void 0 : e.value.toLowerCase(), this.cachingLevelUpdated = e.modified_on ? new Date(e.modified_on).toLocaleString() : void 0;
  }).finally(() => {
    this.cachingLevelLoading = !1, this.dispatchEvent(new v());
  });
};
i.styles = z`

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
a([
  n()
], i.prototype, "loading", 2);
a([
  n()
], i.prototype, "browserCacheTtlLoading", 2);
a([
  n()
], i.prototype, "alwaysOnlineLoading", 2);
a([
  n()
], i.prototype, "developerModeLoading", 2);
a([
  n()
], i.prototype, "cachingLevelLoading", 2);
a([
  n()
], i.prototype, "browserCacheTtlOptions", 2);
a([
  n()
], i.prototype, "browserCacheTtlValue", 2);
a([
  n()
], i.prototype, "browserCacheTtlUpdated", 2);
a([
  n()
], i.prototype, "alwaysOnlineUpdated", 2);
a([
  n()
], i.prototype, "alwaysOnlineValue", 2);
a([
  n()
], i.prototype, "developerModeUpdated", 2);
a([
  n()
], i.prototype, "developerModeValue", 2);
a([
  n()
], i.prototype, "cachingLevelUpdated", 2);
a([
  n()
], i.prototype, "cachingLevelValue", 2);
i = a([
  T("umbhost-cloudflare-purge-settings-caching")
], i);
export {
  i as default
};
//# sourceMappingURL=caching-DDW_WdUB.js.map
