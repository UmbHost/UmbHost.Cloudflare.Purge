import { UMB_DOCUMENT_ENTITY_TYPE } from "@umbraco-cms/backoffice/document";
import { PurdeCdnEntityAction } from "./trees/purge-tree-entity.action"
import { UMB_MEDIA_ENTITY_TYPE } from "@umbraco-cms/backoffice/media";
import { UMB_SETTINGS_SECTION_ALIAS } from "@umbraco-cms/backoffice/settings";

const dashboardManifest = {
  type: 'dashboard',
  alias: 'umbhost-cloudflare-purge-dashboard',
  name: 'Cloudflare CDN Purge Dashboard',
  element: () => import('./dashboards/purge-dashboard'),
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
  forEntityTypes: [UMB_DOCUMENT_ENTITY_TYPE, UMB_MEDIA_ENTITY_TYPE],
  meta: {
    icon: 'icon-cloud',
    label: '#umbhostCloudflarePurge_entityactionlabel'
  },
};

const menu = {
  type: 'menu',
  alias: 'umbhost-cloudflare-purge-settings-menu',
  name: 'Cloudflare CDN Purge Settings Menu',
}

const settingsMenu = {
  type: 'sectionSidebarApp',
  kind: 'menu',
  alias: 'umbhost-cloudflare-purge-settings-sidebar-menu',
  name: 'Cloudflare CDN Purge Settings Menu',
  weight: -100,
  meta: {
    label: '#umbhostCloudflarePurge_cloudflare',
    menu: 'umbhost-cloudflare-purge-settings-menu',
  },
  conditions: [
    {
      alias: 'Umb.Condition.SectionAlias',
      match: UMB_SETTINGS_SECTION_ALIAS,
    },
  ],
}

const settingsMenuItem = {
  type: 'menuItem',
  alias: 'umbhost-cloudflare-purge-settings-menu-item',
  name: 'Cloudflare CDN Purge Settings Menu Item',
  // element: uSyncMenuElement,
  meta: {
    label: '#umbhostCloudflarePurge_settingsoverview',
    icon: 'icon-cloud',
    entityType: 'umbhost-cloudflare-purge/settings-root',
    menus: ['umbhost-cloudflare-purge-settings-menu'],
  },
};

const settingsWorkspace = {
  type: 'workspace',
  kind: 'default',
  alias: "umbhost-cloudflare-purge-workspace",
  name: 'Cloudflare CDN Purge Settings Workspace',
  meta: {
    entityType: "umbhost-cloudflare-purge",
    headline: '#umbhostCloudflarePurge_workspace',
  },
}

const settingsOverview = {
  "type": "workspaceView",
  "alias": "umbhost-cloudflare-purge-settings-overview",
  "name": "Cloudflare CDN Purge Settings Overview",
  element: () => import('./workspaces/overview'),
  elementName: "my-workspaceview",
  "meta": {
    "label": "My Workspace View",
    "pathname": "/settings-root",
    "icon": "icon-add"
  },
  "conditions": [
    {
      "alias": "Umb.Condition.WorkspaceAlias",
      "match": "umbhost-cloudflare-purge-workspace"
    }
  ]
}

const localization = {
  type: "localization",
  alias: "umbhost-cloudflare-purge-localize-en",
  name: "Cloudflare CDN Purge Localization",
  meta: {
    "culture": "en"
  },
  js: () => import('./localization/en')
};

export const manifests: Array<UmbExtensionManifest> = [
  dashboardManifest,
  localization,
  purgeCdnEntityActionManifest,
  menu,
  settingsMenu,
  settingsMenuItem,
  settingsWorkspace,
  settingsOverview
];