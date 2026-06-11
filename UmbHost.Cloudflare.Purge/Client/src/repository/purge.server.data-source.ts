import { UmbControllerBase } from '@umbraco-cms/backoffice/class-api';
import { tryExecute } from '@umbraco-cms/backoffice/resources';
import type { UmbTryExecuteOptions } from '@umbraco-cms/backoffice/resources';
import {
    V1Resource,
    type CustomData,
    type NodeData,
    type GetCacheSettingsData,
    type ToggleBrowserCacheTtlData,
    type ToggleAlwaysOnlineData,
    type ToggleDevelopmentModeData,
    type ToggleCachingLevelData,
} from '../backend-api';

/**
 * Data source for the UmbHost Cloudflare Purge management API.
 *
 * This is the only place that talks to the generated OpenAPI client (`V1Resource`).
 * Every call is routed through `tryExecute`, which surfaces failures as backoffice
 * notifications by default; callers that show their own contextual messages pass
 * `disableNotifications: true`.
 */
export class UmbHostCloudflarePurgeServerDataSource extends UmbControllerBase {
    async #run<T>(promise: Promise<T>, opts?: UmbTryExecuteOptions): Promise<{ data?: T; error?: unknown }> {
        const response = await tryExecute(this, promise, opts);
        // On success tryExecute returns the raw payload (which is `undefined` for the
        // 202/no-body purge endpoints); on failure it returns `{ error }`.
        const error = (response as { error?: unknown } | undefined)?.error;
        if (error) {
            return { error };
        }
        return { data: response as T };
    }

    purgeAll(opts?: UmbTryExecuteOptions) {
        return this.#run(V1Resource.all(), opts);
    }

    purgeCustom(body: CustomData, opts?: UmbTryExecuteOptions) {
        return this.#run(V1Resource.custom(body), opts);
    }

    purgeNode(body: NodeData, opts?: UmbTryExecuteOptions) {
        return this.#run(V1Resource.node(body), opts);
    }

    getZones(opts?: UmbTryExecuteOptions) {
        return this.#run(V1Resource.getZones(), opts);
    }

    getConfigurationStatus(opts?: UmbTryExecuteOptions) {
        return this.#run(V1Resource.getConfigurationStatus(), opts);
    }

    getBrowserTtlOptions(opts?: UmbTryExecuteOptions) {
        return this.#run(V1Resource.browserTtlOptions(), opts);
    }

    getCacheSettings(data: GetCacheSettingsData, opts?: UmbTryExecuteOptions) {
        return this.#run(V1Resource.getCacheSettings(data), opts);
    }

    toggleBrowserCacheTtl(data: ToggleBrowserCacheTtlData, opts?: UmbTryExecuteOptions) {
        return this.#run(V1Resource.toggleBrowserCacheTtl(data), opts);
    }

    toggleAlwaysOnline(data: ToggleAlwaysOnlineData, opts?: UmbTryExecuteOptions) {
        return this.#run(V1Resource.toggleAlwaysOnline(data), opts);
    }

    toggleDevelopmentMode(data: ToggleDevelopmentModeData, opts?: UmbTryExecuteOptions) {
        return this.#run(V1Resource.toggleDevelopmentMode(data), opts);
    }

    toggleCachingLevel(data: ToggleCachingLevelData, opts?: UmbTryExecuteOptions) {
        return this.#run(V1Resource.toggleCachingLevel(data), opts);
    }
}
