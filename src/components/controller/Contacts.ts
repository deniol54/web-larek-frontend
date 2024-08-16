import { Controller } from '../base/controller';
import { ShopState, AppStateModals } from '../../types/model/ShopState'
import { ContactsData } from '../../types/view/Partial/Contacts';

export class ContactsController extends Controller<ShopState> {
	onChange = (value: ContactsData) => {
		this.model.fillUserData(value);
	};
	onNext = () => {
		// this.model.openModal(AppStateModals.contacts);
    if(this.model.isValidContacts()){
      
    }
	};
	onClose = () => {
		this.model.openModal(AppStateModals.none);
	};
}