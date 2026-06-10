import { html, customElement, css, state, nothing } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { BrowserTtlOptionsResponse, ToggleBrowserCacheTtlData, ToggleAlwaysOnlineData, ToggleDevelopmentModeData, ToggleCachingLevelData, GetCacheSettingsData } from "../backend-api"
import { UmbInputRadioButtonListElement, UmbInputToggleElement } from "@umbraco-cms/backoffice/components";
import { UmbChangeEvent } from "@umbraco-cms/backoffice/event";
import { UmbHostCloudflarePurgeRepository } from "../repository/purge.repository";

@customElement('umbhost-cloudflare-purge-settings-caching')
export default class UmbHostCloudflarePurgeCachingViewElement extends UmbLitElement {

	#repository = new UmbHostCloudflarePurgeRepository(this);

	@state()
	private firstLoad?: boolean = true;

	@state()
	private loading?: boolean = false;

	@state()
	private zones?: any[] = [];

	@state()
	private zoneId?: string = undefined;

	@state()
	private browserCacheTtlLoading?: boolean = false;

	@state()
	private alwaysOnlineLoading?: boolean = false;

	@state()
	private developerModeLoading?: boolean = false;

	@state()
	private cachingLevelLoading?: boolean = false;

	@state()
	private browserCacheTtlOptions: BrowserTtlOptionsResponse | undefined;

	@state()
	private browserCacheTtlValue: number | undefined;

	@state()
	private browserCacheTtlUpdated?: string | undefined;

	@state()
	private alwaysOnlineUpdated?: string | undefined;

	@state()
	private alwaysOnlineValue: boolean | undefined;

	@state()
	private developerModeUpdated?: string | undefined;

	@state()
	private developerModeValue: boolean | undefined;

	@state()
	private cachingLevelUpdated?: string | undefined;

	@state()
	private cachingLevelValue: string | undefined;

	private cachingLevelOptions = [
		{
			"label": this.localize.term("umbhostCloudflarePurge_cachinglevelbasic"),
			"value": "basic"
		},
		{
			"label": this.localize.term("umbhostCloudflarePurge_cachinglevelsimplified"),
			"value": "simplified"
		},
		{
			"label": this.localize.term("umbhostCloudflarePurge_cachinglevelaggressive"),
			"value": "aggressive",
		}
	];

	updated(changedProps: Map<string, any>) {
		super.updated(changedProps);

		if (changedProps.has('browserCacheTtlValue') && this.browserCacheTtlOptions) {
			const value = this.browserCacheTtlValue;
			this.browserCacheTtlOptions = this.browserCacheTtlOptions.map(option => ({
				...option,
				selected: option.value === value
			}));
		}
	}

	async #onBrowserTtlSelect(event: Event) {
		const select = event.target as HTMLSelectElement;
		const selectedOption = this.browserCacheTtlOptions?.find(option => option.value === Number(select.value));
		if (!selectedOption) return;

		this.browserCacheTtlLoading = true;
		const requestData: ToggleBrowserCacheTtlData = {
			zoneId: this.zoneId,
			requestBody: {
				value: selectedOption.value
			}
		};

		try {
			const { data, error } = await this.#repository.toggleBrowserCacheTtl(requestData);
			if (!error && data) {
				this.browserCacheTtlValue = Number(data.value);
				this.browserCacheTtlUpdated = data.modified_on ? new Date(data.modified_on).toLocaleString() : undefined;
			}
		} finally {
			this.browserCacheTtlLoading = false;
			this.dispatchEvent(new UmbChangeEvent());
		}
	}

	async #onAlwaysOnlineToggle(event: CustomEvent & { target: UmbInputToggleElement }) {
		this.alwaysOnlineLoading = true;
		const checked = event.target.checked;
		const requestData: ToggleAlwaysOnlineData = {
			zoneId: this.zoneId,
			requestBody: {
				value: checked ? "on" : "off"
			}
		};

		try {
			const { data, error } = await this.#repository.toggleAlwaysOnline(requestData);
			if (!error && data) {
				this.alwaysOnlineValue = data.value.toLowerCase() === "on";
				this.alwaysOnlineUpdated = data.modified_on ? new Date(data.modified_on).toLocaleString() : undefined;
			}
		} finally {
			this.alwaysOnlineLoading = false;
			this.dispatchEvent(new UmbChangeEvent());
		}
	}

	async #onDeveloperModeToggle(event: CustomEvent & { target: UmbInputToggleElement }) {
		this.developerModeLoading = true;
		const checked = event.target.checked;
		const requestData: ToggleDevelopmentModeData = {
			zoneId: this.zoneId,
			requestBody: {
				value: checked ? "on" : "off"
			}
		};

		try {
			const { data, error } = await this.#repository.toggleDevelopmentMode(requestData);
			if (!error && data) {
				this.developerModeValue = data.value.toLowerCase() === "on";
				this.developerModeUpdated = data.modified_on ? new Date(data.modified_on).toLocaleString() : undefined;
			}
		} finally {
			this.developerModeLoading = false;
			this.dispatchEvent(new UmbChangeEvent());
		}
	}

	async #onCachingLevelToggle(event: CustomEvent & { target: UmbInputRadioButtonListElement }) {
		this.cachingLevelLoading = true;
		const requestData: ToggleCachingLevelData = {
			zoneId: this.zoneId,
			requestBody: {
				value: event.target.value
			}
		};

		try {
			const { data, error } = await this.#repository.toggleCachingLevel(requestData);
			if (!error && data) {
				this.cachingLevelValue = data.value.toLowerCase();
				this.cachingLevelUpdated = data.modified_on ? new Date(data.modified_on).toLocaleString() : undefined;
			}
		} finally {
			this.cachingLevelLoading = false;
			this.dispatchEvent(new UmbChangeEvent());
		}
	}

	async #getZoneSettings(event: Event) {
		const select = event.target as HTMLSelectElement;
		if (!select.value) return;

		this.firstLoad = false;
		this.loading = true;
		this.zoneId = select.value;

		try {
			const settingsRequest: GetCacheSettingsData = {
				zoneId: select.value
			};
			const [ttlOptions, cacheSettings] = await Promise.all([
				this.#repository.getBrowserTtlOptions(),
				this.#repository.getCacheSettings(settingsRequest)
			]);

			if (ttlOptions.data) {
				this.browserCacheTtlOptions = ttlOptions.data;
			}

			const settings = cacheSettings.data;
			if (settings) {
				this.browserCacheTtlValue = settings.browserCacheTtl?.value !== undefined ? Number(settings.browserCacheTtl.value) : undefined;
				this.browserCacheTtlUpdated = settings.browserCacheTtl?.modified_on
					? new Date(settings.browserCacheTtl.modified_on).toLocaleString()
					: undefined;
				this.alwaysOnlineValue = settings.alwaysOnline?.value.toLowerCase() === "on";
				this.alwaysOnlineUpdated = settings.alwaysOnline?.modified_on
					? new Date(settings.alwaysOnline.modified_on).toLocaleString()
					: undefined;
				this.developerModeValue = settings.developmentMode?.value.toLowerCase() === "on";
				this.developerModeUpdated = settings.developmentMode?.modified_on
					? new Date(settings.developmentMode.modified_on).toLocaleString()
					: undefined;
				this.cachingLevelUpdated = settings.cacheLevel?.modified_on
					? new Date(settings.cacheLevel.modified_on).toLocaleString()
					: undefined;
				this.cachingLevelValue = settings.cacheLevel?.value.toLowerCase();
			}
		} finally {
			this.loading = false;
		}
	}

	connectedCallback() {
		super.connectedCallback();

		this.loadData();
	}

	private async loadData() {
		const { data } = await this.#repository.getZones();
		this.zones = data?.map((zone: any) => ({
			name: zone.domain,
			value: zone.zoneId
		}));
	}

    render() {
        return html`
		<section id="umbhost-cloudflare-purdge-caching">
			<uui-box class="introduction" headline=${this.localize.term("umbhostCloudflarePurge_cachingtitle")}>
				<p><umb-localize key="umbhostCloudflarePurge_cachingintroduction"></umb-localize></p>

					<uui-label for="zone">${this.localize.term("umbhostCloudflarePurge_selectdomain")}: </uui-label>
					<uui-select id="zone"
					required=""
						label=${this.localize.term("umbhostCloudflarePurge_selectdomain")}
						placeholder=${this.localize.term("umbhostCloudflarePurge_selectanoption")}
						.options=${(this.zones ?? []) as any}
						@change=${this.#getZoneSettings}
						>
					</uui-select>
			</uui-box>

		${this.firstLoad ? nothing : html`
			${this.loading ? html`<uui-loader-circle></uui-loader-circle>` : nothing}

			${this.loading ? nothing : html`
			<uui-box headline=${this.localize.term("umbhostCloudflarePurge_developermodetitle")}>
				${this.developerModeLoading ? html`<uui-loader></uui-loader>` : nothing}
				${this.developerModeLoading ? nothing : html`
				<div class="description">
					<umb-localize key="umbhostCloudflarePurge_developermodedescription"></umb-localize>
					<p class="alert alert-warning">
						<umb-localize key="umbhostCloudflarePurge_developermodewarning"></umb-localize>
					</p>
				</div>
				<umb-input-toggle showLabels @change=${this.#onDeveloperModeToggle} ?checked=${this.developerModeValue} labelOn=${this.localize.term("umbhostCloudflarePurge_developermodetoggleon")} labelOff=${this.localize.term("umbhostCloudflarePurge_developermodetoggleoff")}></umb-input-toggle>
				<div class="lastmodified">
					<small>
						<strong>
							<umb-localize key="umbhostCloudflarePurge_lastmodified"></umb-localize>:
						</strong>
						${this.developerModeUpdated ? this.developerModeUpdated : nothing}
					</small>
				</div>
				`}
			</uui-box>

			<uui-box headline=${this.localize.term("umbhostCloudflarePurge_cachingleveltitle")}>
				${this.cachingLevelLoading ? html`<uui-loader></uui-loader>` : nothing}
				${this.cachingLevelLoading ? nothing : html`
				<div class="description">
					<umb-localize key="umbhostCloudflarePurge_cachingleveldescription"></umb-localize>
				</div>
				<umb-input-radio-button-list .list=${this.cachingLevelOptions} .value=${this.cachingLevelValue ?? ''} @change=${this.#onCachingLevelToggle} ></umb-input-radio-button-list>
				<div class="lastmodified">
					<small>
						<strong>
							<umb-localize key="umbhostCloudflarePurge_lastmodified"></umb-localize>:
						</strong>
						${this.cachingLevelUpdated ? this.cachingLevelUpdated : nothing}
					</small>
				</div>
				`}
			</uui-box>

			<uui-box headline=${this.localize.term("umbhostCloudflarePurge_browsercachettltitle")}>
				${this.browserCacheTtlLoading ? html`<uui-loader></uui-loader>` : nothing}
				${this.browserCacheTtlLoading ? nothing : html`
					<div class="description">
						<umb-localize key="umbhostCloudflarePurge_browsercachettldescription"></umb-localize>
					</div>
					<uui-select id="browserCacheTtl"
						label=${this.localize.term("umbhostCloudflarePurge_browsercachettltitle")}
						placeholder=${this.localize.term("umbhostCloudflarePurge_selectanoption")}
						.options=${(this.browserCacheTtlOptions ?? []) as any}
						@change=${this.#onBrowserTtlSelect} >
					</uui-select>
					<div class="lastmodified">
						<small>
							<strong>
								<umb-localize key="umbhostCloudflarePurge_lastmodified"></umb-localize>:
							</strong>
							${this.browserCacheTtlUpdated ? this.browserCacheTtlUpdated : nothing}
						</small>
					</div>
				`}
			</uui-box>


			<uui-box headline=${this.localize.term("umbhostCloudflarePurge_alwaysonlinetitle")}>
				${this.alwaysOnlineLoading ? html`<uui-loader></uui-loader>` : nothing}
				${this.alwaysOnlineLoading ? nothing : html`
				<div class="description">
					<umb-localize key="umbhostCloudflarePurge_alwaysonlinedescription"></umb-localize>
				</div>
				<div class="description">
					<umb-localize key="umbhostCloudflarePurge_alwaysonlineterms"></umb-localize>
				</div>
				<umb-input-toggle @change=${this.#onAlwaysOnlineToggle} ?checked=${this.alwaysOnlineValue}  showLabels labelOn=${this.localize.term("umbhostCloudflarePurge_alwaysonlinetoggleon")} labelOff=${this.localize.term("umbhostCloudflarePurge_alwaysonlinetoggleoff")}></umb-input-toggle>
				<div class="lastmodified">
					<small>
						<strong>
							<umb-localize key="umbhostCloudflarePurge_lastmodified"></umb-localize>:
						</strong>
						${this.alwaysOnlineUpdated ? this.alwaysOnlineUpdated : nothing}
					</small>
				</div>
				`}
			</uui-box>`}
		`}
		</section>
    `
    }

	static styles = css`

	uui-loader-circle {
		display: block;
		text-align: center;
		margin: 0 auto;
		padding-top: var(--uui-size-10);
		font-size: 2em;
	}

			uui-box {
				p:first-child {
					margin-top: 0;
				}
			}

			#umbhost-cloudflare-purdge-caching {
				padding: var(--uui-size-layout-1);
			}

			uui-box:not(:last-of-type) {
				margin-bottom: var(--uui-size-layout-1);
			}

			.description:not(:has(.alert)) {
				padding-bottom: var(--uui-size-6);
			}

			.lastmodified {
				padding-top: var(--uui-size-3);
			}

			.alert {
				border: 1px solid transparent;
				border-radius: 0;
				margin-bottom: 20px;
				padding: 8px 35px 8px 14px;
				position: relative;
			}
			.alert-warning {
				background-color: #f0ac00;
				border-color: transparent;
				color: #fff;
			}
  `
}

declare global {
    interface HTMLElementTagNameMap {
        'umbhost-cloudflare-purge-settings-caching': UmbHostCloudflarePurgeCachingViewElement
    }
}
