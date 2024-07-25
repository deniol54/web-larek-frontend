import { ShopState, AppStateModals } from '../../types/model/ShopState'
import { Controller } from '../base/controller';

export class MainController extends Controller<ShopState> {
	onOpenBasket = () => {
		this.model.openModal(AppStateModals.basket);
	};


	onOpenProduct = (id: string) => {
		this.model.selectProduct(id);
		this.model.openModal(AppStateModals.product);
	};
}