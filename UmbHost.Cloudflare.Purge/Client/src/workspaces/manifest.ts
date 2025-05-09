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
    element: () => import('./overview'),
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

export const manifests = [
    settingsWorkspace,
    settingsOverview
];