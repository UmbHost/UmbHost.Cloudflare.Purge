var j = (r) => {
  throw TypeError(r);
};
var C = (r, e, t) => e.has(r) || j("Cannot " + t);
var l = (r, e, t) => (C(r, e, "read from private field"), t ? t.call(r) : e.get(r)), R = (r, e, t) => e.has(r) ? j("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(r) : e.set(r, t), v = (r, e, t, o) => (C(r, e, "write to private field"), o ? o.call(r, t) : e.set(r, t), t), d = (r, e, t) => (C(r, e, "access private method"), t);
import { UmbControllerBase as A } from "@umbraco-cms/backoffice/class-api";
import { tryExecute as I } from "@umbraco-cms/backoffice/resources";
import { O as h } from "./entry-Dmsr03Qq.js";
class B extends Error {
  constructor(e, t, o) {
    super(o), this.name = "ApiError", this.url = t.url, this.status = t.status, this.statusText = t.statusText, this.body = t.body, this.request = e;
  }
}
class D extends Error {
  constructor(e) {
    super(e), this.name = "CancelError";
  }
  get isCancelled() {
    return !0;
  }
}
class H {
  constructor(e) {
    this._isResolved = !1, this._isRejected = !1, this._isCancelled = !1, this.cancelHandlers = [], this.promise = new Promise((t, o) => {
      this._resolve = t, this._reject = o;
      const s = (i) => {
        this._isResolved || this._isRejected || this._isCancelled || (this._isResolved = !0, this._resolve && this._resolve(i));
      }, n = (i) => {
        this._isResolved || this._isRejected || this._isCancelled || (this._isRejected = !0, this._reject && this._reject(i));
      }, a = (i) => {
        this._isResolved || this._isRejected || this._isCancelled || this.cancelHandlers.push(i);
      };
      return Object.defineProperty(a, "isResolved", {
        get: () => this._isResolved
      }), Object.defineProperty(a, "isRejected", {
        get: () => this._isRejected
      }), Object.defineProperty(a, "isCancelled", {
        get: () => this._isCancelled
      }), e(s, n, a);
    });
  }
  get [Symbol.toStringTag]() {
    return "Cancellable Promise";
  }
  then(e, t) {
    return this.promise.then(e, t);
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
      this.cancelHandlers.length = 0, this._reject && this._reject(new D("Request aborted"));
    }
  }
  get isCancelled() {
    return this._isCancelled;
  }
}
const b = (r) => typeof r == "string", q = (r) => b(r) && r !== "", w = (r) => r instanceof Blob, E = (r) => r instanceof FormData, N = (r) => {
  try {
    return btoa(r);
  } catch {
    return Buffer.from(r).toString("base64");
  }
}, x = (r) => {
  const e = [], t = (s, n) => {
    e.push(`${encodeURIComponent(s)}=${encodeURIComponent(String(n))}`);
  }, o = (s, n) => {
    n != null && (n instanceof Date ? t(s, n.toISOString()) : Array.isArray(n) ? n.forEach((a) => o(s, a)) : typeof n == "object" ? Object.entries(n).forEach(([a, i]) => o(`${s}[${a}]`, i)) : t(s, n));
  };
  return Object.entries(r).forEach(([s, n]) => o(s, n)), e.length ? `?${e.join("&")}` : "";
}, k = (r, e) => {
  const t = encodeURI, o = e.url.replace("{api-version}", r.VERSION).replace(/{(.*?)}/g, (n, a) => {
    var i;
    return (i = e.path) != null && i.hasOwnProperty(a) ? t(String(e.path[a])) : n;
  }), s = r.BASE + o;
  return e.query ? s + x(e.query) : s;
}, z = (r) => {
  if (r.formData) {
    const e = new FormData(), t = (o, s) => {
      b(s) || w(s) ? e.append(o, s) : e.append(o, JSON.stringify(s));
    };
    return Object.entries(r.formData).filter(([, o]) => o != null).forEach(([o, s]) => {
      Array.isArray(s) ? s.forEach((n) => t(o, n)) : t(o, s);
    }), e;
  }
}, T = async (r, e) => typeof e == "function" ? e(r) : e, U = async (r, e) => {
  const [t, o, s, n] = await Promise.all([
    T(e, r.TOKEN),
    T(e, r.USERNAME),
    T(e, r.PASSWORD),
    T(e, r.HEADERS)
  ]), a = Object.entries({
    Accept: "application/json",
    ...n,
    ...e.headers
  }).filter(([, i]) => i != null).reduce((i, [f, m]) => ({
    ...i,
    [f]: String(m)
  }), {});
  if (q(t) && (a.Authorization = `Bearer ${t}`), q(o) && q(s)) {
    const i = N(`${o}:${s}`);
    a.Authorization = `Basic ${i}`;
  }
  return e.body !== void 0 && (e.mediaType ? a["Content-Type"] = e.mediaType : w(e.body) ? a["Content-Type"] = e.body.type || "application/octet-stream" : b(e.body) ? a["Content-Type"] = "text/plain" : E(e.body) || (a["Content-Type"] = "application/json")), new Headers(a);
}, L = (r) => {
  var e, t;
  if (r.body !== void 0)
    return (e = r.mediaType) != null && e.includes("application/json") || (t = r.mediaType) != null && t.includes("+json") ? JSON.stringify(r.body) : b(r.body) || w(r.body) || E(r.body) ? r.body : JSON.stringify(r.body);
}, F = async (r, e, t, o, s, n, a) => {
  const i = new AbortController();
  let f = {
    headers: n,
    body: o ?? s,
    method: e.method,
    signal: i.signal
  };
  r.WITH_CREDENTIALS && (f.credentials = r.CREDENTIALS);
  for (const m of r.interceptors.request._fns)
    f = await m(f);
  return a(() => i.abort()), await fetch(t, f);
}, $ = (r, e) => {
  if (e) {
    const t = r.headers.get(e);
    if (b(t))
      return t;
  }
}, M = async (r) => {
  if (r.status !== 204)
    try {
      const e = r.headers.get("Content-Type");
      if (e) {
        const t = ["application/octet-stream", "application/pdf", "application/zip", "audio/", "image/", "video/"];
        if (e.includes("application/json") || e.includes("+json"))
          return await r.json();
        if (t.some((o) => e.includes(o)))
          return await r.blob();
        if (e.includes("multipart/form-data"))
          return await r.formData();
        if (e.includes("text/"))
          return await r.text();
      }
    } catch (e) {
      console.error(e);
    }
}, G = (r, e) => {
  const o = {
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
    ...r.errors
  }[e.status];
  if (o)
    throw new B(r, e, o);
  if (!e.ok) {
    const s = e.status ?? "unknown", n = e.statusText ?? "unknown", a = (() => {
      try {
        return JSON.stringify(e.body, null, 2);
      } catch {
        return;
      }
    })();
    throw new B(
      r,
      e,
      `Generic Error: status: ${s}; status text: ${n}; body: ${a}`
    );
  }
}, g = (r, e) => new H(async (t, o, s) => {
  try {
    const n = k(r, e), a = z(e), i = L(e), f = await U(r, e);
    if (!s.isCancelled) {
      let m = await F(r, e, n, i, a, f, s);
      for (const P of r.interceptors.response._fns)
        m = await P(m);
      const O = await M(m), _ = $(m, e.responseHeader), S = {
        url: n,
        ok: m.ok,
        status: m.status,
        statusText: m.statusText,
        body: _ ?? O
      };
      G(e, S), t(S.body);
    }
  } catch (n) {
    o(n);
  }
});
class y {
  /**
   * @returns EnumDescription OK
   * @throws ApiError
   */
  static browserTtlOptions() {
    return g(h, {
      method: "GET",
      url: "/umbraco/umbhostcloudflarepurge/v1.0/cache-settings/browserttloptions",
      errors: {
        401: "The resource is protected and requires an authentication token"
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.zoneId
   * @returns AllSettings OK
   * @throws ApiError
   */
  static getCacheSettings(e = {}) {
    return g(h, {
      method: "GET",
      url: "/umbraco/umbhostcloudflarepurge/v1.0/cache-settings/getcachesettings",
      query: {
        zoneId: e.zoneId
      },
      errors: {
        400: "Bad Request",
        401: "The resource is protected and requires an authentication token"
      }
    });
  }
  /**
   * @returns UmbHostCloudflarePurgeZone OK
   * @throws ApiError
   */
  static getZones() {
    return g(h, {
      method: "GET",
      url: "/umbraco/umbhostcloudflarepurge/v1.0/cache-settings/getzones",
      errors: {
        401: "The resource is protected and requires an authentication token"
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.requestBody
   * @param data.zoneId
   * @returns AlwaysOnline OK
   * @throws ApiError
   */
  static toggleAlwaysOnline(e) {
    return g(h, {
      method: "PATCH",
      url: "/umbraco/umbhostcloudflarepurge/v1.0/cache-settings/togglealwaysonline",
      query: {
        zoneId: e.zoneId
      },
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
   * @param data.zoneId
   * @returns BrowserCacheTtl OK
   * @throws ApiError
   */
  static toggleBrowserCacheTtl(e) {
    return g(h, {
      method: "PATCH",
      url: "/umbraco/umbhostcloudflarepurge/v1.0/cache-settings/togglebrowsercachettl",
      query: {
        zoneId: e.zoneId
      },
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
   * @param data.zoneId
   * @returns CacheLevel OK
   * @throws ApiError
   */
  static toggleCachingLevel(e) {
    return g(h, {
      method: "PATCH",
      url: "/umbraco/umbhostcloudflarepurge/v1.0/cache-settings/togglecachinglevel",
      query: {
        zoneId: e.zoneId
      },
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
   * @param data.zoneId
   * @returns DevelopmentMode OK
   * @throws ApiError
   */
  static toggleDevelopmentMode(e) {
    return g(h, {
      method: "PATCH",
      url: "/umbraco/umbhostcloudflarepurge/v1.0/cache-settings/toggledevelopmentmode",
      query: {
        zoneId: e.zoneId
      },
      body: e.requestBody,
      mediaType: "application/json",
      errors: {
        400: "Bad Request",
        401: "The resource is protected and requires an authentication token"
      }
    });
  }
  /**
   * @returns ConfigurationStatus OK
   * @throws ApiError
   */
  static getConfigurationStatus() {
    return g(h, {
      method: "GET",
      url: "/umbraco/umbhostcloudflarepurge/v1.0/configuration/status",
      errors: {
        401: "The resource is protected and requires an authentication token"
      }
    });
  }
  /**
   * @returns unknown Accepted
   * @throws ApiError
   */
  static all() {
    return g(h, {
      method: "POST",
      url: "/umbraco/umbhostcloudflarepurge/v1.0/purge/all",
      errors: {
        400: "Bad Request",
        401: "The resource is protected and requires an authentication token"
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.requestBody
   * @returns unknown Accepted
   * @throws ApiError
   */
  static custom(e = {}) {
    return g(h, {
      method: "POST",
      url: "/umbraco/umbhostcloudflarepurge/v1.0/purge/custom",
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
   * @returns unknown Accepted
   * @throws ApiError
   */
  static mediaFolder(e = {}) {
    return g(h, {
      method: "POST",
      url: "/umbraco/umbhostcloudflarepurge/v1.0/purge/mediafolder",
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
   * @returns unknown Accepted
   * @throws ApiError
   */
  static node(e = {}) {
    return g(h, {
      method: "POST",
      url: "/umbraco/umbhostcloudflarepurge/v1.0/purge/node",
      body: e.requestBody,
      mediaType: "application/json",
      errors: {
        400: "Bad Request",
        401: "The resource is protected and requires an authentication token"
      }
    });
  }
}
var u, p;
class V extends A {
  constructor() {
    super(...arguments);
    R(this, u);
  }
  purgeAll(t) {
    return d(this, u, p).call(this, y.all(), t);
  }
  purgeCustom(t, o) {
    return d(this, u, p).call(this, y.custom(t), o);
  }
  purgeNode(t, o) {
    return d(this, u, p).call(this, y.node(t), o);
  }
  getZones(t) {
    return d(this, u, p).call(this, y.getZones(), t);
  }
  getConfigurationStatus(t) {
    return d(this, u, p).call(this, y.getConfigurationStatus(), t);
  }
  getBrowserTtlOptions(t) {
    return d(this, u, p).call(this, y.browserTtlOptions(), t);
  }
  getCacheSettings(t, o) {
    return d(this, u, p).call(this, y.getCacheSettings(t), o);
  }
  toggleBrowserCacheTtl(t, o) {
    return d(this, u, p).call(this, y.toggleBrowserCacheTtl(t), o);
  }
  toggleAlwaysOnline(t, o) {
    return d(this, u, p).call(this, y.toggleAlwaysOnline(t), o);
  }
  toggleDevelopmentMode(t, o) {
    return d(this, u, p).call(this, y.toggleDevelopmentMode(t), o);
  }
  toggleCachingLevel(t, o) {
    return d(this, u, p).call(this, y.toggleCachingLevel(t), o);
  }
}
u = new WeakSet(), p = async function(t, o) {
  const s = await I(this, t, o), n = s == null ? void 0 : s.error;
  return n ? { error: n } : { data: s };
};
var c;
class Q extends A {
  constructor(t) {
    super(t);
    R(this, c);
    v(this, c, new V(this));
  }
  purgeAll(t) {
    return l(this, c).purgeAll(t);
  }
  purgeCustom(t, o) {
    return l(this, c).purgeCustom(t, o);
  }
  purgeNode(t, o) {
    return l(this, c).purgeNode(t, o);
  }
  /** Returns the configured zones mapped to UI-ready options for selects. */
  async getZoneOptions(t) {
    const { data: o, error: s } = await l(this, c).getZones(t);
    return s ? { error: s } : {
      data: (o == null ? void 0 : o.map((n) => ({ name: n.domain, value: n.zoneId }))) ?? []
    };
  }
  getBrowserTtlOptions(t) {
    return l(this, c).getBrowserTtlOptions(t);
  }
  /** Reports whether the package is configured (no secret values are returned). */
  getConfigurationStatus(t) {
    return l(this, c).getConfigurationStatus(t);
  }
  getCacheSettings(t, o) {
    return l(this, c).getCacheSettings(t, o);
  }
  toggleBrowserCacheTtl(t, o) {
    return l(this, c).toggleBrowserCacheTtl(t, o);
  }
  toggleAlwaysOnline(t, o) {
    return l(this, c).toggleAlwaysOnline(t, o);
  }
  toggleDevelopmentMode(t, o) {
    return l(this, c).toggleDevelopmentMode(t, o);
  }
  toggleCachingLevel(t, o) {
    return l(this, c).toggleCachingLevel(t, o);
  }
}
c = new WeakMap();
export {
  Q as UmbHostCloudflarePurgeRepository,
  Q as api
};
//# sourceMappingURL=purge.repository-NmZ86NGk.js.map
