import { LitElement, html, customElement, css, state, nothing } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { BrowserTtlOptionsResponse, V1Resource, ToggleBrowserCacheTtlData, ToggleAlwaysOnlineData, ToggleDevelopmentModeData, ToggleCachingLevelData, GetZonesResponse, GetCacheSettingsData } from "../backend-api"
import { UmbInputRadioButtonListElement, UmbInputToggleElement } from "@umbraco-cms/backoffice/components";
import { UmbChangeEvent } from "@umbraco-cms/backoffice/event";

@customElement('umbhost-cloudflare-purge-settings-caching')
export default class UmbHostCloudflarePurgeCachingViewElement extends UmbElementMixin(LitElement) {

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

	#onBrowserTtlSelect(event: Event) {

		this.browserCacheTtlLoading = true;
		const select = event.target as HTMLSelectElement;
		const selectedOption = this.browserCacheTtlOptions?.find(option => option.value === Number(select.value));
		if (selectedOption) {
			const ToggleBrowserCacheTtlData: ToggleBrowserCacheTtlData = {
				zoneId: this.zoneId,
				requestBody: {
					value: selectedOption.value
				}
			};

			V1Resource.toggleBrowserCacheTtl(ToggleBrowserCacheTtlData).then((data) => {
				this.browserCacheTtlValue = Number(data.value);
				this.browserCacheTtlUpdated = data.modified_on ? new Date(data.modified_on).toLocaleString() : undefined;
			})
			.finally(() => {
				this.browserCacheTtlLoading = false;
				this.dispatchEvent(new UmbChangeEvent());
			});
		}
	}

	#onAlwaysOnlineToggle(event: CustomEvent & { target: UmbInputToggleElement }) {
		this.alwaysOnlineLoading = true;
		const checked = event.target.checked;
		const ToggleAlwaysOnlineData: ToggleAlwaysOnlineData = {
			zoneId: this.zoneId,
			requestBody: {
				value: checked ? "on" : "off"
			}
		};

		V1Resource.toggleAlwaysOnline(ToggleAlwaysOnlineData).then((data) => {
			this.alwaysOnlineValue = data.value.toLowerCase() === "on" ? true : false;;
			this.alwaysOnlineUpdated = data.modified_on ? new Date(data.modified_on).toLocaleString() : undefined;
		})
		.finally(() => {
			this.alwaysOnlineLoading = false;
			this.dispatchEvent(new UmbChangeEvent());
		});
	}

	#onDeveloperModeToggle(event: CustomEvent & { target: UmbInputToggleElement }) {
		this.developerModeLoading = true;
		const checked = event.target.checked;
		const ToggleDevelopmentModeData: ToggleDevelopmentModeData = {
			zoneId: this.zoneId,
			requestBody: {
				value: checked ? "on" : "off"
			}
		};

		V1Resource.toggleDevelopmentMode(ToggleDevelopmentModeData).then((data) => {
			this.developerModeValue = data.value.toLowerCase() === "on" ? true : false;
			this.developerModeUpdated = data.modified_on ? new Date(data.modified_on).toLocaleString() : undefined;
		})
		.finally(() => {
			this.developerModeLoading = false;
			this.dispatchEvent(new UmbChangeEvent());
		});
	}

	#onCachingLevelToggle(event: CustomEvent & { target: UmbInputRadioButtonListElement }) {
		this.cachingLevelLoading = true;
		const ToggleCachingLevelData: ToggleCachingLevelData = {
			zoneId: this.zoneId,
			requestBody: {
				value: event.target.value
			}
		};

		V1Resource.toggleCachingLevel(ToggleCachingLevelData).then((data) => {
			this.cachingLevelValue = data?.value.toLowerCase();
			this.cachingLevelUpdated = data.modified_on ? new Date(data.modified_on).toLocaleString() : undefined;
		})
		.finally(() => {
			this.cachingLevelLoading = false;
			this.dispatchEvent(new UmbChangeEvent());
		});
	}

	async #getZoneSettings(event: Event) {
			try {
				const select = event.target as HTMLSelectElement;
			if (select.value) {
			this.firstLoad = false;
			this.loading = true;
			this.zoneId = select.value;
			var data : GetCacheSettingsData = {
				zoneId: select.value
			}
			const [ttlOptions, cacheSettings] = await Promise.all([
			V1Resource.browserTtlOptions(),
			V1Resource.getCacheSettings(data)
			]);

			this.browserCacheTtlOptions = ttlOptions;
			this.browserCacheTtlValue = cacheSettings.browserCacheTtl?.value !== undefined ? Number(cacheSettings.browserCacheTtl.value) : undefined;
			this.browserCacheTtlUpdated = cacheSettings.browserCacheTtl?.modified_on
				? new Date(cacheSettings.browserCacheTtl.modified_on).toLocaleString()
				: undefined;
			this.alwaysOnlineValue = cacheSettings.alwaysOnline?.value.toLowerCase() === "on" ? true : false;
			this.alwaysOnlineUpdated = cacheSettings.alwaysOnline?.modified_on 
				? new Date(cacheSettings.alwaysOnline.modified_on).toLocaleString() 
				: undefined;
			this.developerModeValue = cacheSettings.developmentMode?.value.toLowerCase() === "on" ? true : false;
			this.developerModeUpdated = cacheSettings.developmentMode?.modified_on 
				? new Date(cacheSettings.developmentMode.modified_on).toLocaleString() 
				: undefined;
			this.cachingLevelUpdated = cacheSettings.cacheLevel?.modified_on 
				? new Date(cacheSettings.cacheLevel.modified_on).toLocaleString() 
				: undefined;
			this.cachingLevelValue = cacheSettings.cacheLevel?.value.toLowerCase();
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

	const zones = await V1Resource.getZones();
			this.zones = zones?.map((zone: any) => ({
				name: zone.domain,
				value: zone.zoneId
			}));
	}

    render() {
        return html`
		<section id="umbhost-cloudflare-purdge-caching">
			<uui-box class="introduction" headline=${this.localize.term("umbhostCloudflarePurge_cachingtitle")}>
				<p><umb-localize key="umbhostCloudflarePurge_cachingintroduction"></umb-localize></p>
				
					<uui-label for="zone">Select Domain: </uui-label>
					<uui-select id="zone"
					required="" 
						placeholder="Select an option"
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
						placeholder="Select an option" 
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
