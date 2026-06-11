import { UmbConditionBase } from '@umbraco-cms/backoffice/extension-registry';
import type {
    UmbConditionConfigBase,
    UmbConditionControllerArguments,
    UmbExtensionCondition,
} from '@umbraco-cms/backoffice/extension-api';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import { UmbHostCloudflarePurgeRepository } from '../repository/purge.repository';

/**
 * Permits an extension only when the package is configured (auth key, zones and, for Global
 * auth, an email address are all present). Used to hide the content-section purge dashboard
 * when the Cloudflare settings are missing.
 */
export class UmbHostCloudflarePurgeIsConfiguredCondition
    extends UmbConditionBase<UmbConditionConfigBase>
    implements UmbExtensionCondition {

    constructor(host: UmbControllerHost, args: UmbConditionControllerArguments<UmbConditionConfigBase>) {
        super(host, args);
        this.#checkConfigured();
    }

    async #checkConfigured() {
        const repository = new UmbHostCloudflarePurgeRepository(this);
        const { data } = await repository.getConfigurationStatus({ disableNotifications: true });
        this.permitted = data?.isConfigured === true;
    }
}

export default UmbHostCloudflarePurgeIsConfiguredCondition;
