const settingsWorkspace = {
    type: 'workspace',
    kind: 'default',
    alias: "umbhost-cloudflare-purge-workspace",
    name: 'Cloudflare CDN Purge Settings Workspace',
    meta: {
        entityType: "umbhost-cloudflare-purge",
        headline: '#umbhostCloudflarePurge_workspacetitle',
    },
    conditions: [
        {
            alias: "Umb.Condition.SectionAlias",
            match: "Umb.Section.Settings"
        }
    ]
}

const settingsOverview = {
    "type": "workspaceView",
    "alias": "umbhost-cloudflare-purge-settings-overview",
    "name": "Cloudflare CDN Purge Settings Overview",
    element: () => import('./overview'),
    elementName: "umbhost-cloudflare-purge-settings-overview",
    "meta": {
        "label": "#umbhostCloudflarePurge_settingsoverview",
        "pathname": "overview",
        "icon": "icon-dashboard"
    },
    "conditions": [
        {
            "alias": "Umb.Condition.WorkspaceAlias",
            "match": "umbhost-cloudflare-purge-workspace"
        }
    ]
}

const settingsCaching = {
    "type": "workspaceView",
    "alias": "umbhost-cloudflare-purge-settings-caching",
    "name": "Cloudflare CDN Purge Settings Caching",
    element: () => import('./caching'),
    elementName: "umbhost-cloudflare-purge-settings-caching",
    "meta": {
        "label": "#umbhostCloudflarePurge_settingscaching",
        "pathname": "caching",
        "icon": "icon-cloud"
    },
    "conditions": [
        {
            "alias": "Umb.Condition.WorkspaceAlias",
            "match": "umbhost-cloudflare-purge-workspace"
        }
    ]
}

export const manifests = [
    settingsWorkspace,
    settingsOverview,
    settingsCaching
];