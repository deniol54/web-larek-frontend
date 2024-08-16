import { Controller } from '../base/controller';
import { ShopState, AppStateModals } from '../../types/model/ShopState'
import { ContactsData } from '../../types/view/Partial/Contacts';

export class ContactsController extends Controller<ShopState> {
	onChange = (value: ContactsData) => {
		this.model.fillUserData(value);
	};
	onNext = async () => {
		// this.model.openModal(AppStateModals.contacts);
    const orderTotal = this.model.basket.basketPrice;
    if(this.model.isValidContacts() && this.model.isOrderReady) {
      const result = await this.model.orderProducts();
      if(orderTotal === result.total) {
        this.model.persistState();
        // this.model.openModal()
      }
    }
	};
	onClose = () => {
		this.model.openModal(AppStateModals.none);
	};
}