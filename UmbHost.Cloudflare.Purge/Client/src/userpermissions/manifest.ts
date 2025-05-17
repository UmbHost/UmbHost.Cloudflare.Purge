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
      group: "UmbHost Cloudflare Purge",
    },
  }

const purgeMediaTreeItems = {
    type: "entityUserPermission",
    alias: "umbhost-cloudflare-purge-userpermissions-media",
    name: "Purge Media Items from Cloudflare CDN",
    forEntityTypes: [UMB_DOCUMENT_ENTITY_TYPE],
    meta: {
      verbs: ["UmbHostCloudflarePurgeMedia"],
      label: "#umbhostCloudflarePurge_usermediapermissionslabel",
      description: "#umbhostCloudflarePurge_usermediapermissionsdescription",
      group: "UmbHost Cloudflare Purge",
    },
  }

export const manifests = [
    purgeContentTreeItems,
    purgeMediaTreeItems
];