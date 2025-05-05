const dashboardManifest = {
  type: 'dashboard',
  alias: 'umbhost-cloudflare-purge-dashboard',
  name: 'Cloudflare CDN Purge Dashboard',
  element: () => import('./dashboard'),
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

const localization = {
    type: "localization",
    alias: "umbhost-cloudflare-purge-localize-en",
    name: "Cloudflare CDN Purge Localization",
    meta: {
      "culture": "en"
    },
    js : ()=> import('./localization/en')
};

export const manifests: Array<UmbExtensionManifest> = [
  dashboardManifest,
  localization,
];