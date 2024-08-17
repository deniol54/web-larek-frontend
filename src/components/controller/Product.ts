import { ShopState, AppStateModals } from '../../types/model/ShopState'
import { Controller } from '../base/controller';


export class ProductController extends Controller<ShopState> {
	onSelect = () => {
		this.model.openModal(AppStateModals.openProduct);
	};
	onNext = () => {
		this.model.pushProductToBasket();
		this.model.persistState();
		this.model.openModal(AppStateModals.openBasket);
	};
	onClose = () => {
		this.model.openModal(AppStateModals.none);
	};
}
