import { UmbEntityActionArgs, UmbEntityActionBase } from '@umbraco-cms/backoffice/entity-action';
import { UmbModalManagerContext, UMB_MODAL_MANAGER_CONTEXT, UMB_CONFIRM_MODAL } from '@umbraco-cms/backoffice/modal'
import { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import { UmbLocalizationController } from '@umbraco-cms/backoffice/localization-api';

export class PurdeCdnEntityAction extends UmbEntityActionBase<never> {
    #modalContext?: UmbModalManagerContext;
    #localize = new UmbLocalizationController(this);

    constructor(host: UmbControllerHost, args: UmbEntityActionArgs<never>) {
        super(host, args);

        // Fetch/consume the contexts & assign to the private fields
        this.consumeContext(UMB_MODAL_MANAGER_CONTEXT, (instance) => {
            this.#modalContext = instance;
        });
    }

    async execute() {
        const modalHandler = this.#modalContext?.open(this, UMB_CONFIRM_MODAL, {
            data: {
                headline: this.#localize.term("umbhostCloudflarePurge_confirmpurgecdnentityactiontitle"),
                content: this.#localize.term("umbhostCloudflarePurge_confirmpurgecdnentityactioncontent"),
                color: 'danger',
            }
        });

        await modalHandler?.onSubmit().then(() => {
            console.log('submit');
        }).catch(() => {
            console.log('cancel');
        });
    }
}