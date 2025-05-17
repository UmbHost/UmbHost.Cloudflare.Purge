import { manifests as trees } from "./trees/manifest";
import { manifests as dashboards } from "./dashboards/manifest";
import { manifests as workspaces} from "./workspaces/manifest";
import { manifests as menus } from "./menus/manifest";
import { manifests as localizations } from "./localization/manifest";
import { manifests as userpermissions } from "./userpermissions/manifest";
import { UmbBackofficeExtensionRegistry } from "@umbraco-cms/backoffice/extension-registry";

export async function registerManifest(registry : UmbBackofficeExtensionRegistry) {
    registry.registerMany([
  ...dashboards,
  ...localizations,
  ...trees,
  ...menus,
  ...workspaces,
  ...userpermissions
  ]);
}