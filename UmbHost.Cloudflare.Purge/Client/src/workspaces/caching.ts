import { LitElement, html, customElement, css, state, nothing } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { AllSettings, BrowserTtlOptionsResponse, V1Resource, ToggleBrowserCacheTtlData } from "../backend-api"

@customElement('umbhost-cloudflare-purge-settings-caching')
export default class UmbHostCloudflarePurgeCachingViewElement extends UmbElementMixin(LitElement) {

	@state()
	private loading?: boolean = true;

	@state()
	private browserCacheTtlLoading?: boolean = false;

	@state()
	private cacheSettings: AllSettings | undefined;

	@state()
	private browserCacheTtlOptions: BrowserTtlOptionsResponse | undefined;

	@state()
	private browserCacheTtlValue: number | undefined;

	@state()
	private browserCacheTtlUpdated?: string | undefined;

	private cachingLevelOptions = [
		{
			"label": this.localize.term("umbhostCloudflarePurge_cachinglevelbasic"),
			"value": "Basic"
		},
		{
			"label": this.localize.term("umbhostCloudflarePurge_cachinglevelsimplified"),
			"value": "Simplified"
		},
		{
			"label": this.localize.term("umbhostCloudflarePurge_cachinglevelaggressive"),
			"value": "Aggressive",
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
				requestBody: {
					value: selectedOption.value
				}
			};

			V1Resource.toggleBrowserCacheTtl(ToggleBrowserCacheTtlData).then((data) => {
				this.browserCacheTtlValue = Number(data.value);
				this.browserCacheTtlUpdated = data.modified_on ?? undefined;
			})
			.finally(() => {
				this.browserCacheTtlLoading = false;
			});
		}
	}

	connectedCallback() {
		super.connectedCallback();

		this.loadData();
	}

	private async loadData() {
	this.loading = true;

	try {
			const [ttlOptions, cacheSettings] = await Promise.all([
			V1Resource.browserTtlOptions(),
			V1Resource.getCacheSettings()
			]);

			this.browserCacheTtlOptions = ttlOptions;
			this.browserCacheTtlValue = cacheSettings.browserCacheTtl?.value !== undefined ? Number(cacheSettings.browserCacheTtl.value) : undefined;
			this.browserCacheTtlUpdated = cacheSettings.browserCacheTtl?.modified_on ?? undefined;
			this.cacheSettings = cacheSettings;
		} finally {
			this.loading = false;
		}
	}

    render() {
        return html`
		<section id="umbhost-cloudflare-purdge-caching">
			<uui-box class="introduction" headline=${this.localize.term("umbhostCloudflarePurge_cachingtitle")}>
				<umb-localize key="umbhostCloudflarePurge_cachingintroduction"></umb-localize>
			</uui-box>  

			${this.loading ? html`<uui-loader-circle></uui-loader-circle>` : nothing}

			${this.loading ? nothing : html`
			<uui-box headline=${this.localize.term("umbhostCloudflarePurge_developermodetitle")}>
				<div class="description">
					<umb-localize key="umbhostCloudflarePurge_developermodedescription"></umb-localize>
					<p class="alert alert-warning">
						<umb-localize key="umbhostCloudflarePurge_developermodewarning"></umb-localize>
					</p>
				</div>
				<umb-input-toggle showLabels ?checked=${this.cacheSettings?.developmentMode?.value.toLowerCase() === "on"} labelOn=${this.localize.term("umbhostCloudflarePurge_developermodetoggleon")} labelOff=${this.localize.term("umbhostCloudflarePurge_developermodetoggleoff")}></umb-input-toggle>
				<div class="lastmodified">
					<small>
						<strong>
							<umb-localize key="umbhostCloudflarePurge_lastmodified"></umb-localize>:
						</strong> 
						${this.cacheSettings?.developmentMode?.modified_on ? new Date(this.cacheSettings.developmentMode.modified_on).toLocaleString() : nothing}
					</small>
				</div>
			</uui-box>  

			<uui-box headline=${this.localize.term("umbhostCloudflarePurge_cachingleveltitle")}>
				<div class="description">
					<umb-localize key="umbhostCloudflarePurge_cachingleveldescription"></umb-localize>
				</div>
				<umb-input-radio-button-list .list=${this.cachingLevelOptions} .value=${this.cacheSettings?.cacheLevel?.value ?? ''}></umb-input-radio-button-list>
				<div class="lastmodified">
					<small>
						<strong>
							<umb-localize key="umbhostCloudflarePurge_lastmodified"></umb-localize>:
						</strong> 
						${this.cacheSettings?.cacheLevel?.modified_on ? new Date(this.cacheSettings.cacheLevel.modified_on).toLocaleString() : nothing}
					</small>
				</div>
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
							${this.browserCacheTtlUpdated ? new Date(this.browserCacheTtlUpdated).toLocaleString() : nothing}
						</small>
					</div>
				`}
			</uui-box>  

			
			<uui-box headline=${this.localize.term("umbhostCloudflarePurge_alwaysonlinetitle")}>
				<div class="description">
					<umb-localize key="umbhostCloudflarePurge_alwaysonlinedescription"></umb-localize>
				</div>
				<div class="description">
					<umb-localize key="umbhostCloudflarePurge_alwaysonlineterms"></umb-localize>
				</div>
				<umb-input-toggle ?checked=${this.cacheSettings?.alwaysOnline?.value.toLowerCase() === "on"}  showLabels labelOn=${this.localize.term("umbhostCloudflarePurge_alwaysonlinetoggleon")} labelOff=${this.localize.term("umbhostCloudflarePurge_alwaysonlinetoggleoff")}></umb-input-toggle>
				<div class="lastmodified">
					<small>
						<strong>
							<umb-localize key="umbhostCloudflarePurge_lastmodified"></umb-localize>:
						</strong> 
						${this.cacheSettings?.alwaysOnline?.modified_on ? new Date(this.cacheSettings.alwaysOnline.modified_on).toLocaleString() : nothing}
					</small>
				</div>
			</uui-box>`}
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
