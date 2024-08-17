import { Controller } from '../base/controller';
import { ShopState, AppStateModals } from '../../types/model/ShopState'
import { ContactsData } from '../../types/view/Partial/Contacts';

export class ContactsController extends Controller<ShopState> {
	onChange = (value: ContactsData) => {
		this.model.fillUserData(value);
    this.model.isValidContacts();
	};
	onNext = () => {
    this.model.openModal(AppStateModals.openSuccess);
	};
	onClose = () => {
		this.model.openModal(AppStateModals.none);
	};
}