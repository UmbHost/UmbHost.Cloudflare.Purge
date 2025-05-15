const dashboardManifest = {
    type: 'dashboard',
    alias: 'umbhost-cloudflare-purge-dashboard',
    name: 'Cloudflare CDN Purge Dashboard',
    element: () => import('./purge-dashboard'),
    elementName: "umbhost-cloudflare-purge-dashboard",
    weight: 15,
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

export const manifests = [
    dashboardManifest
];