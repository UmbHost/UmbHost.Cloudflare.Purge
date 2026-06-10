var q = (t) => {
  throw TypeError(t);
};
var E = (t, e, r) => e.has(t) || q("Cannot " + r);
var C = (t, e, r) => e.has(t) ? q("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, r);
var d = (t, e, r) => (E(t, e, "access private method"), r);
import { UmbControllerBase as v } from "@umbraco-cms/backoffice/class-api";
import { tryExecute as A } from "@umbraco-cms/backoffice/resources";
import { O as l } from "./entry-iPHDpXgM.js";
class w extends Error {
  constructor(e, r, o) {
    super(o), this.name = "ApiError", this.url = r.url, this.status = r.status, this.statusText = r.statusText, this.body = r.body, this.request = e;
  }
}
class O extends Error {
  constructor(e) {
    super(e), this.name = "CancelError";
  }
  get isCancelled() {
    return !0;
  }
}
class P {
  constructor(e) {
    this._isResolved = !1, this._isRejected = !1, this._isCancelled = !1, this.cancelHandlers = [], this.promise = new Promise((r, o) => {
      this._resolve = r, this._reject = o;
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
      this.cancelHandlers.length = 0, this._reject && this._reject(new O("Request aborted"));
    }
  }
  get isCancelled() {
    return this._isCancelled;
  }
}
const y = (t) => typeof t == "string", b = (t) => y(t) && t !== "", T = (t) => t instanceof Blob, j = (t) => t instanceof FormData, H = (t) => {
  try {
    return btoa(t);
  } catch {
    return Buffer.from(t).toString("base64");
  }
}, I = (t) => {
  const e = [], r = (s, n) => {
    e.push(`${encodeURIComponent(s)}=${encodeURIComponent(String(n))}`);
  }, o = (s, n) => {
    n != null && (n instanceof Date ? r(s, n.toISOString()) : Array.isArray(n) ? n.forEach((a) => o(s, a)) : typeof n == "object" ? Object.entries(n).forEach(([a, i]) => o(`${s}[${a}]`, i)) : r(s, n));
  };
  return Object.entries(t).forEach(([s, n]) => o(s, n)), e.length ? `?${e.join("&")}` : "";
}, N = (t, e) => {
  const r = encodeURI, o = e.url.replace("{api-version}", t.VERSION).replace(/{(.*?)}/g, (n, a) => {
    var i;
    return (i = e.path) != null && i.hasOwnProperty(a) ? r(String(e.path[a])) : n;
  }), s = t.BASE + o;
  return e.query ? s + I(e.query) : s;
}, D = (t) => {
  if (t.formData) {
    const e = new FormData(), r = (o, s) => {
      y(s) || T(s) ? e.append(o, s) : e.append(o, JSON.stringify(s));
    };
    return Object.entries(t.formData).filter(([, o]) => o != null).forEach(([o, s]) => {
      Array.isArray(s) ? s.forEach((n) => r(o, n)) : r(o, s);
    }), e;
  }
}, f = async (t, e) => typeof e == "function" ? e(t) : e, U = async (t, e) => {
  const [r, o, s, n] = await Promise.all([
    f(e, t.TOKEN),
    f(e, t.USERNAME),
    f(e, t.PASSWORD),
    f(e, t.HEADERS)
  ]), a = Object.entries({
    Accept: "application/json",
    ...n,
    ...e.headers
  }).filter(([, i]) => i != null).reduce((i, [m, u]) => ({
    ...i,
    [m]: String(u)
  }), {});
  if (b(r) && (a.Authorization = `Bearer ${r}`), b(o) && b(s)) {
    const i = H(`${o}:${s}`);
    a.Authorization = `Basic ${i}`;
  }
  return e.body !== void 0 && (e.mediaType ? a["Content-Type"] = e.mediaType : T(e.body) ? a["Content-Type"] = e.body.type || "application/octet-stream" : y(e.body) ? a["Content-Type"] = "text/plain" : j(e.body) || (a["Content-Type"] = "application/json")), new Headers(a);
}, x = (t) => {
  var e, r;
  if (t.body !== void 0)
    return (e = t.mediaType) != null && e.includes("application/json") || (r = t.mediaType) != null && r.includes("+json") ? JSON.stringify(t.body) : y(t.body) || T(t.body) || j(t.body) ? t.body : JSON.stringify(t.body);
}, z = async (t, e, r, o, s, n, a) => {
  const i = new AbortController();
  let m = {
    headers: n,
    body: o ?? s,
    method: e.method,
    signal: i.signal
  };
  t.WITH_CREDENTIALS && (m.credentials = t.CREDENTIALS);
  for (const u of t.interceptors.request._fns)
    m = await u(m);
  return a(() => i.abort()), await fetch(r, m);
}, k = (t, e) => {
  if (e) {
    const r = t.headers.get(e);
    if (y(r))
      return r;
  }
}, F = async (t) => {
  if (t.status !== 204)
    try {
      const e = t.headers.get("Content-Type");
      if (e) {
        const r = ["application/octet-stream", "application/pdf", "application/zip", "audio/", "image/", "video/"];
        if (e.includes("application/json") || e.includes("+json"))
          return await t.json();
        if (r.some((o) => e.includes(o)))
          return await t.blob();
        if (e.includes("multipart/form-data"))
          return await t.formData();
        if (e.includes("text/"))
          return await t.text();
      }
    } catch (e) {
      console.error(e);
    }
}, L = (t, e) => {
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
    ...t.errors
  }[e.status];
  if (o)
    throw new w(t, e, o);
  if (!e.ok) {
    const s = e.status ?? "unknown", n = e.statusText ?? "unknown", a = (() => {
      try {
        return JSON.stringify(e.body, null, 2);
      } catch {
        return;
      }
    })();
    throw new w(
      t,
      e,
      `Generic Error: status: ${s}; status text: ${n}; body: ${a}`
    );
  }
}, h = (t, e) => new P(async (r, o, s) => {
  try {
    const n = N(t, e), a = D(e), i = x(e), m = await U(t, e);
    if (!s.isCancelled) {
      let u = await z(t, e, n, i, a, m, s);
      for (const _ of t.interceptors.response._fns)
        u = await _(u);
      const S = await F(u), B = k(u, e.responseHeader), R = {
        url: n,
        ok: u.ok,
        status: u.status,
        statusText: u.statusText,
        body: B ?? S
      };
      L(e, R), r(R.body);
    }
  } catch (n) {
    o(n);
  }
});
class g {
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static browserTtlOptions() {
    return h(l, {
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
   * @returns unknown OK
   * @throws ApiError
   */
  static getCacheSettings(e = {}) {
    return h(l, {
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
   * @returns unknown OK
   * @throws ApiError
   */
  static getZones() {
    return h(l, {
      method: "GET",
      url: "/umbraco/umbhostcloudflarepurge/v1.0/cache-settings/getzones",
      errors: {
        401: "The resource is protected and requires an authentication token"
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.zoneId
   * @param data.requestBody
   * @returns unknown OK
   * @throws ApiError
   */
  static toggleAlwaysOnline(e = {}) {
    return h(l, {
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
   * @param data.zoneId
   * @param data.requestBody
   * @returns unknown OK
   * @throws ApiError
   */
  static toggleBrowserCacheTtl(e = {}) {
    return h(l, {
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
   * @param data.zoneId
   * @param data.requestBody
   * @returns unknown OK
   * @throws ApiError
   */
  static toggleCachingLevel(e = {}) {
    return h(l, {
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
   * @param data.zoneId
   * @param data.requestBody
   * @returns unknown OK
   * @throws ApiError
   */
  static toggleDevelopmentMode(e = {}) {
    return h(l, {
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
   * @returns string Accepted
   * @throws ApiError
   */
  static all() {
    return h(l, {
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
    return h(l, {
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
    return h(l, {
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
    return h(l, {
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
var c, p;
class J extends v {
  constructor() {
    super(...arguments);
    C(this, c);
  }
  purgeAll(r) {
    return d(this, c, p).call(this, g.all(), r);
  }
  purgeCustom(r, o) {
    return d(this, c, p).call(this, g.custom(r), o);
  }
  purgeNode(r, o) {
    return d(this, c, p).call(this, g.node(r), o);
  }
  getZones(r) {
    return d(this, c, p).call(this, g.getZones(), r);
  }
  getBrowserTtlOptions(r) {
    return d(this, c, p).call(this, g.browserTtlOptions(), r);
  }
  getCacheSettings(r, o) {
    return d(this, c, p).call(this, g.getCacheSettings(r), o);
  }
  toggleBrowserCacheTtl(r, o) {
    return d(this, c, p).call(this, g.toggleBrowserCacheTtl(r), o);
  }
  toggleAlwaysOnline(r, o) {
    return d(this, c, p).call(this, g.toggleAlwaysOnline(r), o);
  }
  toggleDevelopmentMode(r, o) {
    return d(this, c, p).call(this, g.toggleDevelopmentMode(r), o);
  }
  toggleCachingLevel(r, o) {
    return d(this, c, p).call(this, g.toggleCachingLevel(r), o);
  }
}
c = new WeakSet(), p = async function(r, o) {
  const s = await A(this, r, o);
  return s.error ? { error: s.error } : { data: s };
};
export {
  J as U
};
//# sourceMappingURL=purge.repository-Dhvy131L.js.map
