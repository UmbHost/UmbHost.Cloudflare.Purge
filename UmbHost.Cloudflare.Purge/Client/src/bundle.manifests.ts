import { manifests as trees } from "./trees/manifests";
import { manifests as dashboards } from "./dashboards/manifests";
import { manifests as workspaces} from "./workspaces/manifests";
import { manifests as menus } from "./menus/manifests";
import { manifests as localizations } from "./localization/manifests";
import { manifests as userpermissions } from "./userpermissions/manifests";
import { manifests as repository } from "./repository/manifests";
import { UmbBackofficeExtensionRegistry } from "@umbraco-cms/backoffice/extension-registry";

export async function registerManifest(registry : UmbBackofficeExtensionRegistry) {
    registry.registerMany([
  ...repository,
  ...dashboards,
  ...localizations,
  ...trees,
  ...menus,
  ...workspaces,
  ...userpermissions
  ]);
}