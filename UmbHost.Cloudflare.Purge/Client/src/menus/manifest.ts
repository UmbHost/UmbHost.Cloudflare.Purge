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

const overviewMenuItem = {
    type: 'menuItem',
    alias: 'umbhost-cloudflare-purge-settings-overview-menu-item',
    name: 'Cloudflare CDN Purge Settings Overview Menu Item',
    meta: {
        label: '#umbhostCloudflarePurge_settingsoverview',
        icon: 'icon-dashboard',
        entityType: 'umbhost-cloudflare-purge/overview',
        menus: ['umbhost-cloudflare-purge-settings-menu'],
    },
};

const cachingMenuItem = {
    type: 'menuItem',
    alias: 'umbhost-cloudflare-purge-settings-caching-menu-item',
    name: 'Cloudflare CDN Purge Settings Caching Menu Item',
    meta: {
        label: '#umbhostCloudflarePurge_settingscaching',
        icon: 'icon-cloud',
        entityType: 'umbhost-cloudflare-purge/view/caching',
        menus: ['umbhost-cloudflare-purge-settings-menu'],
    },
};

export const manifests = [
    menu,
    settingsMenu,
    overviewMenuItem,
    cachingMenuItem
];