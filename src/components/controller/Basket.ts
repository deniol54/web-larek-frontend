import { Controller } from '../base/controller';
import { ShopState, AppStateModals } from '../../types/model/ShopState'

export class BasketController extends Controller<ShopState> {
	onRemove = (id: string) => {
		this.model.removeProduct(id);
	};
	onNext = () => {
		// this.model.openModal(AppStateModals.contacts);
	};
	onClose = () => {
		this.model.openModal(AppStateModals.none);
	};
}