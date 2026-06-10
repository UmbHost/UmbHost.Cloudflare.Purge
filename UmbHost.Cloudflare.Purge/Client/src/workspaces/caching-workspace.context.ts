import { UmbContextBase } from '@umbraco-cms/backoffice/class-api';
import { UmbContextToken } from '@umbraco-cms/backoffice/context-api';
import { UmbObjectState } from '@umbraco-cms/backoffice/observable-api';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import { UmbHostCloudflarePurgeRepository } from '../repository/purge.repository';
import type { UmbHostCloudflarePurgeZoneOption } from '../repository/purge.repository';
import type { BrowserTtlOptionsResponse } from '../backend-api';

export type { UmbHostCloudflarePurgeZoneOption };

export interface UmbHostCloudflarePurgeCachingState {
    zones: Array<UmbHostCloudflarePurgeZoneOption>;
    zoneId?: string;
    firstLoad: boolean;
    loading: boolean;
    browserCacheTtlOptions?: BrowserTtlOptionsResponse;
    browserCacheTtlValue?: number;
    browserCacheTtlUpdated?: string;
    browserCacheTtlLoading: boolean;
    alwaysOnlineValue?: boolean;
    alwaysOnlineUpdated?: string;
    alwaysOnlineLoading: boolean;
    developerModeValue?: boolean;
    developerModeUpdated?: string;
    developerModeLoading: boolean;
    cachingLevelValue?: string;
    cachingLevelUpdated?: string;
    cachingLevelLoading: boolean;
}

const initialState: UmbHostCloudflarePurgeCachingState = {
    zones: [],
    firstLoad: true,
    loading: false,
    browserCacheTtlLoading: false,
    alwaysOnlineLoading: false,
    developerModeLoading: false,
    cachingLevelLoading: false,
};

/**
 * Workspace context that owns the Cloudflare caching settings for the selected zone.
 *
 * The caching workspace view consumes this context and observes its state instead of
 * loading data itself (it coordinates the repository + reactive state; the view is
 * presentation only).
 */
export class UmbHostCloudflarePurgeCachingContext extends UmbContextBase {
    #repository = new UmbHostCloudflarePurgeRepository(this);
    #state = new UmbObjectState<UmbHostCloudflarePurgeCachingState>(initialState);

    readonly zones = this.#state.asObservablePart((s) => s.zones);
    readonly zoneId = this.#state.asObservablePart((s) => s.zoneId);
    readonly firstLoad = this.#state.asObservablePart((s) => s.firstLoad);
    readonly loading = this.#state.asObservablePart((s) => s.loading);
    readonly browserCacheTtlOptions = this.#state.asObservablePart((s) => s.browserCacheTtlOptions);
    readonly browserCacheTtlValue = this.#state.asObservablePart((s) => s.browserCacheTtlValue);
    readonly browserCacheTtlUpdated = this.#state.asObservablePart((s) => s.browserCacheTtlUpdated);
    readonly browserCacheTtlLoading = this.#state.asObservablePart((s) => s.browserCacheTtlLoading);
    readonly alwaysOnlineValue = this.#state.asObservablePart((s) => s.alwaysOnlineValue);
    readonly alwaysOnlineUpdated = this.#state.asObservablePart((s) => s.alwaysOnlineUpdated);
    readonly alwaysOnlineLoading = this.#state.asObservablePart((s) => s.alwaysOnlineLoading);
    readonly developerModeValue = this.#state.asObservablePart((s) => s.developerModeValue);
    readonly developerModeUpdated = this.#state.asObservablePart((s) => s.developerModeUpdated);
    readonly developerModeLoading = this.#state.asObservablePart((s) => s.developerModeLoading);
    readonly cachingLevelValue = this.#state.asObservablePart((s) => s.cachingLevelValue);
    readonly cachingLevelUpdated = this.#state.asObservablePart((s) => s.cachingLevelUpdated);
    readonly cachingLevelLoading = this.#state.asObservablePart((s) => s.cachingLevelLoading);

    constructor(host: UmbControllerHost) {
        super(host, UMB_HOST_CLOUDFLARE_PURGE_CACHING_CONTEXT);
        this.loadZones();
    }

    async loadZones() {
        const { data } = await this.#repository.getZoneOptions();
        this.#state.update({ zones: data ?? [] });
    }

    async selectZone(zoneId: string) {
        if (!zoneId) return;

        this.#state.update({ firstLoad: false, loading: true, zoneId });
        try {
            const [ttlOptions, cacheSettings] = await Promise.all([
                this.#repository.getBrowserTtlOptions(),
                this.#repository.getCacheSettings({ zoneId }),
            ]);

            const settings = cacheSettings.data;
            this.#state.update({
                browserCacheTtlOptions: ttlOptions.data,
                browserCacheTtlValue: settings?.browserCacheTtl?.value !== undefined ? Number(settings.browserCacheTtl.value) : undefined,
                browserCacheTtlUpdated: this.#formatDate(settings?.browserCacheTtl?.modified_on),
                alwaysOnlineValue: settings?.alwaysOnline?.value.toLowerCase() === 'on',
                alwaysOnlineUpdated: this.#formatDate(settings?.alwaysOnline?.modified_on),
                developerModeValue: settings?.developmentMode?.value.toLowerCase() === 'on',
                developerModeUpdated: this.#formatDate(settings?.developmentMode?.modified_on),
                cachingLevelValue: settings?.cacheLevel?.value.toLowerCase(),
                cachingLevelUpdated: this.#formatDate(settings?.cacheLevel?.modified_on),
            });
        } finally {
            this.#state.update({ loading: false });
        }
    }

    async toggleBrowserCacheTtl(value: number) {
        this.#state.update({ browserCacheTtlLoading: true });
        try {
            const { data, error } = await this.#repository.toggleBrowserCacheTtl({ zoneId: this.#state.getValue().zoneId, requestBody: { value } });
            if (!error && data) {
                this.#state.update({
                    browserCacheTtlValue: Number(data.value),
                    browserCacheTtlUpdated: this.#formatDate(data.modified_on),
                });
            }
        } finally {
            this.#state.update({ browserCacheTtlLoading: false });
        }
    }

    async toggleAlwaysOnline(checked: boolean) {
        this.#state.update({ alwaysOnlineLoading: true });
        try {
            const { data, error } = await this.#repository.toggleAlwaysOnline({ zoneId: this.#state.getValue().zoneId, requestBody: { value: checked ? 'on' : 'off' } });
            if (!error && data) {
                this.#state.update({
                    alwaysOnlineValue: data.value.toLowerCase() === 'on',
                    alwaysOnlineUpdated: this.#formatDate(data.modified_on),
                });
            }
        } finally {
            this.#state.update({ alwaysOnlineLoading: false });
        }
    }

    async toggleDevelopmentMode(checked: boolean) {
        this.#state.update({ developerModeLoading: true });
        try {
            const { data, error } = await this.#repository.toggleDevelopmentMode({ zoneId: this.#state.getValue().zoneId, requestBody: { value: checked ? 'on' : 'off' } });
            if (!error && data) {
                this.#state.update({
                    developerModeValue: data.value.toLowerCase() === 'on',
                    developerModeUpdated: this.#formatDate(data.modified_on),
                });
            }
        } finally {
            this.#state.update({ developerModeLoading: false });
        }
    }

    async toggleCachingLevel(value: string) {
        this.#state.update({ cachingLevelLoading: true });
        try {
            const { data, error } = await this.#repository.toggleCachingLevel({ zoneId: this.#state.getValue().zoneId, requestBody: { value } });
            if (!error && data) {
                this.#state.update({
                    cachingLevelValue: data.value.toLowerCase(),
                    cachingLevelUpdated: this.#formatDate(data.modified_on),
                });
            }
        } finally {
            this.#state.update({ cachingLevelLoading: false });
        }
    }

    #formatDate(value?: string | null): string | undefined {
        return value ? new Date(value).toLocaleString() : undefined;
    }

    override destroy(): void {
        this.#state.destroy();
        super.destroy();
    }
}

export const UMB_HOST_CLOUDFLARE_PURGE_CACHING_CONTEXT = new UmbContextToken<UmbHostCloudflarePurgeCachingContext>(
    'UmbHost.CloudflarePurge.CachingContext',
);

export { UmbHostCloudflarePurgeCachingContext as api };
