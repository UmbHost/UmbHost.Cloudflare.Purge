import { LitElement as P, nothing as n, html as u, css as U, state as s, customElement as M } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as x } from "@umbraco-cms/backoffice/element-api";
import { V as g } from "./services.gen-Ce7SQPJn.js";
import { UmbChangeEvent as v } from "@umbraco-cms/backoffice/event";
var V = Object.defineProperty, D = Object.getOwnPropertyDescriptor, y = (e) => {
  throw TypeError(e);
}, a = (e, o, l, i) => {
  for (var r = i > 1 ? void 0 : i ? D(o, l) : o, c = e.length - 1, p; c >= 0; c--)
    (p = e[c]) && (r = (i ? p(o, l, r) : p(r)) || r);
  return i && r && V(o, l, r), r;
}, k = (e, o, l) => o.has(e) || y("Cannot " + l), S = (e, o, l) => o.has(e) ? y("Cannot add the same private member more than once") : o instanceof WeakSet ? o.add(e) : o.set(e, l), m = (e, o, l) => (k(e, o, "access private method"), l), h, L, _, z, O, T;
let t = class extends x(P) {
  constructor() {
    super(...arguments), S(this, h), this.firstLoad = !0, this.loading = !1, this.zones = [], this.zoneId = void 0, this.browserCacheTtlLoading = !1, this.alwaysOnlineLoading = !1, this.developerModeLoading = !1, this.cachingLevelLoading = !1, this.cachingLevelOptions = [
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
  updated(e) {
    if (super.updated(e), e.has("browserCacheTtlValue") && this.browserCacheTtlOptions) {
      const o = this.browserCacheTtlValue;
      this.browserCacheTtlOptions = this.browserCacheTtlOptions.map((l) => ({
        ...l,
        selected: l.value === o
      }));
    }
  }
  connectedCallback() {
    super.connectedCallback(), this.loadData();
  }
  async loadData() {
    const e = await g.getZones();
    this.zones = e == null ? void 0 : e.map((o) => ({
      name: o.domain,
      value: o.zoneId
    }));
  }
  render() {
    return u`
		<section id="umbhost-cloudflare-purdge-caching">
			<uui-box class="introduction" headline=${this.localize.term("umbhostCloudflarePurge_cachingtitle")}>
				<p><umb-localize key="umbhostCloudflarePurge_cachingintroduction"></umb-localize></p>
				
					<uui-label for="zone">Select Domain: </uui-label>
					<uui-select id="zone"
					required="" 
						placeholder="Select an option"
						.options=${this.zones ?? []}
						@change=${m(this, h, T)}
						>
					</uui-select>
			</uui-box>  

		${this.firstLoad ? n : u`
			${this.loading ? u`<uui-loader-circle></uui-loader-circle>` : n}

			${this.loading ? n : u`
			<uui-box headline=${this.localize.term("umbhostCloudflarePurge_developermodetitle")}>
				${this.developerModeLoading ? u`<uui-loader></uui-loader>` : n}
				${this.developerModeLoading ? n : u`
				<div class="description">
					<umb-localize key="umbhostCloudflarePurge_developermodedescription"></umb-localize>
					<p class="alert alert-warning">
						<umb-localize key="umbhostCloudflarePurge_developermodewarning"></umb-localize>
					</p>
				</div>
				<umb-input-toggle showLabels @change=${m(this, h, z)} ?checked=${this.developerModeValue} labelOn=${this.localize.term("umbhostCloudflarePurge_developermodetoggleon")} labelOff=${this.localize.term("umbhostCloudflarePurge_developermodetoggleoff")}></umb-input-toggle>
				<div class="lastmodified">
					<small>
						<strong>
							<umb-localize key="umbhostCloudflarePurge_lastmodified"></umb-localize>:
						</strong> 
						${this.developerModeUpdated ? this.developerModeUpdated : n}
					</small>
				</div>
				`}
			</uui-box>  

			<uui-box headline=${this.localize.term("umbhostCloudflarePurge_cachingleveltitle")}>
				${this.cachingLevelLoading ? u`<uui-loader></uui-loader>` : n}
				${this.cachingLevelLoading ? n : u`
				<div class="description">
					<umb-localize key="umbhostCloudflarePurge_cachingleveldescription"></umb-localize>
				</div>
				<umb-input-radio-button-list .list=${this.cachingLevelOptions} .value=${this.cachingLevelValue ?? ""} @change=${m(this, h, O)} ></umb-input-radio-button-list>
				<div class="lastmodified">
					<small>
						<strong>
							<umb-localize key="umbhostCloudflarePurge_lastmodified"></umb-localize>:
						</strong> 
						${this.cachingLevelUpdated ? this.cachingLevelUpdated : n}
					</small>
				</div>
				`}
			</uui-box> 

			<uui-box headline=${this.localize.term("umbhostCloudflarePurge_browsercachettltitle")}>
				${this.browserCacheTtlLoading ? u`<uui-loader></uui-loader>` : n}
				${this.browserCacheTtlLoading ? n : u`
					<div class="description">
						<umb-localize key="umbhostCloudflarePurge_browsercachettldescription"></umb-localize>
					</div>
					<uui-select id="browserCacheTtl" 
						placeholder="Select an option" 
						.options=${this.browserCacheTtlOptions ?? []}
						@change=${m(this, h, L)} >
					</uui-select>
					<div class="lastmodified">
						<small>
							<strong>
								<umb-localize key="umbhostCloudflarePurge_lastmodified"></umb-localize>:
							</strong> 
							${this.browserCacheTtlUpdated ? this.browserCacheTtlUpdated : n}
						</small>
					</div>
				`}
			</uui-box>  

			
			<uui-box headline=${this.localize.term("umbhostCloudflarePurge_alwaysonlinetitle")}>
				${this.alwaysOnlineLoading ? u`<uui-loader></uui-loader>` : n}
				${this.alwaysOnlineLoading ? n : u`
				<div class="description">
					<umb-localize key="umbhostCloudflarePurge_alwaysonlinedescription"></umb-localize>
				</div>
				<div class="description">
					<umb-localize key="umbhostCloudflarePurge_alwaysonlineterms"></umb-localize>
				</div>
				<umb-input-toggle @change=${m(this, h, _)} ?checked=${this.alwaysOnlineValue}  showLabels labelOn=${this.localize.term("umbhostCloudflarePurge_alwaysonlinetoggleon")} labelOff=${this.localize.term("umbhostCloudflarePurge_alwaysonlinetoggleoff")}></umb-input-toggle>
				<div class="lastmodified">
					<small>
						<strong>
							<umb-localize key="umbhostCloudflarePurge_lastmodified"></umb-localize>:
						</strong> 
						${this.alwaysOnlineUpdated ? this.alwaysOnlineUpdated : n}
					</small>
				</div>
				`}
			</uui-box>`}
		`}
		</section>  
    `;
  }
};
h = /* @__PURE__ */ new WeakSet();
L = function(e) {
  var i;
  this.browserCacheTtlLoading = !0;
  const o = e.target, l = (i = this.browserCacheTtlOptions) == null ? void 0 : i.find((r) => r.value === Number(o.value));
  if (l) {
    const r = {
      zoneId: this.zoneId,
      requestBody: {
        value: l.value
      }
    };
    g.toggleBrowserCacheTtl(r).then((c) => {
      this.browserCacheTtlValue = Number(c.value), this.browserCacheTtlUpdated = c.modified_on ? new Date(c.modified_on).toLocaleString() : void 0;
    }).finally(() => {
      this.browserCacheTtlLoading = !1, this.dispatchEvent(new v());
    });
  }
};
_ = function(e) {
  this.alwaysOnlineLoading = !0;
  const o = e.target.checked, l = {
    zoneId: this.zoneId,
    requestBody: {
      value: o ? "on" : "off"
    }
  };
  g.toggleAlwaysOnline(l).then((i) => {
    this.alwaysOnlineValue = i.value.toLowerCase() === "on", this.alwaysOnlineUpdated = i.modified_on ? new Date(i.modified_on).toLocaleString() : void 0;
  }).finally(() => {
    this.alwaysOnlineLoading = !1, this.dispatchEvent(new v());
  });
};
z = function(e) {
  this.developerModeLoading = !0;
  const o = e.target.checked, l = {
    zoneId: this.zoneId,
    requestBody: {
      value: o ? "on" : "off"
    }
  };
  g.toggleDevelopmentMode(l).then((i) => {
    this.developerModeValue = i.value.toLowerCase() === "on", this.developerModeUpdated = i.modified_on ? new Date(i.modified_on).toLocaleString() : void 0;
  }).finally(() => {
    this.developerModeLoading = !1, this.dispatchEvent(new v());
  });
};
O = function(e) {
  this.cachingLevelLoading = !0;
  const o = {
    zoneId: this.zoneId,
    requestBody: {
      value: e.target.value
    }
  };
  g.toggleCachingLevel(o).then((l) => {
    this.cachingLevelValue = l == null ? void 0 : l.value.toLowerCase(), this.cachingLevelUpdated = l.modified_on ? new Date(l.modified_on).toLocaleString() : void 0;
  }).finally(() => {
    this.cachingLevelLoading = !1, this.dispatchEvent(new v());
  });
};
T = async function(e) {
  var l, i, r, c, p, f, w, C;
  try {
    const b = e.target;
    if (b.value) {
      this.firstLoad = !1, this.loading = !0, this.zoneId = b.value;
      var o = {
        zoneId: b.value
      };
      const [$, d] = await Promise.all([
        g.browserTtlOptions(),
        g.getCacheSettings(o)
      ]);
      this.browserCacheTtlOptions = $, this.browserCacheTtlValue = ((l = d.browserCacheTtl) == null ? void 0 : l.value) !== void 0 ? Number(d.browserCacheTtl.value) : void 0, this.browserCacheTtlUpdated = (i = d.browserCacheTtl) != null && i.modified_on ? new Date(d.browserCacheTtl.modified_on).toLocaleString() : void 0, this.alwaysOnlineValue = ((r = d.alwaysOnline) == null ? void 0 : r.value.toLowerCase()) === "on", this.alwaysOnlineUpdated = (c = d.alwaysOnline) != null && c.modified_on ? new Date(d.alwaysOnline.modified_on).toLocaleString() : void 0, this.developerModeValue = ((p = d.developmentMode) == null ? void 0 : p.value.toLowerCase()) === "on", this.developerModeUpdated = (f = d.developmentMode) != null && f.modified_on ? new Date(d.developmentMode.modified_on).toLocaleString() : void 0, this.cachingLevelUpdated = (w = d.cacheLevel) != null && w.modified_on ? new Date(d.cacheLevel.modified_on).toLocaleString() : void 0, this.cachingLevelValue = (C = d.cacheLevel) == null ? void 0 : C.value.toLowerCase();
    }
  } finally {
    this.loading = !1;
  }
};
t.styles = U`

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
  s()
], t.prototype, "firstLoad", 2);
a([
  s()
], t.prototype, "loading", 2);
a([
  s()
], t.prototype, "zones", 2);
a([
  s()
], t.prototype, "zoneId", 2);
a([
  s()
], t.prototype, "browserCacheTtlLoading", 2);
a([
  s()
], t.prototype, "alwaysOnlineLoading", 2);
a([
  s()
], t.prototype, "developerModeLoading", 2);
a([
  s()
], t.prototype, "cachingLevelLoading", 2);
a([
  s()
], t.prototype, "browserCacheTtlOptions", 2);
a([
  s()
], t.prototype, "browserCacheTtlValue", 2);
a([
  s()
], t.prototype, "browserCacheTtlUpdated", 2);
a([
  s()
], t.prototype, "alwaysOnlineUpdated", 2);
a([
  s()
], t.prototype, "alwaysOnlineValue", 2);
a([
  s()
], t.prototype, "developerModeUpdated", 2);
a([
  s()
], t.prototype, "developerModeValue", 2);
a([
  s()
], t.prototype, "cachingLevelUpdated", 2);
a([
  s()
], t.prototype, "cachingLevelValue", 2);
t = a([
  M("umbhost-cloudflare-purge-settings-caching")
], t);
export {
  t as default
};
//# sourceMappingURL=caching-BLugEKU4.js.map
