import { html, customElement, css, state, nothing } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import type { ConfigurationStatus } from "../backend-api";
import { UmbHostCloudflarePurgeRepository } from "../repository/purge.repository";

/**
 * Inline alert shown at the top of the package's settings views.
 *
 * Calls the read-only configuration-status endpoint and, when the package is
 * not configured, renders an error bar listing exactly what is missing. When
 * the package is configured but deliberately disabled it shows an informational
 * notice instead. Renders nothing while loading, when fully configured, or if
 * the status call fails (fail-safe — we never raise a false alarm).
 */
@customElement('umbhost-cloudflare-purge-config-status-alert')
export default class UmbHostCloudflarePurgeConfigStatusAlertElement extends UmbLitElement {

    #repository = new UmbHostCloudflarePurgeRepository(this);

    @state()
    private _loaded = false;

    @state()
    private _status?: ConfigurationStatus;

    override connectedCallback() {
        super.connectedCallback();
        this.#loadStatus();
    }

    async #loadStatus() {
        // The element renders its own contextual message, so suppress the
        // default backoffice error notification from the data source.
        const { data } = await this.#repository.getConfigurationStatus({ disableNotifications: true });
        this._status = data;
        this._loaded = true;
    }

    #missingItems(status: ConfigurationStatus): Array<string> {
        const missing: Array<string> = [];
        if (!status.hasAuthKey) missing.push(this.localize.term('umbhostCloudflarePurge_confignotconfiguredauthkey'));
        if (status.requiresEmail && !status.hasEmail) missing.push(this.localize.term('umbhostCloudflarePurge_confignotconfiguredemail'));
        if (!status.hasZones) missing.push(this.localize.term('umbhostCloudflarePurge_confignotconfiguredzones'));
        return missing;
    }

    render() {
        if (!this._loaded || !this._status) return nothing;

        if (!this._status.isConfigured) {
            return html`
                <div class="alert alert-danger" role="alert">
                    <h5 class="alert-heading">${this.localize.term('umbhostCloudflarePurge_confignotconfiguredtitle')}</h5>
                    <p><umb-localize key="umbhostCloudflarePurge_confignotconfiguredintro"></umb-localize></p>
                    <ul>
                        ${this.#missingItems(this._status).map((item) => html`<li>${item}</li>`)}
                    </ul>
                </div>
            `;
        }

        if (this._status.isDisabled) {
            return html`
                <div class="alert alert-warning" role="alert">
                    <h5 class="alert-heading">${this.localize.term('umbhostCloudflarePurge_configdisabledtitle')}</h5>
                    <p><umb-localize key="umbhostCloudflarePurge_configdisabledcontent"></umb-localize></p>
                </div>
            `;
        }

        return nothing;
    }

    static styles = css`
        :host {
            display: block;
        }

        /* Bootstrap-style inline alert, themed with UUI colour tokens. */
        .alert {
            width: 100%;
            box-sizing: border-box;
            border: 1px solid transparent;
            border-radius: var(--uui-border-radius, 3px);
            padding: var(--uui-size-space-4) var(--uui-size-space-5);
            margin-bottom: var(--uui-size-space-4);
        }

        .alert-danger {
            background-color: var(--uui-color-danger);
            border-color: var(--uui-color-danger-emphasis);
            color: var(--uui-color-danger-contrast);
        }

        .alert-warning {
            background-color: var(--uui-color-warning);
            border-color: var(--uui-color-warning-emphasis);
            color: var(--uui-color-warning-contrast);
        }

        .alert-heading {
            margin: 0 0 var(--uui-size-space-2);
        }

        .alert p {
            margin: 0;
        }

        .alert ul {
            margin: var(--uui-size-space-2) 0 0;
            padding-left: var(--uui-size-5);
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        'umbhost-cloudflare-purge-config-status-alert': UmbHostCloudflarePurgeConfigStatusAlertElement;
    }
}
