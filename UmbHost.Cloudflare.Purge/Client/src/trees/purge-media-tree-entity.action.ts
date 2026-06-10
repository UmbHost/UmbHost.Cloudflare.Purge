import { UmbEntityActionArgs, UmbEntityActionBase, UmbRequestReloadStructureForEntityEvent } from '@umbraco-cms/backoffice/entity-action';
import { UmbModalManagerContext, UMB_MODAL_MANAGER_CONTEXT, UMB_CONFIRM_MODAL } from '@umbraco-cms/backoffice/modal'
import { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import { UmbLocalizationController } from '@umbraco-cms/backoffice/localization-api';
import { UMB_ACTION_EVENT_CONTEXT } from '@umbraco-cms/backoffice/action';
import { UMB_NOTIFICATION_CONTEXT, UmbNotificationContext, UmbNotificationDefaultData } from '@umbraco-cms/backoffice/notification';
import { UmbMediaItemModel, UmbMediaItemRepository } from '@umbraco-cms/backoffice/media';
import { UmbHostCloudflarePurgeRepository } from '../repository/purge.repository';

export class PurgeCdnMediaEntityAction extends UmbEntityActionBase<never> {
    private _notificationContext?: UmbNotificationContext;
    #modalContext?: UmbModalManagerContext;
    #localize = new UmbLocalizationController(this);
    #repository = new UmbHostCloudflarePurgeRepository(this);

    constructor(host: UmbControllerHost, args: UmbEntityActionArgs<never>) {
        super(host, args);

        this.consumeContext(UMB_NOTIFICATION_CONTEXT, (notificationContext) => {
              this._notificationContext = notificationContext;
            });

        this.consumeContext(UMB_MODAL_MANAGER_CONTEXT, (instance) => {
            this.#modalContext = instance;
        });
    }

    async execute() {
        const item = await this.#getMedia();
        if (!item) return;

        const modalHandler = this.#modalContext?.open(this, UMB_CONFIRM_MODAL, {
            data: {
                headline: this.#localize.term("umbhostCloudflarePurge_confirmpurgecdnentityactiontitle"),
                content: this.#localize.string("#umbhostCloudflarePurge_confirmpurgecdnentityactioncontent", item.name),
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
            const data: UmbNotificationDefaultData = { headline: this.#localize.string("#umbhostCloudflarePurge_purgeitemsuccesstitle", item.name), message: this.#localize.term("umbhostCloudflarePurge_purgeitemsuccesscontent") };
            this._notificationContext?.peek('positive', { data });
        } else {
            const data: UmbNotificationDefaultData = { headline: this.#localize.string("#umbhostCloudflarePurge_purgeitemfailedtitle", item.name), message: this.#localize.term("umbhostCloudflarePurge_purgeitemfailedcontent") };
            this._notificationContext?.peek('danger', { data });
        }

        this.#notify();
    }

    async #handPurge(item: UmbMediaItemModel): Promise<boolean> {
        // Media is invariant, so no culture is supplied. The management API resolves
        // the media URL from the unique id.
        const { error } = await this.#repository.purgeNode(
            { requestBody: { unique: item.unique } },
            { disableNotifications: true }
        );

        return !error;
    }

    async #getMedia() {
        if (!this.args.unique) throw new Error('Cannot purge an item without a unique identifier.');

		const { data } = await new UmbMediaItemRepository(this).requestItems([this.args.unique]);
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

export { PurgeCdnMediaEntityAction as api };