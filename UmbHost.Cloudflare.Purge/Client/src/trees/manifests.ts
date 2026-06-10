import { UMB_DOCUMENT_ENTITY_TYPE } from "@umbraco-cms/backoffice/document";
import { UMB_MEDIA_ENTITY_TYPE } from "@umbraco-cms/backoffice/media";

const purgeCdnContentEntityActionManifest = {
    type: 'entityAction',
    alias: 'umbhost-cloudflare-purge-cdn-entity-action-content',
    name: 'Cloudflare CDN Purge Content Entity Action',
    kind: 'default',
    weight: 50,
    api: () => import("./purge-content-tree-entity.action"),
    forEntityTypes: [UMB_DOCUMENT_ENTITY_TYPE],
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
    name: 'Cloudflare CDN Purge Media Entity Action',
    kind: 'default',
    weight: 50,
    api: () => import("./purge-media-tree-entity.action"),
    forEntityTypes: [UMB_MEDIA_ENTITY_TYPE],
    meta: {
        icon: 'icon-cloud',
        label: '#umbhostCloudflarePurge_entityactionlabel'
    },
    // Note: the backoffice has no `Umb.Condition.UserPermission.Media`. The media purge
    // verb is therefore registered as a document user permission (see userpermissions/manifests.ts)
    // and gated via the document permission condition. This is a deliberate workaround for the
    // lack of granular media permissions in core; it acts as a coarse "does this user group have
    // the purge-media verb" gate.
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