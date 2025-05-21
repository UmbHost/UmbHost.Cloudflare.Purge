import { O as d } from "./entry-DIZIE3pA.js";
class b extends Error {
  constructor(e, r, o) {
    super(o), this.name = "ApiError", this.url = r.url, this.status = r.status, this.statusText = r.statusText, this.body = r.body, this.request = e;
  }
}
class j extends Error {
  constructor(e) {
    super(e), this.name = "CancelError";
  }
  get isCancelled() {
    return !0;
  }
}
class w {
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
      this.cancelHandlers.length = 0, this._reject && this._reject(new j("Request aborted"));
    }
  }
  get isCancelled() {
    return this._isCancelled;
  }
}
const h = (t) => typeof t == "string", y = (t) => h(t) && t !== "", f = (t) => t instanceof Blob, g = (t) => t instanceof FormData, C = (t) => {
  try {
    return btoa(t);
  } catch {
    return Buffer.from(t).toString("base64");
  }
}, S = (t) => {
  const e = [], r = (s, n) => {
    e.push(`${encodeURIComponent(s)}=${encodeURIComponent(String(n))}`);
  }, o = (s, n) => {
    n != null && (n instanceof Date ? r(s, n.toISOString()) : Array.isArray(n) ? n.forEach((a) => o(s, a)) : typeof n == "object" ? Object.entries(n).forEach(([a, i]) => o(`${s}[${a}]`, i)) : r(s, n));
  };
  return Object.entries(t).forEach(([s, n]) => o(s, n)), e.length ? `?${e.join("&")}` : "";
}, _ = (t, e) => {
  const r = encodeURI, o = e.url.replace("{api-version}", t.VERSION).replace(/{(.*?)}/g, (n, a) => {
    var i;
    return (i = e.path) != null && i.hasOwnProperty(a) ? r(String(e.path[a])) : n;
  }), s = t.BASE + o;
  return e.query ? s + S(e.query) : s;
}, E = (t) => {
  if (t.formData) {
    const e = new FormData(), r = (o, s) => {
      h(s) || f(s) ? e.append(o, s) : e.append(o, JSON.stringify(s));
    };
    return Object.entries(t.formData).filter(([, o]) => o != null).forEach(([o, s]) => {
      Array.isArray(s) ? s.forEach((n) => r(o, n)) : r(o, s);
    }), e;
  }
}, p = async (t, e) => typeof e == "function" ? e(t) : e, B = async (t, e) => {
  const [r, o, s, n] = await Promise.all([
    p(e, t.TOKEN),
    p(e, t.USERNAME),
    p(e, t.PASSWORD),
    p(e, t.HEADERS)
  ]), a = Object.entries({
    Accept: "application/json",
    ...n,
    ...e.headers
  }).filter(([, i]) => i != null).reduce((i, [l, c]) => ({
    ...i,
    [l]: String(c)
  }), {});
  if (y(r) && (a.Authorization = `Bearer ${r}`), y(o) && y(s)) {
    const i = C(`${o}:${s}`);
    a.Authorization = `Basic ${i}`;
  }
  return e.body !== void 0 && (e.mediaType ? a["Content-Type"] = e.mediaType : f(e.body) ? a["Content-Type"] = e.body.type || "application/octet-stream" : h(e.body) ? a["Content-Type"] = "text/plain" : g(e.body) || (a["Content-Type"] = "application/json")), new Headers(a);
}, A = (t) => {
  var e, r;
  if (t.body !== void 0)
    return (e = t.mediaType) != null && e.includes("application/json") || (r = t.mediaType) != null && r.includes("+json") ? JSON.stringify(t.body) : h(t.body) || f(t.body) || g(t.body) ? t.body : JSON.stringify(t.body);
}, v = async (t, e, r, o, s, n, a) => {
  const i = new AbortController();
  let l = {
    headers: n,
    body: o ?? s,
    method: e.method,
    signal: i.signal
  };
  t.WITH_CREDENTIALS && (l.credentials = t.CREDENTIALS);
  for (const c of t.interceptors.request._fns)
    l = await c(l);
  return a(() => i.abort()), await fetch(r, l);
}, P = (t, e) => {
  if (e) {
    const r = t.headers.get(e);
    if (h(r))
      return r;
  }
}, I = async (t) => {
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
}, O = (t, e) => {
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
    throw new b(t, e, o);
  if (!e.ok) {
    const s = e.status ?? "unknown", n = e.statusText ?? "unknown", a = (() => {
      try {
        return JSON.stringify(e.body, null, 2);
      } catch {
        return;
      }
    })();
    throw new b(
      t,
      e,
      `Generic Error: status: ${s}; status text: ${n}; body: ${a}`
    );
  }
}, u = (t, e) => new w(async (r, o, s) => {
  try {
    const n = _(t, e), a = E(e), i = A(e), l = await B(t, e);
    if (!s.isCancelled) {
      let c = await v(t, e, n, i, a, l, s);
      for (const q of t.interceptors.response._fns)
        c = await q(c);
      const T = await I(c), R = P(c, e.responseHeader), m = {
        url: n,
        ok: c.ok,
        status: c.status,
        statusText: c.statusText,
        body: R ?? T
      };
      O(e, m), r(m.body);
    }
  } catch (n) {
    o(n);
  }
});
class N {
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static browserTtlOptions() {
    return u(d, {
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
    return u(d, {
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
    return u(d, {
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
    return u(d, {
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
    return u(d, {
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
    return u(d, {
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
    return u(d, {
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
    return u(d, {
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
    return u(d, {
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
    return u(d, {
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
    return u(d, {
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
export {
  N as V
};
//# sourceMappingURL=services.gen-Dn3r4cXe.js.map
