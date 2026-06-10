import { UMBHOST_CLOUDFLARE_PURGE_REPOSITORY_ALIAS } from './constants';

const repository = {
    type: 'repository',
    alias: UMBHOST_CLOUDFLARE_PURGE_REPOSITORY_ALIAS,
    name: 'UmbHost Cloudflare Purge Repository',
    api: () => import('./purge.repository'),
};

export const manifests = [
    repository,
];
