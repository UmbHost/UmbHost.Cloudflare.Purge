import { UmbControllerBase } from '@umbraco-cms/backoffice/class-api';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import type { UmbTryExecuteOptions } from '@umbraco-cms/backoffice/resources';
import { UmbHostCloudflarePurgeServerDataSource } from './purge.server.data-source';
import type {
    CustomData,
    NodeData,
    GetCacheSettingsData,
    ToggleBrowserCacheTtlData,
    ToggleAlwaysOnlineData,
    ToggleDevelopmentModeData,
    ToggleCachingLevelData,
} from '../backend-api';

/** UI-ready zone model (mapped from the server `UmbHostCloudflarePurgeZone` DTO). */
export interface UmbHostCloudflarePurgeZoneOption {
    name: string;
    value: string;
}

/**
 * Repository layer for the UmbHost Cloudflare Purge management API.
 *
 * The entry point for data operations: UI elements, entity actions and the caching
 * workspace context consume this instead of the generated client directly. It owns
 * *what* operations exist; the data source owns *how* the data is fetched.
 */
export class UmbHostCloudflarePurgeRepository extends UmbControllerBase {
    #dataSource: UmbHostCloudflarePurgeServerDataSource;

    constructor(host: UmbControllerHost) {
        super(host);
        this.#dataSource = new UmbHostCloudflarePurgeServerDataSource(this);
    }

    purgeAll(opts?: UmbTryExecuteOptions) {
        return this.#dataSource.purgeAll(opts);
    }

    purgeCustom(body: CustomData, opts?: UmbTryExecuteOptions) {
        return this.#dataSource.purgeCustom(body, opts);
    }

    purgeNode(body: NodeData, opts?: UmbTryExecuteOptions) {
        return this.#dataSource.purgeNode(body, opts);
    }

    /** Returns the configured zones mapped to UI-ready options for selects. */
    async getZoneOptions(opts?: UmbTryExecuteOptions): Promise<{ data?: Array<UmbHostCloudflarePurgeZoneOption>; error?: unknown }> {
        const { data, error } = await this.#dataSource.getZones(opts);
        if (error) {
            return { error };
        }
        return {
            data: data?.map((zone) => ({ name: zone.domain, value: zone.zoneId })) ?? [],
        };
    }

    getBrowserTtlOptions(opts?: UmbTryExecuteOptions) {
        return this.#dataSource.getBrowserTtlOptions(opts);
    }

    /** Reports whether the package is configured (no secret values are returned). */
    getConfigurationStatus(opts?: UmbTryExecuteOptions) {
        return this.#dataSource.getConfigurationStatus(opts);
    }

    getCacheSettings(data: GetCacheSettingsData, opts?: UmbTryExecuteOptions) {
        return this.#dataSource.getCacheSettings(data, opts);
    }

    toggleBrowserCacheTtl(data: ToggleBrowserCacheTtlData, opts?: UmbTryExecuteOptions) {
        return this.#dataSource.toggleBrowserCacheTtl(data, opts);
    }

    toggleAlwaysOnline(data: ToggleAlwaysOnlineData, opts?: UmbTryExecuteOptions) {
        return this.#dataSource.toggleAlwaysOnline(data, opts);
    }

    toggleDevelopmentMode(data: ToggleDevelopmentModeData, opts?: UmbTryExecuteOptions) {
        return this.#dataSource.toggleDevelopmentMode(data, opts);
    }

    toggleCachingLevel(data: ToggleCachingLevelData, opts?: UmbTryExecuteOptions) {
        return this.#dataSource.toggleCachingLevel(data, opts);
    }
}

export { UmbHostCloudflarePurgeRepository as api };
