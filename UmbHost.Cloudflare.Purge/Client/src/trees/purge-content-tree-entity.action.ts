import { UmbEntityActionArgs, UmbEntityActionBase, UmbRequestReloadStructureForEntityEvent } from '@umbraco-cms/backoffice/entity-action';
import { UmbModalManagerContext, UMB_MODAL_MANAGER_CONTEXT, UMB_CONFIRM_MODAL } from '@umbraco-cms/backoffice/modal'
import { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import { UmbLocalizationController } from '@umbraco-cms/backoffice/localization-api';
import { UmbDocumentItemModel, UmbDocumentItemRepository } from '@umbraco-cms/backoffice/document';
import { UMB_ACTION_EVENT_CONTEXT } from '@umbraco-cms/backoffice/action';
import { UMB_NOTIFICATION_CONTEXT, UmbNotificationContext, UmbNotificationDefaultData } from '@umbraco-cms/backoffice/notification';
import { UMB_APP_LANGUAGE_CONTEXT, UmbAppLanguageContext } from '@umbraco-cms/backoffice/language';
import { UmbHostCloudflarePurgeRepository } from '../repository/purge.repository';

export class PurgeCdnContentEntityAction extends UmbEntityActionBase<never> {
    private _notificationContext?: UmbNotificationContext;
    #modalContext?: UmbModalManagerContext;
    #localize = new UmbLocalizationController(this);
    #repository = new UmbHostCloudflarePurgeRepository(this);
    private _languageContext?: UmbAppLanguageContext;

    constructor(host: UmbControllerHost, args: UmbEntityActionArgs<never>) {
        super(host, args);

        this.consumeContext(UMB_APP_LANGUAGE_CONTEXT, (languageConext) => {
            this._languageContext = languageConext;
        });

        this.consumeContext(UMB_NOTIFICATION_CONTEXT, (notificationContext) => {
              this._notificationContext = notificationContext;
            });

        this.consumeContext(UMB_MODAL_MANAGER_CONTEXT, (instance) => {
            this.#modalContext = instance;
        });
    }

    async execute() {
        const item = await this.#getDocument();
        if (!item) return;

        const itemName = this.#getName(item);

        const modalHandler = this.#modalContext?.open(this, UMB_CONFIRM_MODAL, {
            data: {
                headline: this.#localize.term("umbhostCloudflarePurge_confirmpurgecdnentityactiontitle"),
                content: this.#localize.string("#umbhostCloudflarePurge_confirmpurgecdnentityactioncontent", itemName),
                color: 'danger',
            }
        });

        try {
            await modalHandler?.onSubmit();
        } catch {
            // Modal dismissed/cancelled.
            return;
        }

        const purged = await this.#handPurge(item);
        if (purged) {
            const data: UmbNotificationDefaultData = { headline: this.#localize.string("#umbhostCloudflarePurge_purgeitemsuccesstitle", itemName), message: this.#localize.term("umbhostCloudflarePurge_purgeitemsuccesscontent") };
            this._notificationContext?.peek('positive', { data });
        } else {
            const data: UmbNotificationDefaultData = { headline: this.#localize.string("#umbhostCloudflarePurge_purgeitemfailedtitle", itemName), message: this.#localize.term("umbhostCloudflarePurge_purgeitemfailedcontent") };
            this._notificationContext?.peek('danger', { data });
        }

        this.#notify();
    }

    // In Umbraco 17 the document item name lives on the culture variants rather than
    // directly on the item. Prefer the variant for the active app culture, else the first.
    #getName(item: UmbDocumentItemModel): string {
        const culture = this._languageContext?.getAppCulture();
        const variant = item.variants.find((v) => v.culture === culture) ?? item.variants[0];
        return variant?.name ?? '';
    }

    async #handPurge(item: UmbDocumentItemModel) : Promise<boolean> {

        let cultureName = undefined;
        if (this._languageContext) {
            cultureName = this._languageContext.getAppCulture();
        }

        // Contextual success/failure notifications are raised by the caller,
        // so suppress the repository's generic notification here.
        const { error } = await this.#repository.purgeNode(
            { requestBody: { unique: item.unique, culture: cultureName } },
            { disableNotifications: true }
        );

        return !error;
    }

    async #getDocument() {
        if (!this.args.unique) throw new Error('Cannot purge an item without a unique identifier.');

		const { data } = await new UmbDocumentItemRepository(this).requestItems([this.args.unique]);
		const item = data?.[0];
		if (!item) throw new Error('Item not found.');
		return item;
	}

    async #notify() {
		const actionEventContext = await this.getContext(UMB_ACTION_EVENT_CONTEXT);
		if (!actionEventContext) {
			throw new Error('Action event context not found.');
		}

		const event = new UmbRequestReloadStructureForEntityEvent({
			unique: this.args.unique,
			entityType: this.args.entityType,
		});

		actionEventContext.dispatchEvent(event);
	}
}

export { PurgeCdnContentEntityAction as api };