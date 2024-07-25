import { EventEmitter } from '../base/events';
import { IShopAPI } from '../../types/model/ShopAPI';
import {
	ShopState,
	AppStateChanges,
	AppStateConstructor,
	AppStateModals,
	AppStateSettings,
} from '../../types/model/ShopState';

export class AppStateEmitter extends EventEmitter {
	public model: ShopState;
	protected previousModal: AppStateModals = AppStateModals.none;

	constructor(
		api: IShopAPI,
		settings: Omit<AppStateSettings, 'onChange'>,
		Model: AppStateConstructor
	) {
		super();

		this.model = new Model(api, {
			...settings,
			onChange: this.onModelChange.bind(this),
		});
	}

	protected onModelChange(changed: AppStateChanges) {
		if (changed === AppStateChanges.openModal) {
			this.emit(changed, {
				previous: this.previousModal,
				current: this.model.openedModal,
			});
			this.emit(this.model.openedModal, {});
		} else {
			this.emit(changed, {});
		}
		this.previousModal = this.model.openedModal;
	}
}