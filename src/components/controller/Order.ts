import { Controller } from '../base/controller';
import { ShopState, AppStateModals } from '../../types/model/ShopState'
import { OrderData } from '../../types/view/Partial/Order'; 

export class OrderController extends Controller<ShopState> {
	onChange = (value: OrderData) => {
		this.model.fillUserData(value);
	};
	onNext = () => {

	};
	onBack = () => {
		this.model.openModal(AppStateModals.basket);
	};
	onClose = () => {
		this.model.openModal(AppStateModals.none);
	};
}