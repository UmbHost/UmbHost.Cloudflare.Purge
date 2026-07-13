var y = (l) => {
  throw TypeError(l);
};
var v = (l, i, o) => i.has(l) || y("Cannot " + o);
var a = (l, i, o) => (v(l, i, "read from private field"), o ? o.call(l) : i.get(l)), p = (l, i, o) => i.has(l) ? y("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(l) : i.set(l, o), b = (l, i, o, e) => (v(l, i, "write to private field"), e ? e.call(l, o) : i.set(l, o), o), h = (l, i, o) => (v(l, i, "access private method"), o);
import { UmbContextBase as U } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as P } from "@umbraco-cms/backoffice/context-api";
import { UmbObjectState as V } from "@umbraco-cms/backoffice/observable-api";
import { UmbHostCloudflarePurgeRepository as M } from "./purge.repository-NmZ86NGk.js";
const _ = {
  zones: [],
  firstLoad: !0,
  loading: !1,
  browserCacheTtlLoading: !1,
  alwaysOnlineLoading: !1,
  developerModeLoading: !1,
  cachingLevelLoading: !1
};
var d, t, n, c;
class H extends U {
  constructor(o) {
    super(o, z);
    p(this, n);
    p(this, d);
    p(this, t);
    b(this, d, new M(this)), b(this, t, new V(_)), this.zones = a(this, t).asObservablePart((e) => e.zones), this.zoneId = a(this, t).asObservablePart((e) => e.zoneId), this.firstLoad = a(this, t).asObservablePart((e) => e.firstLoad), this.loading = a(this, t).asObservablePart((e) => e.loading), this.browserCacheTtlOptions = a(this, t).asObservablePart((e) => e.browserCacheTtlOptions), this.browserCacheTtlValue = a(this, t).asObservablePart((e) => e.browserCacheTtlValue), this.browserCacheTtlUpdated = a(this, t).asObservablePart((e) => e.browserCacheTtlUpdated), this.browserCacheTtlLoading = a(this, t).asObservablePart((e) => e.browserCacheTtlLoading), this.alwaysOnlineValue = a(this, t).asObservablePart((e) => e.alwaysOnlineValue), this.alwaysOnlineUpdated = a(this, t).asObservablePart((e) => e.alwaysOnlineUpdated), this.alwaysOnlineLoading = a(this, t).asObservablePart((e) => e.alwaysOnlineLoading), this.developerModeValue = a(this, t).asObservablePart((e) => e.developerModeValue), this.developerModeUpdated = a(this, t).asObservablePart((e) => e.developerModeUpdated), this.developerModeLoading = a(this, t).asObservablePart((e) => e.developerModeLoading), this.cachingLevelValue = a(this, t).asObservablePart((e) => e.cachingLevelValue), this.cachingLevelUpdated = a(this, t).asObservablePart((e) => e.cachingLevelUpdated), this.cachingLevelLoading = a(this, t).asObservablePart((e) => e.cachingLevelLoading), this.loadZones();
  }
  async loadZones() {
    const { data: o } = await a(this, d).getZoneOptions();
    a(this, t).update({ zones: o ?? [] });
  }
  async selectZone(o) {
    var e, r, u, g, w, L, f, O, C;
    if (o) {
      a(this, t).update({ firstLoad: !1, loading: !0, zoneId: o });
      try {
        const [m, T] = await Promise.all([
          a(this, d).getBrowserTtlOptions(),
          a(this, d).getCacheSettings({ zoneId: o })
        ]), s = T.data;
        a(this, t).update({
          browserCacheTtlOptions: m.data,
          browserCacheTtlValue: ((e = s == null ? void 0 : s.browserCacheTtl) == null ? void 0 : e.value) !== void 0 ? Number(s.browserCacheTtl.value) : void 0,
          browserCacheTtlUpdated: h(this, n, c).call(this, (r = s == null ? void 0 : s.browserCacheTtl) == null ? void 0 : r.modified_on),
          alwaysOnlineValue: ((u = s == null ? void 0 : s.alwaysOnline) == null ? void 0 : u.value.toLowerCase()) === "on",
          alwaysOnlineUpdated: h(this, n, c).call(this, (g = s == null ? void 0 : s.alwaysOnline) == null ? void 0 : g.modified_on),
          developerModeValue: ((w = s == null ? void 0 : s.developmentMode) == null ? void 0 : w.value.toLowerCase()) === "on",
          developerModeUpdated: h(this, n, c).call(this, (L = s == null ? void 0 : s.developmentMode) == null ? void 0 : L.modified_on),
          cachingLevelValue: (O = (f = s == null ? void 0 : s.cacheLevel) == null ? void 0 : f.value) == null ? void 0 : O.toLowerCase(),
          cachingLevelUpdated: h(this, n, c).call(this, (C = s == null ? void 0 : s.cacheLevel) == null ? void 0 : C.modified_on)
        });
      } finally {
        a(this, t).update({ loading: !1 });
      }
    }
  }
  async toggleBrowserCacheTtl(o) {
    a(this, t).update({ browserCacheTtlLoading: !0 });
    try {
      const { data: e, error: r } = await a(this, d).toggleBrowserCacheTtl({ zoneId: a(this, t).getValue().zoneId, requestBody: { value: o } });
      !r && e && a(this, t).update({
        browserCacheTtlValue: Number(e.value),
        browserCacheTtlUpdated: h(this, n, c).call(this, e.modified_on)
      });
    } finally {
      a(this, t).update({ browserCacheTtlLoading: !1 });
    }
  }
  async toggleAlwaysOnline(o) {
    a(this, t).update({ alwaysOnlineLoading: !0 });
    try {
      const { data: e, error: r } = await a(this, d).toggleAlwaysOnline({ zoneId: a(this, t).getValue().zoneId, requestBody: { value: o ? "on" : "off" } });
      !r && e && a(this, t).update({
        alwaysOnlineValue: e.value.toLowerCase() === "on",
        alwaysOnlineUpdated: h(this, n, c).call(this, e.modified_on)
      });
    } finally {
      a(this, t).update({ alwaysOnlineLoading: !1 });
    }
  }
  async toggleDevelopmentMode(o) {
    a(this, t).update({ developerModeLoading: !0 });
    try {
      const { data: e, error: r } = await a(this, d).toggleDevelopmentMode({ zoneId: a(this, t).getValue().zoneId, requestBody: { value: o ? "on" : "off" } });
      !r && e && a(this, t).update({
        developerModeValue: e.value.toLowerCase() === "on",
        developerModeUpdated: h(this, n, c).call(this, e.modified_on)
      });
    } finally {
      a(this, t).update({ developerModeLoading: !1 });
    }
  }
  async toggleCachingLevel(o) {
    var e;
    a(this, t).update({ cachingLevelLoading: !0 });
    try {
      const { data: r, error: u } = await a(this, d).toggleCachingLevel({ zoneId: a(this, t).getValue().zoneId, requestBody: { value: o } });
      !u && r && a(this, t).update({
        cachingLevelValue: (e = r.value) == null ? void 0 : e.toLowerCase(),
        cachingLevelUpdated: h(this, n, c).call(this, r.modified_on)
      });
    } finally {
      a(this, t).update({ cachingLevelLoading: !1 });
    }
  }
  destroy() {
    a(this, t).destroy(), super.destroy();
  }
}
d = new WeakMap(), t = new WeakMap(), n = new WeakSet(), c = function(o) {
  return o ? new Date(o).toLocaleString() : void 0;
};
const z = new P(
  "UmbHost.CloudflarePurge.CachingContext"
);
export {
  z as UMB_HOST_CLOUDFLARE_PURGE_CACHING_CONTEXT,
  H as UmbHostCloudflarePurgeCachingContext,
  H as api
};
//# sourceMappingURL=caching-workspace.context-Crk7orPn.js.map
