import { UMB_DOCUMENT_ENTITY_TYPE } from '@umbraco-cms/backoffice/document';

const dashboardManifest = {
    type: 'dashboard',
    alias: 'umbhost-cloudflare-purge-dashboard',
    name: 'Cloudflare CDN Purge Dashboard',
    element: () => import('./purge-dashboard'),
    elementName: "umbhost-cloudflare-purge-dashboard",
    forEntityTypes: [UMB_DOCUMENT_ENTITY_TYPE],
    weight: 15,
    meta: {
        label: "Cloudflare CDN Purge Dashboard",
        pathname: "umbhost-cloudflare-purge-dashboard"
    },
    conditions: [
        {
            alias: "Umb.Condition.SectionAlias",
            match: "Umb.Section.Content"
        },
        {
            alias: "Umb.Condition.CurrentUser.GroupId",
            oneOf: ["74faa29d-d43d-44bf-b3df-e02e8b38e08f"]
        }
    ]
};

export const manifests = [
    dashboardManifest
];