import { UMB_SETTINGS_SECTION_ALIAS } from "@umbraco-cms/backoffice/settings";

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

export const manifests = [
    menu,
    settingsMenu,
    settingsMenuItem
];