import { nothing as n, html as c, css as k, state as r, customElement as V } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as D } from "@umbraco-cms/backoffice/lit-element";
import { UmbChangeEvent as f } from "@umbraco-cms/backoffice/event";
import { U as S } from "./purge.repository-Dhvy131L.js";
var I = Object.defineProperty, E = Object.getOwnPropertyDescriptor, L = (e) => {
  throw TypeError(e);
}, i = (e, t, o, a) => {
  for (var s = a > 1 ? void 0 : a ? E(t, o) : t, u = e.length - 1, g; u >= 0; u--)
    (g = e[u]) && (s = (a ? g(t, o, s) : g(s)) || s);
  return a && s && I(t, o, s), s;
}, z = (e, t, o) => t.has(e) || L("Cannot " + o), m = (e, t, o) => (z(e, t, "read from private field"), o ? o.call(e) : t.get(e)), _ = (e, t, o) => t.has(e) ? L("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, o), v = (e, t, o) => (z(e, t, "access private method"), o), h, p, O, $, P, T, U;
let l = class extends D {
  constructor() {
    super(...arguments), _(this, p), _(this, h, new S(this)), this.firstLoad = !0, this.loading = !1, this.zones = [], this.zoneId = void 0, this.browserCacheTtlLoading = !1, this.alwaysOnlineLoading = !1, this.developerModeLoading = !1, this.cachingLevelLoading = !1, this.cachingLevelOptions = [
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
      const t = this.browserCacheTtlValue;
      this.browserCacheTtlOptions = this.browserCacheTtlOptions.map((o) => ({
        ...o,
        selected: o.value === t
      }));
    }
  }
  connectedCallback() {
    super.connectedCallback(), this.loadData();
  }
  async loadData() {
    const { data: e } = await m(this, h).getZones();
    this.zones = e == null ? void 0 : e.map((t) => ({
      name: t.domain,
      value: t.zoneId
    }));
  }
  render() {
    return c`
		<section id="umbhost-cloudflare-purdge-caching">
			<uui-box class="introduction" headline=${this.localize.term("umbhostCloudflarePurge_cachingtitle")}>
				<p><umb-localize key="umbhostCloudflarePurge_cachingintroduction"></umb-localize></p>

					<uui-label for="zone">${this.localize.term("umbhostCloudflarePurge_selectdomain")}: </uui-label>
					<uui-select id="zone"
					required=""
						label=${this.localize.term("umbhostCloudflarePurge_selectdomain")}
						placeholder=${this.localize.term("umbhostCloudflarePurge_selectanoption")}
						.options=${this.zones ?? []}
						@change=${v(this, p, U)}
						>
					</uui-select>
			</uui-box>

		${this.firstLoad ? n : c`
			${this.loading ? c`<uui-loader-circle></uui-loader-circle>` : n}

			${this.loading ? n : c`
			<uui-box headline=${this.localize.term("umbhostCloudflarePurge_developermodetitle")}>
				${this.developerModeLoading ? c`<uui-loader></uui-loader>` : n}
				${this.developerModeLoading ? n : c`
				<div class="description">
					<umb-localize key="umbhostCloudflarePurge_developermodedescription"></umb-localize>
					<p class="alert alert-warning">
						<umb-localize key="umbhostCloudflarePurge_developermodewarning"></umb-localize>
					</p>
				</div>
				<umb-input-toggle showLabels @change=${v(this, p, P)} ?checked=${this.developerModeValue} labelOn=${this.localize.term("umbhostCloudflarePurge_developermodetoggleon")} labelOff=${this.localize.term("umbhostCloudflarePurge_developermodetoggleoff")}></umb-input-toggle>
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
				${this.cachingLevelLoading ? c`<uui-loader></uui-loader>` : n}
				${this.cachingLevelLoading ? n : c`
				<div class="description">
					<umb-localize key="umbhostCloudflarePurge_cachingleveldescription"></umb-localize>
				</div>
				<umb-input-radio-button-list .list=${this.cachingLevelOptions} .value=${this.cachingLevelValue ?? ""} @change=${v(this, p, T)} ></umb-input-radio-button-list>
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
				${this.browserCacheTtlLoading ? c`<uui-loader></uui-loader>` : n}
				${this.browserCacheTtlLoading ? n : c`
					<div class="description">
						<umb-localize key="umbhostCloudflarePurge_browsercachettldescription"></umb-localize>
					</div>
					<uui-select id="browserCacheTtl"
						label=${this.localize.term("umbhostCloudflarePurge_browsercachettltitle")}
						placeholder=${this.localize.term("umbhostCloudflarePurge_selectanoption")}
						.options=${this.browserCacheTtlOptions ?? []}
						@change=${v(this, p, O)} >
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
				${this.alwaysOnlineLoading ? c`<uui-loader></uui-loader>` : n}
				${this.alwaysOnlineLoading ? n : c`
				<div class="description">
					<umb-localize key="umbhostCloudflarePurge_alwaysonlinedescription"></umb-localize>
				</div>
				<div class="description">
					<umb-localize key="umbhostCloudflarePurge_alwaysonlineterms"></umb-localize>
				</div>
				<umb-input-toggle @change=${v(this, p, $)} ?checked=${this.alwaysOnlineValue}  showLabels labelOn=${this.localize.term("umbhostCloudflarePurge_alwaysonlinetoggleon")} labelOff=${this.localize.term("umbhostCloudflarePurge_alwaysonlinetoggleoff")}></umb-input-toggle>
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
h = /* @__PURE__ */ new WeakMap();
p = /* @__PURE__ */ new WeakSet();
O = async function(e) {
  var s;
  const t = e.target, o = (s = this.browserCacheTtlOptions) == null ? void 0 : s.find((u) => u.value === Number(t.value));
  if (!o) return;
  this.browserCacheTtlLoading = !0;
  const a = {
    zoneId: this.zoneId,
    requestBody: {
      value: o.value
    }
  };
  try {
    const { data: u, error: g } = await m(this, h).toggleBrowserCacheTtl(a);
    !g && u && (this.browserCacheTtlValue = Number(u.value), this.browserCacheTtlUpdated = u.modified_on ? new Date(u.modified_on).toLocaleString() : void 0);
  } finally {
    this.browserCacheTtlLoading = !1, this.dispatchEvent(new f());
  }
};
$ = async function(e) {
  this.alwaysOnlineLoading = !0;
  const t = e.target.checked, o = {
    zoneId: this.zoneId,
    requestBody: {
      value: t ? "on" : "off"
    }
  };
  try {
    const { data: a, error: s } = await m(this, h).toggleAlwaysOnline(o);
    !s && a && (this.alwaysOnlineValue = a.value.toLowerCase() === "on", this.alwaysOnlineUpdated = a.modified_on ? new Date(a.modified_on).toLocaleString() : void 0);
  } finally {
    this.alwaysOnlineLoading = !1, this.dispatchEvent(new f());
  }
};
P = async function(e) {
  this.developerModeLoading = !0;
  const t = e.target.checked, o = {
    zoneId: this.zoneId,
    requestBody: {
      value: t ? "on" : "off"
    }
  };
  try {
    const { data: a, error: s } = await m(this, h).toggleDevelopmentMode(o);
    !s && a && (this.developerModeValue = a.value.toLowerCase() === "on", this.developerModeUpdated = a.modified_on ? new Date(a.modified_on).toLocaleString() : void 0);
  } finally {
    this.developerModeLoading = !1, this.dispatchEvent(new f());
  }
};
T = async function(e) {
  this.cachingLevelLoading = !0;
  const t = {
    zoneId: this.zoneId,
    requestBody: {
      value: e.target.value
    }
  };
  try {
    const { data: o, error: a } = await m(this, h).toggleCachingLevel(t);
    !a && o && (this.cachingLevelValue = o.value.toLowerCase(), this.cachingLevelUpdated = o.modified_on ? new Date(o.modified_on).toLocaleString() : void 0);
  } finally {
    this.cachingLevelLoading = !1, this.dispatchEvent(new f());
  }
};
U = async function(e) {
  var o, a, s, u, g, b, w, y;
  const t = e.target;
  if (t.value) {
    this.firstLoad = !1, this.loading = !0, this.zoneId = t.value;
    try {
      const M = {
        zoneId: t.value
      }, [C, x] = await Promise.all([
        m(this, h).getBrowserTtlOptions(),
        m(this, h).getCacheSettings(M)
      ]);
      C.data && (this.browserCacheTtlOptions = C.data);
      const d = x.data;
      d && (this.browserCacheTtlValue = ((o = d.browserCacheTtl) == null ? void 0 : o.value) !== void 0 ? Number(d.browserCacheTtl.value) : void 0, this.browserCacheTtlUpdated = (a = d.browserCacheTtl) != null && a.modified_on ? new Date(d.browserCacheTtl.modified_on).toLocaleString() : void 0, this.alwaysOnlineValue = ((s = d.alwaysOnline) == null ? void 0 : s.value.toLowerCase()) === "on", this.alwaysOnlineUpdated = (u = d.alwaysOnline) != null && u.modified_on ? new Date(d.alwaysOnline.modified_on).toLocaleString() : void 0, this.developerModeValue = ((g = d.developmentMode) == null ? void 0 : g.value.toLowerCase()) === "on", this.developerModeUpdated = (b = d.developmentMode) != null && b.modified_on ? new Date(d.developmentMode.modified_on).toLocaleString() : void 0, this.cachingLevelUpdated = (w = d.cacheLevel) != null && w.modified_on ? new Date(d.cacheLevel.modified_on).toLocaleString() : void 0, this.cachingLevelValue = (y = d.cacheLevel) == null ? void 0 : y.value.toLowerCase());
    } finally {
      this.loading = !1;
    }
  }
};
l.styles = k`

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
i([
  r()
], l.prototype, "firstLoad", 2);
i([
  r()
], l.prototype, "loading", 2);
i([
  r()
], l.prototype, "zones", 2);
i([
  r()
], l.prototype, "zoneId", 2);
i([
  r()
], l.prototype, "browserCacheTtlLoading", 2);
i([
  r()
], l.prototype, "alwaysOnlineLoading", 2);
i([
  r()
], l.prototype, "developerModeLoading", 2);
i([
  r()
], l.prototype, "cachingLevelLoading", 2);
i([
  r()
], l.prototype, "browserCacheTtlOptions", 2);
i([
  r()
], l.prototype, "browserCacheTtlValue", 2);
i([
  r()
], l.prototype, "browserCacheTtlUpdated", 2);
i([
  r()
], l.prototype, "alwaysOnlineUpdated", 2);
i([
  r()
], l.prototype, "alwaysOnlineValue", 2);
i([
  r()
], l.prototype, "developerModeUpdated", 2);
i([
  r()
], l.prototype, "developerModeValue", 2);
i([
  r()
], l.prototype, "cachingLevelUpdated", 2);
i([
  r()
], l.prototype, "cachingLevelValue", 2);
l = i([
  V("umbhost-cloudflare-purge-settings-caching")
], l);
export {
  l as default
};
//# sourceMappingURL=caching-DqKoOVIt.js.map
