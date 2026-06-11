var C = (l) => {
  throw TypeError(l);
};
var p = (l, i, o) => i.has(l) || C("Cannot " + o);
var a = (l, i, o) => (p(l, i, "read from private field"), o ? o.call(l) : i.get(l)), u = (l, i, o) => i.has(l) ? C("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(l) : i.set(l, o), v = (l, i, o, e) => (p(l, i, "write to private field"), e ? e.call(l, o) : i.set(l, o), o), h = (l, i, o) => (p(l, i, "access private method"), o);
import { UmbContextBase as T } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as U } from "@umbraco-cms/backoffice/context-api";
import { UmbObjectState as P } from "@umbraco-cms/backoffice/observable-api";
import { UmbHostCloudflarePurgeRepository as V } from "./purge.repository-9KTWsyr2.js";
const M = {
  zones: [],
  firstLoad: !0,
  loading: !1,
  browserCacheTtlLoading: !1,
  alwaysOnlineLoading: !1,
  developerModeLoading: !1,
  cachingLevelLoading: !1
};
var r, t, d, c;
class D extends T {
  constructor(o) {
    super(o, _);
    u(this, d);
    u(this, r);
    u(this, t);
    v(this, r, new V(this)), v(this, t, new P(M)), this.zones = a(this, t).asObservablePart((e) => e.zones), this.zoneId = a(this, t).asObservablePart((e) => e.zoneId), this.firstLoad = a(this, t).asObservablePart((e) => e.firstLoad), this.loading = a(this, t).asObservablePart((e) => e.loading), this.browserCacheTtlOptions = a(this, t).asObservablePart((e) => e.browserCacheTtlOptions), this.browserCacheTtlValue = a(this, t).asObservablePart((e) => e.browserCacheTtlValue), this.browserCacheTtlUpdated = a(this, t).asObservablePart((e) => e.browserCacheTtlUpdated), this.browserCacheTtlLoading = a(this, t).asObservablePart((e) => e.browserCacheTtlLoading), this.alwaysOnlineValue = a(this, t).asObservablePart((e) => e.alwaysOnlineValue), this.alwaysOnlineUpdated = a(this, t).asObservablePart((e) => e.alwaysOnlineUpdated), this.alwaysOnlineLoading = a(this, t).asObservablePart((e) => e.alwaysOnlineLoading), this.developerModeValue = a(this, t).asObservablePart((e) => e.developerModeValue), this.developerModeUpdated = a(this, t).asObservablePart((e) => e.developerModeUpdated), this.developerModeLoading = a(this, t).asObservablePart((e) => e.developerModeLoading), this.cachingLevelValue = a(this, t).asObservablePart((e) => e.cachingLevelValue), this.cachingLevelUpdated = a(this, t).asObservablePart((e) => e.cachingLevelUpdated), this.cachingLevelLoading = a(this, t).asObservablePart((e) => e.cachingLevelLoading), this.loadZones();
  }
  async loadZones() {
    const { data: o } = await a(this, r).getZoneOptions();
    a(this, t).update({ zones: o ?? [] });
  }
  async selectZone(o) {
    var e, n, b, g, w, L, f, O;
    if (o) {
      a(this, t).update({ firstLoad: !1, loading: !0, zoneId: o });
      try {
        const [y, m] = await Promise.all([
          a(this, r).getBrowserTtlOptions(),
          a(this, r).getCacheSettings({ zoneId: o })
        ]), s = m.data;
        a(this, t).update({
          browserCacheTtlOptions: y.data,
          browserCacheTtlValue: ((e = s == null ? void 0 : s.browserCacheTtl) == null ? void 0 : e.value) !== void 0 ? Number(s.browserCacheTtl.value) : void 0,
          browserCacheTtlUpdated: h(this, d, c).call(this, (n = s == null ? void 0 : s.browserCacheTtl) == null ? void 0 : n.modified_on),
          alwaysOnlineValue: ((b = s == null ? void 0 : s.alwaysOnline) == null ? void 0 : b.value.toLowerCase()) === "on",
          alwaysOnlineUpdated: h(this, d, c).call(this, (g = s == null ? void 0 : s.alwaysOnline) == null ? void 0 : g.modified_on),
          developerModeValue: ((w = s == null ? void 0 : s.developmentMode) == null ? void 0 : w.value.toLowerCase()) === "on",
          developerModeUpdated: h(this, d, c).call(this, (L = s == null ? void 0 : s.developmentMode) == null ? void 0 : L.modified_on),
          cachingLevelValue: (f = s == null ? void 0 : s.cacheLevel) == null ? void 0 : f.value.toLowerCase(),
          cachingLevelUpdated: h(this, d, c).call(this, (O = s == null ? void 0 : s.cacheLevel) == null ? void 0 : O.modified_on)
        });
      } finally {
        a(this, t).update({ loading: !1 });
      }
    }
  }
  async toggleBrowserCacheTtl(o) {
    a(this, t).update({ browserCacheTtlLoading: !0 });
    try {
      const { data: e, error: n } = await a(this, r).toggleBrowserCacheTtl({ zoneId: a(this, t).getValue().zoneId, requestBody: { value: o } });
      !n && e && a(this, t).update({
        browserCacheTtlValue: Number(e.value),
        browserCacheTtlUpdated: h(this, d, c).call(this, e.modified_on)
      });
    } finally {
      a(this, t).update({ browserCacheTtlLoading: !1 });
    }
  }
  async toggleAlwaysOnline(o) {
    a(this, t).update({ alwaysOnlineLoading: !0 });
    try {
      const { data: e, error: n } = await a(this, r).toggleAlwaysOnline({ zoneId: a(this, t).getValue().zoneId, requestBody: { value: o ? "on" : "off" } });
      !n && e && a(this, t).update({
        alwaysOnlineValue: e.value.toLowerCase() === "on",
        alwaysOnlineUpdated: h(this, d, c).call(this, e.modified_on)
      });
    } finally {
      a(this, t).update({ alwaysOnlineLoading: !1 });
    }
  }
  async toggleDevelopmentMode(o) {
    a(this, t).update({ developerModeLoading: !0 });
    try {
      const { data: e, error: n } = await a(this, r).toggleDevelopmentMode({ zoneId: a(this, t).getValue().zoneId, requestBody: { value: o ? "on" : "off" } });
      !n && e && a(this, t).update({
        developerModeValue: e.value.toLowerCase() === "on",
        developerModeUpdated: h(this, d, c).call(this, e.modified_on)
      });
    } finally {
      a(this, t).update({ developerModeLoading: !1 });
    }
  }
  async toggleCachingLevel(o) {
    a(this, t).update({ cachingLevelLoading: !0 });
    try {
      const { data: e, error: n } = await a(this, r).toggleCachingLevel({ zoneId: a(this, t).getValue().zoneId, requestBody: { value: o } });
      !n && e && a(this, t).update({
        cachingLevelValue: e.value.toLowerCase(),
        cachingLevelUpdated: h(this, d, c).call(this, e.modified_on)
      });
    } finally {
      a(this, t).update({ cachingLevelLoading: !1 });
    }
  }
  destroy() {
    a(this, t).destroy(), super.destroy();
  }
}
r = new WeakMap(), t = new WeakMap(), d = new WeakSet(), c = function(o) {
  return o ? new Date(o).toLocaleString() : void 0;
};
const _ = new U(
  "UmbHost.CloudflarePurge.CachingContext"
);
export {
  _ as UMB_HOST_CLOUDFLARE_PURGE_CACHING_CONTEXT,
  D as UmbHostCloudflarePurgeCachingContext,
  D as api
};
//# sourceMappingURL=caching-workspace.context-D8l7lY_K.js.map
