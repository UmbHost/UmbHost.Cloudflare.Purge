export const UMBHOST_CLOUDFLARE_PURGE_IS_CONFIGURED_CONDITION = 'UmbHost.Cloudflare.Purge.Condition.IsConfigured';

export const manifests = [
    {
        type: 'condition',
        name: 'Cloudflare CDN Purge Is Configured Condition',
        alias: UMBHOST_CLOUDFLARE_PURGE_IS_CONFIGURED_CONDITION,
        api: () => import('./is-configured.condition'),
    },
];
