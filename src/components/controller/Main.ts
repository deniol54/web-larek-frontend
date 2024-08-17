import { ShopState, AppStateModals } from '../../types/model/ShopState'
import { Controller } from '../base/controller';

export class MainController extends Controller<ShopState> {
	onOpenBasket = () => {
		this.model.openModal(AppStateModals.openBasket);
	};


	onOpenProduct = (id: string) => {
		this.model.selectProduct(id);
		this.model.openModal(AppStateModals.openProduct);
	};
}