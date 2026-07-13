import { UMB_DOCUMENT_ENTITY_TYPE } from "@umbraco-cms/backoffice/document";

const purgeContentTreeItems = {
    type: "entityUserPermission",
    alias: "umbhost-cloudflare-purge-userpermissions-content",
    name: "Purge Content Items from Cloudflare CDN",
    forEntityTypes: [UMB_DOCUMENT_ENTITY_TYPE],
    meta: {
      verbs: ["UmbHostCloudflarePurgeContent"],
      label: "#umbhostCloudflarePurge_usercontentpermissionslabel",
      description: "#umbhostCloudflarePurge_usercontentpermissionsdescription",
      group: "umbHostCloudflarePurge",
    },
  }

// The media purge permission is intentionally registered against the DOCUMENT entity type.
// The backoffice has no granular media user-permission system / `Umb.Condition.UserPermission.Media`,
// so the media verb lives in the document permission set and is enforced by the document permission
// condition on the media entity action (see trees/manifests.ts). This is a deliberate workaround.
const purgeMediaTreeItems = {
    type: "entityUserPermission",
    alias: "umbhost-cloudflare-purge-userpermissions-media",
    name: "Purge Media Items from Cloudflare CDN",
    forEntityTypes: [UMB_DOCUMENT_ENTITY_TYPE],
    meta: {
      verbs: ["UmbHostCloudflarePurgeMedia"],
      label: "#umbhostCloudflarePurge_usermediapermissionslabel",
      description: "#umbhostCloudflarePurge_usermediapermissionsdescription",
      group: "umbHostCloudflarePurge",
    },
  }

export const manifests = [
    purgeContentTreeItems,
    purgeMediaTreeItems
];