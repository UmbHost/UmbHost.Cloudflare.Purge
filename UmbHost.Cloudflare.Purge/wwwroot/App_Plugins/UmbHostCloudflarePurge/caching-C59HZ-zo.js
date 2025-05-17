import { LitElement as B, nothing as u, html as p, css as D, state as h, customElement as k } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as A } from "@umbraco-cms/backoffice/element-api";
import { O as m } from "./entry-Db9g9TCR.js";
import { UmbChangeEvent as T } from "@umbraco-cms/backoffice/event";
class R extends Error {
  constructor(e, o, r) {
    super(r), this.name = "ApiError", this.url = o.url, this.status = o.status, this.statusText = o.statusText, this.body = o.body, this.request = e;
  }
}
class M extends Error {
  constructor(e) {
    super(e), this.name = "CancelError";
  }
  get isCancelled() {
    return !0;
  }
}
class H {
  constructor(e) {
    this._isResolved = !1, this._isRejected = !1, this._isCancelled = !1, this.cancelHandlers = [], this.promise = new Promise((o, r) => {
      this._resolve = o, this._reject = r;
      const a = (l) => {
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
      }), e(a, i, s);
    });
  }
  get [Symbol.toStringTag]() {
    return "Cancellable Promise";
  }
  then(e, o) {
    return this.promise.then(e, o);
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
      this.cancelHandlers.length = 0, this._reject && this._reject(new M("Request aborted"));
    }
  }
  get isCancelled() {
    return this._isCancelled;
  }
}
const v = (t) => typeof t == "string", _ = (t) => v(t) && t !== "", L = (t) => t instanceof Blob, P = (t) => t instanceof FormData, N = (t) => {
  try {
    return btoa(t);
  } catch {
    return Buffer.from(t).toString("base64");
  }
}, V = (t) => {
  const e = [], o = (a, i) => {
    e.push(`${encodeURIComponent(a)}=${encodeURIComponent(String(i))}`);
  }, r = (a, i) => {
    i != null && (i instanceof Date ? o(a, i.toISOString()) : Array.isArray(i) ? i.forEach((s) => r(a, s)) : typeof i == "object" ? Object.entries(i).forEach(([s, l]) => r(`${a}[${s}]`, l)) : o(a, i));
  };
  return Object.entries(t).forEach(([a, i]) => r(a, i)), e.length ? `?${e.join("&")}` : "";
}, I = (t, e) => {
  const o = encodeURI, r = e.url.replace("{api-version}", t.VERSION).replace(/{(.*?)}/g, (i, s) => {
    var l;
    return (l = e.path) != null && l.hasOwnProperty(s) ? o(String(e.path[s])) : i;
  }), a = t.BASE + r;
  return e.query ? a + V(e.query) : a;
}, F = (t) => {
  if (t.formData) {
    const e = new FormData(), o = (r, a) => {
      v(a) || L(a) ? e.append(r, a) : e.append(r, JSON.stringify(a));
    };
    return Object.entries(t.formData).filter(([, r]) => r != null).forEach(([r, a]) => {
      Array.isArray(a) ? a.forEach((i) => o(r, i)) : o(r, a);
    }), e;
  }
}, w = async (t, e) => typeof e == "function" ? e(t) : e, G = async (t, e) => {
  const [o, r, a, i] = await Promise.all([
    w(e, t.TOKEN),
    w(e, t.USERNAME),
    w(e, t.PASSWORD),
    w(e, t.HEADERS)
  ]), s = Object.entries({
    Accept: "application/json",
    ...i,
    ...e.headers
  }).filter(([, l]) => l != null).reduce((l, [g, n]) => ({
    ...l,
    [g]: String(n)
  }), {});
  if (_(o) && (s.Authorization = `Bearer ${o}`), _(r) && _(a)) {
    const l = N(`${r}:${a}`);
    s.Authorization = `Basic ${l}`;
  }
  return e.body !== void 0 && (e.mediaType ? s["Content-Type"] = e.mediaType : L(e.body) ? s["Content-Type"] = e.body.type || "application/octet-stream" : v(e.body) ? s["Content-Type"] = "text/plain" : P(e.body) || (s["Content-Type"] = "application/json")), new Headers(s);
}, W = (t) => {
  var e, o;
  if (t.body !== void 0)
    return (e = t.mediaType) != null && e.includes("application/json") || (o = t.mediaType) != null && o.includes("+json") ? JSON.stringify(t.body) : v(t.body) || L(t.body) || P(t.body) ? t.body : JSON.stringify(t.body);
}, J = async (t, e, o, r, a, i, s) => {
  const l = new AbortController();
  let g = {
    headers: i,
    body: r ?? a,
    method: e.method,
    signal: l.signal
  };
  t.WITH_CREDENTIALS && (g.credentials = t.CREDENTIALS);
  for (const n of t.interceptors.request._fns)
    g = await n(g);
  return s(() => l.abort()), await fetch(o, g);
}, K = (t, e) => {
  if (e) {
    const o = t.headers.get(e);
    if (v(o))
      return o;
  }
}, Q = async (t) => {
  if (t.status !== 204)
    try {
      const e = t.headers.get("Content-Type");
      if (e) {
        const o = ["application/octet-stream", "application/pdf", "application/zip", "audio/", "image/", "video/"];
        if (e.includes("application/json") || e.includes("+json"))
          return await t.json();
        if (o.some((r) => e.includes(r)))
          return await t.blob();
        if (e.includes("multipart/form-data"))
          return await t.formData();
        if (e.includes("text/"))
          return await t.text();
      }
    } catch (e) {
      console.error(e);
    }
}, X = (t, e) => {
  const r = {
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
  if (r)
    throw new R(t, e, r);
  if (!e.ok) {
    const a = e.status ?? "unknown", i = e.statusText ?? "unknown", s = (() => {
      try {
        return JSON.stringify(e.body, null, 2);
      } catch {
        return;
      }
    })();
    throw new R(
      t,
      e,
      `Generic Error: status: ${a}; status text: ${i}; body: ${s}`
    );
  }
}, f = (t, e) => new H(async (o, r, a) => {
  try {
    const i = I(t, e), s = F(e), l = W(e), g = await G(t, e);
    if (!a.isCancelled) {
      let n = await J(t, e, i, l, s, g, a);
      for (const x of t.interceptors.response._fns)
        n = await x(n);
      const U = await Q(n), j = K(n, e.responseHeader), O = {
        url: i,
        ok: n.ok,
        status: n.status,
        statusText: n.statusText,
        body: j ?? U
      };
      X(e, O), o(O.body);
    }
  } catch (i) {
    r(i);
  }
});
class y {
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static browserTtlOptions() {
    return f(m, {
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
    return f(m, {
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
    return f(m, {
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
    return f(m, {
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
    return f(m, {
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
    return f(m, {
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
    return f(m, {
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
    return f(m, {
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
    return f(m, {
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
    return f(m, {
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
var Y = Object.defineProperty, Z = Object.getOwnPropertyDescriptor, q = (t) => {
  throw TypeError(t);
}, d = (t, e, o, r) => {
  for (var a = r > 1 ? void 0 : r ? Z(e, o) : e, i = t.length - 1, s; i >= 0; i--)
    (s = t[i]) && (a = (r ? s(e, o, a) : s(a)) || a);
  return r && a && Y(e, o, a), a;
}, ee = (t, e, o) => e.has(t) || q("Cannot " + o), te = (t, e, o) => e.has(t) ? q("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, o), C = (t, e, o) => (ee(t, e, "access private method"), o), b, S, z, $, E;
let c = class extends A(B) {
  constructor() {
    super(...arguments), te(this, b), this.loading = !0, this.browserCacheTtlLoading = !1, this.alwaysOnlineLoading = !1, this.developerModeLoading = !1, this.cachingLevelLoading = !1, this.cachingLevelOptions = [
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
  updated(t) {
    if (super.updated(t), t.has("browserCacheTtlValue") && this.browserCacheTtlOptions) {
      const e = this.browserCacheTtlValue;
      this.browserCacheTtlOptions = this.browserCacheTtlOptions.map((o) => ({
        ...o,
        selected: o.value === e
      }));
    }
  }
  connectedCallback() {
    super.connectedCallback(), this.loadData();
  }
  async loadData() {
    var t, e, o, r, a, i, s, l;
    this.loading = !0;
    try {
      const [g, n] = await Promise.all([
        y.browserTtlOptions(),
        y.getCacheSettings()
      ]);
      this.browserCacheTtlOptions = g, this.browserCacheTtlValue = ((t = n.browserCacheTtl) == null ? void 0 : t.value) !== void 0 ? Number(n.browserCacheTtl.value) : void 0, this.browserCacheTtlUpdated = (e = n.browserCacheTtl) != null && e.modified_on ? new Date(n.browserCacheTtl.modified_on).toLocaleString() : void 0, this.alwaysOnlineValue = ((o = n.alwaysOnline) == null ? void 0 : o.value.toLowerCase()) === "on", this.alwaysOnlineUpdated = (r = n.alwaysOnline) != null && r.modified_on ? new Date(n.alwaysOnline.modified_on).toLocaleString() : void 0, this.developerModeValue = ((a = n.developmentMode) == null ? void 0 : a.value.toLowerCase()) === "on", this.developerModeUpdated = (i = n.developmentMode) != null && i.modified_on ? new Date(n.developmentMode.modified_on).toLocaleString() : void 0, this.cachingLevelUpdated = (s = n.cacheLevel) != null && s.modified_on ? new Date(n.cacheLevel.modified_on).toLocaleString() : void 0, this.cachingLevelValue = (l = n.cacheLevel) == null ? void 0 : l.value.toLowerCase();
    } finally {
      this.loading = !1;
    }
  }
  render() {
    return p`
		<section id="umbhost-cloudflare-purdge-caching">
			<uui-box class="introduction" headline=${this.localize.term("umbhostCloudflarePurge_cachingtitle")}>
				<umb-localize key="umbhostCloudflarePurge_cachingintroduction"></umb-localize>
			</uui-box>  

			${this.loading ? p`<uui-loader-circle></uui-loader-circle>` : u}

			${this.loading ? u : p`
			<uui-box headline=${this.localize.term("umbhostCloudflarePurge_developermodetitle")}>
				${this.developerModeLoading ? p`<uui-loader></uui-loader>` : u}
				${this.developerModeLoading ? u : p`
				<div class="description">
					<umb-localize key="umbhostCloudflarePurge_developermodedescription"></umb-localize>
					<p class="alert alert-warning">
						<umb-localize key="umbhostCloudflarePurge_developermodewarning"></umb-localize>
					</p>
				</div>
				<umb-input-toggle showLabels @change=${C(this, b, $)} ?checked=${this.developerModeValue} labelOn=${this.localize.term("umbhostCloudflarePurge_developermodetoggleon")} labelOff=${this.localize.term("umbhostCloudflarePurge_developermodetoggleoff")}></umb-input-toggle>
				<div class="lastmodified">
					<small>
						<strong>
							<umb-localize key="umbhostCloudflarePurge_lastmodified"></umb-localize>:
						</strong> 
						${this.developerModeUpdated ? this.developerModeUpdated : u}
					</small>
				</div>
				`}
			</uui-box>  

			<uui-box headline=${this.localize.term("umbhostCloudflarePurge_cachingleveltitle")}>
				${this.cachingLevelLoading ? p`<uui-loader></uui-loader>` : u}
				${this.cachingLevelLoading ? u : p`
				<div class="description">
					<umb-localize key="umbhostCloudflarePurge_cachingleveldescription"></umb-localize>
				</div>
				<umb-input-radio-button-list .list=${this.cachingLevelOptions} .value=${this.cachingLevelValue ?? ""} @change=${C(this, b, E)} ></umb-input-radio-button-list>
				<div class="lastmodified">
					<small>
						<strong>
							<umb-localize key="umbhostCloudflarePurge_lastmodified"></umb-localize>:
						</strong> 
						${this.cachingLevelUpdated ? this.cachingLevelUpdated : u}
					</small>
				</div>
				`}
			</uui-box> 

			<uui-box headline=${this.localize.term("umbhostCloudflarePurge_browsercachettltitle")}>
				${this.browserCacheTtlLoading ? p`<uui-loader></uui-loader>` : u}
				${this.browserCacheTtlLoading ? u : p`
					<div class="description">
						<umb-localize key="umbhostCloudflarePurge_browsercachettldescription"></umb-localize>
					</div>
					<uui-select id="browserCacheTtl" 
						placeholder="Select an option" 
						.options=${this.browserCacheTtlOptions ?? []}
						@change=${C(this, b, S)} >
					</uui-select>
					<div class="lastmodified">
						<small>
							<strong>
								<umb-localize key="umbhostCloudflarePurge_lastmodified"></umb-localize>:
							</strong> 
							${this.browserCacheTtlUpdated ? this.browserCacheTtlUpdated : u}
						</small>
					</div>
				`}
			</uui-box>  

			
			<uui-box headline=${this.localize.term("umbhostCloudflarePurge_alwaysonlinetitle")}>
				${this.alwaysOnlineLoading ? p`<uui-loader></uui-loader>` : u}
				${this.alwaysOnlineLoading ? u : p`
				<div class="description">
					<umb-localize key="umbhostCloudflarePurge_alwaysonlinedescription"></umb-localize>
				</div>
				<div class="description">
					<umb-localize key="umbhostCloudflarePurge_alwaysonlineterms"></umb-localize>
				</div>
				<umb-input-toggle @change=${C(this, b, z)} ?checked=${this.alwaysOnlineValue}  showLabels labelOn=${this.localize.term("umbhostCloudflarePurge_alwaysonlinetoggleon")} labelOff=${this.localize.term("umbhostCloudflarePurge_alwaysonlinetoggleoff")}></umb-input-toggle>
				<div class="lastmodified">
					<small>
						<strong>
							<umb-localize key="umbhostCloudflarePurge_lastmodified"></umb-localize>:
						</strong> 
						${this.alwaysOnlineUpdated ? this.alwaysOnlineUpdated : u}
					</small>
				</div>
				`}
			</uui-box>`}
		</section>  
    `;
  }
};
b = /* @__PURE__ */ new WeakSet();
S = function(t) {
  var r;
  this.browserCacheTtlLoading = !0;
  const e = t.target, o = (r = this.browserCacheTtlOptions) == null ? void 0 : r.find((a) => a.value === Number(e.value));
  if (o) {
    const a = {
      requestBody: {
        value: o.value
      }
    };
    y.toggleBrowserCacheTtl(a).then((i) => {
      this.browserCacheTtlValue = Number(i.value), this.browserCacheTtlUpdated = i.modified_on ? new Date(i.modified_on).toLocaleString() : void 0;
    }).finally(() => {
      this.browserCacheTtlLoading = !1, this.dispatchEvent(new T());
    });
  }
};
z = function(t) {
  this.alwaysOnlineLoading = !0;
  const o = {
    requestBody: {
      value: t.target.checked ? "on" : "off"
    }
  };
  y.toggleAlwaysOnline(o).then((r) => {
    this.alwaysOnlineValue = r.value.toLowerCase() === "on", this.alwaysOnlineUpdated = r.modified_on ? new Date(r.modified_on).toLocaleString() : void 0;
  }).finally(() => {
    this.alwaysOnlineLoading = !1, this.dispatchEvent(new T());
  });
};
$ = function(t) {
  this.developerModeLoading = !0;
  const o = {
    requestBody: {
      value: t.target.checked ? "on" : "off"
    }
  };
  y.toggleDevelopmentMode(o).then((r) => {
    this.developerModeValue = r.value.toLowerCase() === "on", this.developerModeUpdated = r.modified_on ? new Date(r.modified_on).toLocaleString() : void 0;
  }).finally(() => {
    this.developerModeLoading = !1, this.dispatchEvent(new T());
  });
};
E = function(t) {
  this.cachingLevelLoading = !0;
  const e = {
    requestBody: {
      value: t.target.value
    }
  };
  y.toggleCachingLevel(e).then((o) => {
    this.cachingLevelValue = o == null ? void 0 : o.value.toLowerCase(), this.cachingLevelUpdated = o.modified_on ? new Date(o.modified_on).toLocaleString() : void 0;
  }).finally(() => {
    this.cachingLevelLoading = !1, this.dispatchEvent(new T());
  });
};
c.styles = D`

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
d([
  h()
], c.prototype, "loading", 2);
d([
  h()
], c.prototype, "browserCacheTtlLoading", 2);
d([
  h()
], c.prototype, "alwaysOnlineLoading", 2);
d([
  h()
], c.prototype, "developerModeLoading", 2);
d([
  h()
], c.prototype, "cachingLevelLoading", 2);
d([
  h()
], c.prototype, "browserCacheTtlOptions", 2);
d([
  h()
], c.prototype, "browserCacheTtlValue", 2);
d([
  h()
], c.prototype, "browserCacheTtlUpdated", 2);
d([
  h()
], c.prototype, "alwaysOnlineUpdated", 2);
d([
  h()
], c.prototype, "alwaysOnlineValue", 2);
d([
  h()
], c.prototype, "developerModeUpdated", 2);
d([
  h()
], c.prototype, "developerModeValue", 2);
d([
  h()
], c.prototype, "cachingLevelUpdated", 2);
d([
  h()
], c.prototype, "cachingLevelValue", 2);
c = d([
  k("umbhost-cloudflare-purge-settings-caching")
], c);
export {
  c as default
};
//# sourceMappingURL=caching-C59HZ-zo.js.map
