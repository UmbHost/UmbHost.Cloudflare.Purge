import { UMB_DOCUMENT_ENTITY_TYPE } from "@umbraco-cms/backoffice/document";
import { UMB_MEDIA_ENTITY_TYPE } from "@umbraco-cms/backoffice/media";

const purgeCdnContentEntityActionManifest = {
    type: 'entityAction',
    alias: 'umbhost-cloudflare-purge-cdn-entity-action-content',
    name: 'Cloudflare CDN Purge Entity Action',
    kind: 'default',
    weight: 50,
    api: () => import("./purge-content-tree-entity.action"),
    forEntityTypes: [UMB_DOCUMENT_ENTITY_TYPE] as string[],
    meta: {
        icon: 'icon-cloud',
        label: '#umbhostCloudflarePurge_entityactionlabel'
    },
    conditions: [
			{
				alias: 'Umb.Condition.UserPermission.Document',
				allOf: ['UmbHostCloudflarePurgeContent']
			}
		]
};

const purgeCdnMediaEntityActionManifest = {
    type: 'entityAction',
    alias: 'umbhost-cloudflare-purge-cdn-entity-action-media',
    name: 'Cloudflare CDN Purge Entity Action',
    kind: 'default',
    weight: 50,
    api: () => import("./purge-media-tree-entity.action"),
    forEntityTypes: [UMB_MEDIA_ENTITY_TYPE] as string[],
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
    purgeCdnContentEntityActionManifest,
    purgeCdnMediaEntityActionManifest
];