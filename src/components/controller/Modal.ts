import { ShopState, AppStateModals } from '../../types/model/ShopState'
import { Controller } from '../base/controller';

export class ModalController extends Controller<ShopState> {
	onClose = () => {
		this.model.openModal(AppStateModals.none);
	};
}
