import { LitElement as x, nothing as m, html as g, css as E, state as p, customElement as $ } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as B } from "@umbraco-cms/backoffice/element-api";
import { O as u } from "./entry-DVoinJLZ.js";
class P extends Error {
  constructor(e, r, a) {
    super(a), this.name = "ApiError", this.url = r.url, this.status = r.status, this.statusText = r.statusText, this.body = r.body, this.request = e;
  }
}
class L extends Error {
  constructor(e) {
    super(e), this.name = "CancelError";
  }
  get isCancelled() {
    return !0;
  }
}
class A {
  constructor(e) {
    this._isResolved = !1, this._isRejected = !1, this._isCancelled = !1, this.cancelHandlers = [], this.promise = new Promise((r, a) => {
      this._resolve = r, this._reject = a;
      const o = (l) => {
        this._isResolved || this._isRejected || this._isCancelled || (this._isResolved = !0, this._resolve && this._resolve(l));
      }, i = (l) => {
        this._isResolved || this._isRejected || this._isCancelled || (this._isRejected = !0, this._reject && this._reject(l));
      }, s = (l) => {
        this._isResolved || this._isRejected || this._isCancelled || this.cancelHandlers.push(l);
      };
      return Object.defineProperty(s, "isResolved", {
        get: () => this._isResolved
      }), Object.defineProperty(s, "isRejected", {
        get: () => this._isRejected
      }), Object.defineProperty(s, "isCancelled", {
        get: () => this._isCancelled
      }), e(o, i, s);
    });
  }
  get [Symbol.toStringTag]() {
    return "Cancellable Promise";
  }
  then(e, r) {
    return this.promise.then(e, r);
  }
  catch(e) {
    return this.promise.catch(e);
  }
  finally(e) {
    return this.promise.finally(e);
  }
  cancel() {
    if (!(this._isResolved || this._isRejected || this._isCancelled)) {
      if (this._isCancelled = !0, this.cancelHandlers.length)
        try {
          for (const e of this.cancelHandlers)
            e();
        } catch (e) {
          console.warn("Cancellation threw an error", e);
          return;
        }
      this.cancelHandlers.length = 0, this._reject && this._reject(new L("Request aborted"));
    }
  }
  get isCancelled() {
    return this._isCancelled;
  }
}
const f = (t) => typeof t == "string", w = (t) => f(t) && t !== "", S = (t) => t instanceof Blob, q = (t) => t instanceof FormData, k = (t) => {
  try {
    return btoa(t);
  } catch {
    return Buffer.from(t).toString("base64");
  }
}, D = (t) => {
  const e = [], r = (o, i) => {
    e.push(`${encodeURIComponent(o)}=${encodeURIComponent(String(i))}`);
  }, a = (o, i) => {
    i != null && (i instanceof Date ? r(o, i.toISOString()) : Array.isArray(i) ? i.forEach((s) => a(o, s)) : typeof i == "object" ? Object.entries(i).forEach(([s, l]) => a(`${o}[${s}]`, l)) : r(o, i));
  };
  return Object.entries(t).forEach(([o, i]) => a(o, i)), e.length ? `?${e.join("&")}` : "";
}, H = (t, e) => {
  const r = encodeURI, a = e.url.replace("{api-version}", t.VERSION).replace(/{(.*?)}/g, (i, s) => {
    var l;
    return (l = e.path) != null && l.hasOwnProperty(s) ? r(String(e.path[s])) : i;
  }), o = t.BASE + a;
  return e.query ? o + D(e.query) : o;
}, N = (t) => {
  if (t.formData) {
    const e = new FormData(), r = (a, o) => {
      f(o) || S(o) ? e.append(a, o) : e.append(a, JSON.stringify(o));
    };
    return Object.entries(t.formData).filter(([, a]) => a != null).forEach(([a, o]) => {
      Array.isArray(o) ? o.forEach((i) => r(a, i)) : r(a, o);
    }), e;
  }
}, C = async (t, e) => typeof e == "function" ? e(t) : e, U = async (t, e) => {
  const [r, a, o, i] = await Promise.all([
    C(e, t.TOKEN),
    C(e, t.USERNAME),
    C(e, t.PASSWORD),
    C(e, t.HEADERS)
  ]), s = Object.entries({
    Accept: "application/json",
    ...i,
    ...e.headers
  }).filter(([, l]) => l != null).reduce((l, [c, n]) => ({
    ...l,
    [c]: String(n)
  }), {});
  if (w(r) && (s.Authorization = `Bearer ${r}`), w(a) && w(o)) {
    const l = k(`${a}:${o}`);
    s.Authorization = `Basic ${l}`;
  }
  return e.body !== void 0 && (e.mediaType ? s["Content-Type"] = e.mediaType : S(e.body) ? s["Content-Type"] = e.body.type || "application/octet-stream" : f(e.body) ? s["Content-Type"] = "text/plain" : q(e.body) || (s["Content-Type"] = "application/json")), new Headers(s);
}, I = (t) => {
  var e, r;
  if (t.body !== void 0)
    return (e = t.mediaType) != null && e.includes("application/json") || (r = t.mediaType) != null && r.includes("+json") ? JSON.stringify(t.body) : f(t.body) || S(t.body) || q(t.body) ? t.body : JSON.stringify(t.body);
}, F = async (t, e, r, a, o, i, s) => {
  const l = new AbortController();
  let c = {
    headers: i,
    body: a ?? o,
    method: e.method,
    signal: l.signal
  };
  t.WITH_CREDENTIALS && (c.credentials = t.CREDENTIALS);
  for (const n of t.interceptors.request._fns)
    c = await n(c);
  return s(() => l.abort()), await fetch(r, c);
}, V = (t, e) => {
  if (e) {
    const r = t.headers.get(e);
    if (f(r))
      return r;
  }
}, M = async (t) => {
  if (t.status !== 204)
    try {
      const e = t.headers.get("Content-Type");
      if (e) {
        const r = ["application/octet-stream", "application/pdf", "application/zip", "audio/", "image/", "video/"];
        if (e.includes("application/json") || e.includes("+json"))
          return await t.json();
        if (r.some((a) => e.includes(a)))
          return await t.blob();
        if (e.includes("multipart/form-data"))
          return await t.formData();
        if (e.includes("text/"))
          return await t.text();
      }
    } catch (e) {
      console.error(e);
    }
}, G = (t, e) => {
  const a = {
    400: "Bad Request",
    401: "Unauthorized",
    402: "Payment Required",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    406: "Not Acceptable",
    407: "Proxy Authentication Required",
    408: "Request Timeout",
    409: "Conflict",
    410: "Gone",
    411: "Length Required",
    412: "Precondition Failed",
    413: "Payload Too Large",
    414: "URI Too Long",
    415: "Unsupported Media Type",
    416: "Range Not Satisfiable",
    417: "Expectation Failed",
    418: "Im a teapot",
    421: "Misdirected Request",
    422: "Unprocessable Content",
    423: "Locked",
    424: "Failed Dependency",
    425: "Too Early",
    426: "Upgrade Required",
    428: "Precondition Required",
    429: "Too Many Requests",
    431: "Request Header Fields Too Large",
    451: "Unavailable For Legal Reasons",
    500: "Internal Server Error",
    501: "Not Implemented",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout",
    505: "HTTP Version Not Supported",
    506: "Variant Also Negotiates",
    507: "Insufficient Storage",
    508: "Loop Detected",
    510: "Not Extended",
    511: "Network Authentication Required",
    ...t.errors
  }[e.status];
  if (a)
    throw new P(t, e, a);
  if (!e.ok) {
    const o = e.status ?? "unknown", i = e.statusText ?? "unknown", s = (() => {
      try {
        return JSON.stringify(e.body, null, 2);
      } catch {
        return;
      }
    })();
    throw new P(
      t,
      e,
      `Generic Error: status: ${o}; status text: ${i}; body: ${s}`
    );
  }
}, d = (t, e) => new A(async (r, a, o) => {
  try {
    const i = H(t, e), s = N(e), l = I(e), c = await U(t, e);
    if (!o.isCancelled) {
      let n = await F(t, e, i, l, s, c, o);
      for (const j of t.interceptors.response._fns)
        n = await j(n);
      const y = await M(n), v = V(n, e.responseHeader), R = {
        url: i,
        ok: n.ok,
        status: n.status,
        statusText: n.statusText,
        body: v ?? y
      };
      G(e, R), r(R.body);
    }
  } catch (i) {
    a(i);
  }
});
class T {
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static browserTtlOptions() {
    return d(u, {
      method: "GET",
      url: "/umbraco/umbhostcloudflarepurge/v1.0/cache-settings/browserttloptions",
      errors: {
        401: "The resource is protected and requires an authentication token"
      }
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getCacheSettings() {
    return d(u, {
      method: "GET",
      url: "/umbraco/umbhostcloudflarepurge/v1.0/cache-settings/getcachesettings",
      errors: {
        400: "Bad Request",
        401: "The resource is protected and requires an authentication token"
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.requestBody
   * @returns unknown OK
   * @throws ApiError
   */
  static toggleAlwaysOnline(e = {}) {
    return d(u, {
      method: "PATCH",
      url: "/umbraco/umbhostcloudflarepurge/v1.0/cache-settings/togglealwaysonline",
      body: e.requestBody,
      mediaType: "application/json",
      errors: {
        400: "Bad Request",
        401: "The resource is protected and requires an authentication token"
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.requestBody
   * @returns unknown OK
   * @throws ApiError
   */
  static toggleBrowserCacheTtl(e = {}) {
    return d(u, {
      method: "PATCH",
      url: "/umbraco/umbhostcloudflarepurge/v1.0/cache-settings/togglebrowsercachettl",
      body: e.requestBody,
      mediaType: "application/json",
      errors: {
        400: "Bad Request",
        401: "The resource is protected and requires an authentication token"
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.requestBody
   * @returns unknown OK
   * @throws ApiError
   */
  static toggleCachingLevel(e = {}) {
    return d(u, {
      method: "PATCH",
      url: "/umbraco/umbhostcloudflarepurge/v1.0/cache-settings/togglecachinglevel",
      body: e.requestBody,
      mediaType: "application/json",
      errors: {
        400: "Bad Request",
        401: "The resource is protected and requires an authentication token"
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.requestBody
   * @returns unknown OK
   * @throws ApiError
   */
  static toggleDevelopmentMode(e = {}) {
    return d(u, {
      method: "PATCH",
      url: "/umbraco/umbhostcloudflarepurge/v1.0/cache-settings/toggledevelopmentmode",
      body: e.requestBody,
      mediaType: "application/json",
      errors: {
        400: "Bad Request",
        401: "The resource is protected and requires an authentication token"
      }
    });
  }
  /**
   * @returns string Accepted
   * @throws ApiError
   */
  static all() {
    return d(u, {
      method: "POST",
      url: "/umbraco/umbhostcloudflarepurge/v1.0/purge/all",
      responseHeader: "Umb-Notifications",
      errors: {
        400: "Bad Request",
        401: "The resource is protected and requires an authentication token"
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.requestBody
   * @returns string Accepted
   * @throws ApiError
   */
  static custom(e = {}) {
    return d(u, {
      method: "POST",
      url: "/umbraco/umbhostcloudflarepurge/v1.0/purge/custom",
      body: e.requestBody,
      mediaType: "application/json",
      responseHeader: "Umb-Notifications",
      errors: {
        400: "Bad Request",
        401: "The resource is protected and requires an authentication token"
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.requestBody
   * @returns string Accepted
   * @throws ApiError
   */
  static mediaFolder(e = {}) {
    return d(u, {
      method: "POST",
      url: "/umbraco/umbhostcloudflarepurge/v1.0/purge/mediafolder",
      body: e.requestBody,
      mediaType: "application/json",
      responseHeader: "Umb-Notifications",
      errors: {
        400: "Bad Request",
        401: "The resource is protected and requires an authentication token"
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.requestBody
   * @returns string Accepted
   * @throws ApiError
   */
  static node(e = {}) {
    return d(u, {
      method: "POST",
      url: "/umbraco/umbhostcloudflarepurge/v1.0/purge/node",
      body: e.requestBody,
      mediaType: "application/json",
      responseHeader: "Umb-Notifications",
      errors: {
        400: "Bad Request",
        401: "The resource is protected and requires an authentication token"
      }
    });
  }
}
var W = Object.defineProperty, J = Object.getOwnPropertyDescriptor, O = (t) => {
  throw TypeError(t);
}, b = (t, e, r, a) => {
  for (var o = a > 1 ? void 0 : a ? J(e, r) : e, i = t.length - 1, s; i >= 0; i--)
    (s = t[i]) && (o = (a ? s(e, r, o) : s(o)) || o);
  return a && o && W(e, r, o), o;
}, K = (t, e, r) => e.has(t) || O("Cannot " + r), Q = (t, e, r) => e.has(t) ? O("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, r), X = (t, e, r) => (K(t, e, "access private method"), r), _, z;
let h = class extends B(x) {
  constructor() {
    super(...arguments), Q(this, _), this.loading = !0, this.browserCacheTtlLoading = !1, this.cachingLevelOptions = [
      {
        label: this.localize.term("umbhostCloudflarePurge_cachinglevelbasic"),
        value: "Basic"
      },
      {
        label: this.localize.term("umbhostCloudflarePurge_cachinglevelsimplified"),
        value: "Simplified"
      },
      {
        label: this.localize.term("umbhostCloudflarePurge_cachinglevelaggressive"),
        value: "Aggressive"
      }
    ];
  }
  updated(t) {
    if (super.updated(t), t.has("browserCacheTtlValue") && this.browserCacheTtlOptions) {
      const e = this.browserCacheTtlValue;
      this.browserCacheTtlOptions = this.browserCacheTtlOptions.map((r) => ({
        ...r,
        selected: r.value === e
      }));
    }
  }
  connectedCallback() {
    super.connectedCallback(), this.loadData();
  }
  async loadData() {
    var t, e;
    this.loading = !0;
    try {
      const [r, a] = await Promise.all([
        T.browserTtlOptions(),
        T.getCacheSettings()
      ]);
      this.browserCacheTtlOptions = r, this.browserCacheTtlValue = ((t = a.browserCacheTtl) == null ? void 0 : t.value) !== void 0 ? Number(a.browserCacheTtl.value) : void 0, this.browserCacheTtlUpdated = ((e = a.browserCacheTtl) == null ? void 0 : e.modified_on) ?? void 0, this.cacheSettings = a;
    } finally {
      this.loading = !1;
    }
  }
  render() {
    var t, e, r, a, o, i, s, l, c, n, y, v;
    return g`
		<section id="umbhost-cloudflare-purdge-caching">
			<uui-box class="introduction" headline=${this.localize.term("umbhostCloudflarePurge_cachingtitle")}>
				<umb-localize key="umbhostCloudflarePurge_cachingintroduction"></umb-localize>
			</uui-box>  

			${this.loading ? g`<uui-loader-circle></uui-loader-circle>` : m}

			${this.loading ? m : g`
			<uui-box headline=${this.localize.term("umbhostCloudflarePurge_developermodetitle")}>
				<div class="description">
					<umb-localize key="umbhostCloudflarePurge_developermodedescription"></umb-localize>
					<p class="alert alert-warning">
						<umb-localize key="umbhostCloudflarePurge_developermodewarning"></umb-localize>
					</p>
				</div>
				<umb-input-toggle showLabels ?checked=${((e = (t = this.cacheSettings) == null ? void 0 : t.developmentMode) == null ? void 0 : e.value.toLowerCase()) === "on"} labelOn=${this.localize.term("umbhostCloudflarePurge_developermodetoggleon")} labelOff=${this.localize.term("umbhostCloudflarePurge_developermodetoggleoff")}></umb-input-toggle>
				<div class="lastmodified">
					<small>
						<strong>
							<umb-localize key="umbhostCloudflarePurge_lastmodified"></umb-localize>:
						</strong> 
						${(a = (r = this.cacheSettings) == null ? void 0 : r.developmentMode) != null && a.modified_on ? new Date(this.cacheSettings.developmentMode.modified_on).toLocaleString() : m}
					</small>
				</div>
			</uui-box>  

			<uui-box headline=${this.localize.term("umbhostCloudflarePurge_cachingleveltitle")}>
				<div class="description">
					<umb-localize key="umbhostCloudflarePurge_cachingleveldescription"></umb-localize>
				</div>
				<umb-input-radio-button-list .list=${this.cachingLevelOptions} .value=${((i = (o = this.cacheSettings) == null ? void 0 : o.cacheLevel) == null ? void 0 : i.value) ?? ""}></umb-input-radio-button-list>
				<div class="lastmodified">
					<small>
						<strong>
							<umb-localize key="umbhostCloudflarePurge_lastmodified"></umb-localize>:
						</strong> 
						${(l = (s = this.cacheSettings) == null ? void 0 : s.cacheLevel) != null && l.modified_on ? new Date(this.cacheSettings.cacheLevel.modified_on).toLocaleString() : m}
					</small>
				</div>
			</uui-box> 

			<uui-box headline=${this.localize.term("umbhostCloudflarePurge_browsercachettltitle")}>
				${this.browserCacheTtlLoading ? g`<uui-loader></uui-loader>` : m}
				${this.browserCacheTtlLoading ? m : g`
					<div class="description">
						<umb-localize key="umbhostCloudflarePurge_browsercachettldescription"></umb-localize>
					</div>
					<uui-select id="browserCacheTtl" 
						placeholder="Select an option" 
						.options=${this.browserCacheTtlOptions ?? []}
						@change=${X(this, _, z)} >
					</uui-select>
					<div class="lastmodified">
						<small>
							<strong>
								<umb-localize key="umbhostCloudflarePurge_lastmodified"></umb-localize>:
							</strong> 
							${this.browserCacheTtlUpdated ? new Date(this.browserCacheTtlUpdated).toLocaleString() : m}
						</small>
					</div>
				`}
			</uui-box>  

			
			<uui-box headline=${this.localize.term("umbhostCloudflarePurge_alwaysonlinetitle")}>
				<div class="description">
					<umb-localize key="umbhostCloudflarePurge_alwaysonlinedescription"></umb-localize>
				</div>
				<div class="description">
					<umb-localize key="umbhostCloudflarePurge_alwaysonlineterms"></umb-localize>
				</div>
				<umb-input-toggle ?checked=${((n = (c = this.cacheSettings) == null ? void 0 : c.alwaysOnline) == null ? void 0 : n.value.toLowerCase()) === "on"}  showLabels labelOn=${this.localize.term("umbhostCloudflarePurge_alwaysonlinetoggleon")} labelOff=${this.localize.term("umbhostCloudflarePurge_alwaysonlinetoggleoff")}></umb-input-toggle>
				<div class="lastmodified">
					<small>
						<strong>
							<umb-localize key="umbhostCloudflarePurge_lastmodified"></umb-localize>:
						</strong> 
						${(v = (y = this.cacheSettings) == null ? void 0 : y.alwaysOnline) != null && v.modified_on ? new Date(this.cacheSettings.alwaysOnline.modified_on).toLocaleString() : m}
					</small>
				</div>
			</uui-box>`}
		</section>  
    `;
  }
};
_ = /* @__PURE__ */ new WeakSet();
z = function(t) {
  var a;
  this.browserCacheTtlLoading = !0;
  const e = t.target, r = (a = this.browserCacheTtlOptions) == null ? void 0 : a.find((o) => o.value === Number(e.value));
  if (r) {
    const o = {
      requestBody: {
        value: r.value
      }
    };
    T.toggleBrowserCacheTtl(o).then((i) => {
      this.browserCacheTtlValue = Number(i.value), this.browserCacheTtlUpdated = i.modified_on ?? void 0;
    }).finally(() => {
      this.browserCacheTtlLoading = !1;
    });
  }
};
h.styles = E`

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
b([
  p()
], h.prototype, "loading", 2);
b([
  p()
], h.prototype, "browserCacheTtlLoading", 2);
b([
  p()
], h.prototype, "cacheSettings", 2);
b([
  p()
], h.prototype, "browserCacheTtlOptions", 2);
b([
  p()
], h.prototype, "browserCacheTtlValue", 2);
b([
  p()
], h.prototype, "browserCacheTtlUpdated", 2);
h = b([
  $("umbhost-cloudflare-purge-settings-caching")
], h);
export {
  h as default
};
//# sourceMappingURL=caching-WZYhbn9g.js.map
