import { html, customElement, css, state, nothing } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { BrowserTtlOptionsResponse } from "../backend-api"
import { UmbInputRadioButtonListElement, UmbInputToggleElement } from "@umbraco-cms/backoffice/components";
import { UmbChangeEvent } from "@umbraco-cms/backoffice/event";
import { UMB_HOST_CLOUDFLARE_PURGE_CACHING_CONTEXT, type UmbHostCloudflarePurgeCachingContext } from "./caching-workspace.context";
import type { UmbHostCloudflarePurgeZoneOption } from "../repository/purge.repository";

@customElement('umbhost-cloudflare-purge-settings-caching')
export default class UmbHostCloudflarePurgeCachingViewElement extends UmbLitElement {

	#context?: UmbHostCloudflarePurgeCachingContext;

	@state()
	private firstLoad?: boolean = true;

	@state()
	private loading?: boolean = false;

	@state()
	private zones?: UmbHostCloudflarePurgeZoneOption[] = [];

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

	constructor() {
		super();

		this.consumeContext(UMB_HOST_CLOUDFLARE_PURGE_CACHING_CONTEXT, (context) => {
			this.#context = context;
			if (!context) return;

			this.observe(context.zones, (value) => { this.zones = value; });
			this.observe(context.firstLoad, (value) => { this.firstLoad = value; });
			this.observe(context.loading, (value) => { this.loading = value; });
			this.observe(context.browserCacheTtlOptions, (value) => { this.browserCacheTtlOptions = value; });
			this.observe(context.browserCacheTtlValue, (value) => { this.browserCacheTtlValue = value; });
			this.observe(context.browserCacheTtlUpdated, (value) => { this.browserCacheTtlUpdated = value; });
			this.observe(context.browserCacheTtlLoading, (value) => { this.browserCacheTtlLoading = value; });
			this.observe(context.alwaysOnlineValue, (value) => { this.alwaysOnlineValue = value; });
			this.observe(context.alwaysOnlineUpdated, (value) => { this.alwaysOnlineUpdated = value; });
			this.observe(context.alwaysOnlineLoading, (value) => { this.alwaysOnlineLoading = value; });
			this.observe(context.developerModeValue, (value) => { this.developerModeValue = value; });
			this.observe(context.developerModeUpdated, (value) => { this.developerModeUpdated = value; });
			this.observe(context.developerModeLoading, (value) => { this.developerModeLoading = value; });
			this.observe(context.cachingLevelValue, (value) => { this.cachingLevelValue = value; });
			this.observe(context.cachingLevelUpdated, (value) => { this.cachingLevelUpdated = value; });
			this.observe(context.cachingLevelLoading, (value) => { this.cachingLevelLoading = value; });
		});
	}

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

		await this.#context?.toggleBrowserCacheTtl(selectedOption.value);
		this.dispatchEvent(new UmbChangeEvent());
	}

	async #onAlwaysOnlineToggle(event: CustomEvent & { target: UmbInputToggleElement }) {
		await this.#context?.toggleAlwaysOnline(event.target.checked);
		this.dispatchEvent(new UmbChangeEvent());
	}

	async #onDeveloperModeToggle(event: CustomEvent & { target: UmbInputToggleElement }) {
		await this.#context?.toggleDevelopmentMode(event.target.checked);
		this.dispatchEvent(new UmbChangeEvent());
	}

	async #onCachingLevelToggle(event: CustomEvent & { target: UmbInputRadioButtonListElement }) {
		await this.#context?.toggleCachingLevel(event.target.value);
		this.dispatchEvent(new UmbChangeEvent());
	}

	#getZoneSettings(event: Event) {
		const select = event.target as HTMLSelectElement;
		this.#context?.selectZone(select.value);
	}

    render() {
        return html`
		<section id="umbhost-cloudflare-purge-caching">
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

			#umbhost-cloudflare-purge-caching {
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
