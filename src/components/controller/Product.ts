import { ShopState, AppStateModals } from '../../types/model/ShopState'
import { Controller } from '../base/controller';


export class ProductController extends Controller<ShopState> {
	onSelect = () => {
		this.model.openModal(AppStateModals.product);
	};
	onNext = () => {
		this.model.pushProduct2Basket();
		this.model.openModal(AppStateModals.basket);
	};
	onClose = () => {
		this.model.openModal(AppStateModals.none);
	};
}
