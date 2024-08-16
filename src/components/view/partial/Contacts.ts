import { ContactsData, ContactsSettings } from "../../../types/view/Partial/Contacts";
import { View } from '../../base/view';
import { settings } from '../../../utils/constants';

export class ContactsView extends View<ContactsData, ContactsSettings> {

  init() {
		this.element.addEventListener('submit', this.onSubmitHandler.bind(this));
		this.element.addEventListener('change', this.onSubmitHandler.bind(this));
	}

	onSubmitHandler(event: SubmitEvent) {
		event.preventDefault();
		this.settings.onChange({ event, value: this.data });
		return false;
	}

	set phone(value: string) {
    this.setValue<HTMLInputElement>(this.settings.phone, {
			value,
		});
	}

	set email(value: string) {
		this.setValue<HTMLInputElement>(this.settings.email, {
			value,
		});
	}

	get data() {
		return {
			phone: this.ensure<HTMLInputElement>(this.settings.phone).value,
			email: this.ensure<HTMLInputElement>(this.settings.email).value,
		};
	}
}