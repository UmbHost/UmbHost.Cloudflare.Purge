import { UMB_DOCUMENT_ENTITY_TYPE } from "@umbraco-cms/backoffice/document";
import { PurdeCdnEntityAction } from "./tree-entity.action"
import { UMB_MEDIA_ENTITY_TYPE } from "@umbraco-cms/backoffice/media";

const dashboardManifest = {
  type: 'dashboard',
  alias: 'umbhost-cloudflare-purge-dashboard',
  name: 'Cloudflare CDN Purge Dashboard',
  element: () => import('./dashboard'),
  elementName: "umbhost-cloudflare-purge-dashboard",
  weight: 30,
  meta: {
    label: "Cloudflare CDN Purge Dashboard",
    pathname: "umbhost-cloudflare-purge-dashboard"
  },
  conditions: [
    {
      alias: "Umb.Condition.SectionAlias",
      match: "Umb.Section.Content"
    }
  ]
};

const purgeCdnEntityActionManifest = {
	type: 'entityAction',
	alias: 'umbhost-cloudflare-purge-cdn-entity-action',
	name: 'Cloudflare CDN Purge Entity Action',
  kind: 'default',
	weight: 50,
	api: PurdeCdnEntityAction,
	forEntityTypes: [ UMB_DOCUMENT_ENTITY_TYPE, UMB_MEDIA_ENTITY_TYPE ],
	meta: {
		icon: 'icon-cloud',
		label: '#umbhostCloudflarePurge_entityactionlabel'
	},
};

const localization = {
    type: "localization",
    alias: "umbhost-cloudflare-purge-localize-en",
    name: "Cloudflare CDN Purge Localization",
    meta: {
      "culture": "en"
    },
    js : ()=> import('./localization/en')
};

export const manifests: Array<UmbExtensionManifest> = [
  dashboardManifest,
  localization,
  purgeCdnEntityActionManifest
];