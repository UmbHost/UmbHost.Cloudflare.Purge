var s = (o) => {
  throw TypeError(o);
};
var d = (o, t, e) => t.has(o) || s("Cannot " + e);
var n = (o, t, e) => t.has(o) ? s("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(o) : t.set(o, e);
var u = (o, t, e) => (d(o, t, "access private method"), e);
import { UmbConditionBase as f } from "@umbraco-cms/backoffice/extension-registry";
import { UmbHostCloudflarePurgeRepository as c } from "./purge.repository-CdCatEKW.js";
var r, a;
class l extends f {
  constructor(e, i) {
    super(e, i);
    n(this, r);
    u(this, r, a).call(this);
  }
}
r = new WeakSet(), a = async function() {
  const e = new c(this), { data: i } = await e.getConfigurationStatus({ disableNotifications: !0 });
  this.permitted = (i == null ? void 0 : i.isConfigured) === !0;
};
export {
  l as UmbHostCloudflarePurgeIsConfiguredCondition,
  l as default
};
//# sourceMappingURL=is-configured.condition-CsBKcKEc.js.map
