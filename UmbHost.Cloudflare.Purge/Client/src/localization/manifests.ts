const localization = {
    type: "localization",
    alias: "umbhost-cloudflare-purge-localize-en",
    name: "Cloudflare CDN Purge Localization",
    meta: {
        "culture": "en"
    },
    js: () => import('./en')
};

export const manifests = [
    localization
];