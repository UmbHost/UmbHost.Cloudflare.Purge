import { nothing as o, html as r, css as $, state as s, customElement as O } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as P } from "@umbraco-cms/backoffice/lit-element";
import "./config-status-alert.element-D98q-Vp6.js";
import { UmbChangeEvent as b } from "@umbraco-cms/backoffice/event";
import { UMB_HOST_CLOUDFLARE_PURGE_CACHING_CONTEXT as T } from "./caching-workspace.context-C9ueVYU8.js";
var U = Object.defineProperty, M = Object.getOwnPropertyDescriptor, w = (l) => {
  throw TypeError(l);
}, a = (l, e, i, u) => {
  for (var d = u > 1 ? void 0 : u ? M(e, i) : e, c = l.length - 1, m; c >= 0; c--)
    (m = l[c]) && (d = (u ? m(e, i, d) : m(d)) || d);
  return u && d && U(e, i, d), d;
}, v = (l, e, i) => e.has(l) || w("Cannot " + i), p = (l, e, i) => (v(l, e, "read from private field"), i ? i.call(l) : e.get(l)), f = (l, e, i) => e.has(l) ? w("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(l) : e.set(l, i), V = (l, e, i, u) => (v(l, e, "write to private field"), e.set(l, i), i), g = (l, e, i) => (v(l, e, "access private method"), i), n, h, C, y, _, z, L;
let t = class extends P {
  constructor() {
    super(), f(this, h), f(this, n), this.firstLoad = !0, this.loading = !1, this.zones = [], this.browserCacheTtlLoading = !1, this.alwaysOnlineLoading = !1, this.developerModeLoading = !1, this.cachingLevelLoading = !1, this.cachingLevelOptions = [
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
    ], this.consumeContext(T, (l) => {
      V(this, n, l), l && (this.observe(l.zones, (e) => {
        this.zones = e;
      }), this.observe(l.firstLoad, (e) => {
        this.firstLoad = e;
      }), this.observe(l.loading, (e) => {
        this.loading = e;
      }), this.observe(l.browserCacheTtlOptions, (e) => {
        this.browserCacheTtlOptions = e;
      }), this.observe(l.browserCacheTtlValue, (e) => {
        this.browserCacheTtlValue = e;
      }), this.observe(l.browserCacheTtlUpdated, (e) => {
        this.browserCacheTtlUpdated = e;
      }), this.observe(l.browserCacheTtlLoading, (e) => {
        this.browserCacheTtlLoading = e;
      }), this.observe(l.alwaysOnlineValue, (e) => {
        this.alwaysOnlineValue = e;
      }), this.observe(l.alwaysOnlineUpdated, (e) => {
        this.alwaysOnlineUpdated = e;
      }), this.observe(l.alwaysOnlineLoading, (e) => {
        this.alwaysOnlineLoading = e;
      }), this.observe(l.developerModeValue, (e) => {
        this.developerModeValue = e;
      }), this.observe(l.developerModeUpdated, (e) => {
        this.developerModeUpdated = e;
      }), this.observe(l.developerModeLoading, (e) => {
        this.developerModeLoading = e;
      }), this.observe(l.cachingLevelValue, (e) => {
        this.cachingLevelValue = e;
      }), this.observe(l.cachingLevelUpdated, (e) => {
        this.cachingLevelUpdated = e;
      }), this.observe(l.cachingLevelLoading, (e) => {
        this.cachingLevelLoading = e;
      }));
    });
  }
  updated(l) {
    if (super.updated(l), l.has("browserCacheTtlValue") && this.browserCacheTtlOptions) {
      const e = this.browserCacheTtlValue;
      this.browserCacheTtlOptions = this.browserCacheTtlOptions.map((i) => ({
        ...i,
        selected: i.value === e
      }));
    }
  }
  render() {
    return r`
		<section id="umbhost-cloudflare-purge-caching">
			<uui-box class="introduction" headline=${this.localize.term("umbhostCloudflarePurge_cachingtitle")}>
				<p><umb-localize key="umbhostCloudflarePurge_cachingintroduction"></umb-localize></p>

				<umbhost-cloudflare-purge-config-status-alert></umbhost-cloudflare-purge-config-status-alert>

				${this.zones && this.zones.length > 0 ? r`
					<uui-label for="zone">${this.localize.term("umbhostCloudflarePurge_selectdomain")}: </uui-label>
					<uui-select id="zone"
					required=""
						label=${this.localize.term("umbhostCloudflarePurge_selectdomain")}
						placeholder=${this.localize.term("umbhostCloudflarePurge_selectanoption")}
						.options=${this.zones ?? []}
						@change=${g(this, h, L)}
						>
					</uui-select>
				` : o}
			</uui-box>

		${this.firstLoad ? o : r`
			${this.loading ? r`<uui-loader-circle></uui-loader-circle>` : o}

			${this.loading ? o : r`
			<uui-box headline=${this.localize.term("umbhostCloudflarePurge_developermodetitle")}>
				${this.developerModeLoading ? r`<uui-loader></uui-loader>` : o}
				${this.developerModeLoading ? o : r`
				<div class="description">
					<umb-localize key="umbhostCloudflarePurge_developermodedescription"></umb-localize>
					<p class="alert alert-warning">
						<umb-localize key="umbhostCloudflarePurge_developermodewarning"></umb-localize>
					</p>
				</div>
				<umb-input-toggle showLabels @change=${g(this, h, _)} ?checked=${this.developerModeValue} labelOn=${this.localize.term("umbhostCloudflarePurge_developermodetoggleon")} labelOff=${this.localize.term("umbhostCloudflarePurge_developermodetoggleoff")}></umb-input-toggle>
				<div class="lastmodified">
					<small>
						<strong>
							<umb-localize key="umbhostCloudflarePurge_lastmodified"></umb-localize>:
						</strong>
						${this.developerModeUpdated ? this.developerModeUpdated : o}
					</small>
				</div>
				`}
			</uui-box>

			<uui-box headline=${this.localize.term("umbhostCloudflarePurge_cachingleveltitle")}>
				${this.cachingLevelLoading ? r`<uui-loader></uui-loader>` : o}
				${this.cachingLevelLoading ? o : r`
				<div class="description">
					<umb-localize key="umbhostCloudflarePurge_cachingleveldescription"></umb-localize>
				</div>
				<umb-input-radio-button-list .list=${this.cachingLevelOptions} .value=${this.cachingLevelValue ?? ""} @change=${g(this, h, z)} ></umb-input-radio-button-list>
				<div class="lastmodified">
					<small>
						<strong>
							<umb-localize key="umbhostCloudflarePurge_lastmodified"></umb-localize>:
						</strong>
						${this.cachingLevelUpdated ? this.cachingLevelUpdated : o}
					</small>
				</div>
				`}
			</uui-box>

			<uui-box headline=${this.localize.term("umbhostCloudflarePurge_browsercachettltitle")}>
				${this.browserCacheTtlLoading ? r`<uui-loader></uui-loader>` : o}
				${this.browserCacheTtlLoading ? o : r`
					<div class="description">
						<umb-localize key="umbhostCloudflarePurge_browsercachettldescription"></umb-localize>
					</div>
					<uui-select id="browserCacheTtl"
						label=${this.localize.term("umbhostCloudflarePurge_browsercachettltitle")}
						placeholder=${this.localize.term("umbhostCloudflarePurge_selectanoption")}
						.options=${this.browserCacheTtlOptions ?? []}
						@change=${g(this, h, C)} >
					</uui-select>
					<div class="lastmodified">
						<small>
							<strong>
								<umb-localize key="umbhostCloudflarePurge_lastmodified"></umb-localize>:
							</strong>
							${this.browserCacheTtlUpdated ? this.browserCacheTtlUpdated : o}
						</small>
					</div>
				`}
			</uui-box>


			<uui-box headline=${this.localize.term("umbhostCloudflarePurge_alwaysonlinetitle")}>
				${this.alwaysOnlineLoading ? r`<uui-loader></uui-loader>` : o}
				${this.alwaysOnlineLoading ? o : r`
				<div class="description">
					<umb-localize key="umbhostCloudflarePurge_alwaysonlinedescription"></umb-localize>
				</div>
				<div class="description">
					<umb-localize key="umbhostCloudflarePurge_alwaysonlineterms"></umb-localize>
				</div>
				<umb-input-toggle @change=${g(this, h, y)} ?checked=${this.alwaysOnlineValue}  showLabels labelOn=${this.localize.term("umbhostCloudflarePurge_alwaysonlinetoggleon")} labelOff=${this.localize.term("umbhostCloudflarePurge_alwaysonlinetoggleoff")}></umb-input-toggle>
				<div class="lastmodified">
					<small>
						<strong>
							<umb-localize key="umbhostCloudflarePurge_lastmodified"></umb-localize>:
						</strong>
						${this.alwaysOnlineUpdated ? this.alwaysOnlineUpdated : o}
					</small>
				</div>
				`}
			</uui-box>`}
		`}
		</section>
    `;
  }
};
n = /* @__PURE__ */ new WeakMap();
h = /* @__PURE__ */ new WeakSet();
C = async function(l) {
  var u, d;
  const e = l.target, i = (u = this.browserCacheTtlOptions) == null ? void 0 : u.find((c) => c.value === Number(e.value));
  i && (await ((d = p(this, n)) == null ? void 0 : d.toggleBrowserCacheTtl(i.value)), this.dispatchEvent(new b()));
};
y = async function(l) {
  var e;
  await ((e = p(this, n)) == null ? void 0 : e.toggleAlwaysOnline(l.target.checked)), this.dispatchEvent(new b());
};
_ = async function(l) {
  var e;
  await ((e = p(this, n)) == null ? void 0 : e.toggleDevelopmentMode(l.target.checked)), this.dispatchEvent(new b());
};
z = async function(l) {
  var e;
  await ((e = p(this, n)) == null ? void 0 : e.toggleCachingLevel(l.target.value)), this.dispatchEvent(new b());
};
L = function(l) {
  var i;
  const e = l.target;
  (i = p(this, n)) == null || i.selectZone(e.value);
};
t.styles = $`

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

			#umbhost-cloudflare-purge-caching {
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
  O("umbhost-cloudflare-purge-settings-caching")
], t);
export {
  t as default
};
//# sourceMappingURL=caching.element-RxjtIuSY.js.map
