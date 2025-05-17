import { UMB_DOCUMENT_ENTITY_TYPE } from "@umbraco-cms/backoffice/document";
import { PurdeCdnEntityAction } from "./purge-tree-entity.action";
import { UMB_MEDIA_ENTITY_TYPE } from "@umbraco-cms/backoffice/media";

const purgeCdnEntityActionManifest = {
    type: 'entityAction',
    alias: 'umbhost-cloudflare-purge-cdn-entity-action',
    name: 'Cloudflare CDN Purge Entity Action',
    kind: 'default',
    weight: 50,
    api: PurdeCdnEntityAction,
    forEntityTypes: [UMB_DOCUMENT_ENTITY_TYPE, UMB_MEDIA_ENTITY_TYPE],
    meta: {
        icon: 'icon-cloud',
        label: '#umbhostCloudflarePurge_entityactionlabel'
    },
    conditions: [
			{
				alias: 'Umb.Condition.UserPermission.Document',
				allOf: ['UmbHostCloudflarePurgeMedia']
			}
		]
};

export const manifests = [
    purgeCdnEntityActionManifest
];