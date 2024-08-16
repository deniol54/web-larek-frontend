import { ModalScreen } from './ModalScreen';
import { cloneTemplate } from '../../../utils/html';
import { settings } from '../../../utils/constants';

import { ContactsData } from '../../../types/view/Partial/Contacts';
import { OrderFormData, OrderFormSettings } from '../../../types/view/Screen/OrderForm';
import { ContactsView } from '../partial/Contacts';
import { IChangeableEvent} from '../../../types/base/View';


export class ContactsFormScreen extends ModalScreen<
	ContactsData,
	OrderFormData,
	OrderFormSettings
> {

	initContent() {
    const view = new ContactsView(cloneTemplate(settings.contactsTemplate), {
			...settings.contactsSettings,
			onChange: this.onFormChange.bind(this),
		});
    this.nextButton = <HTMLButtonElement>view.element.querySelector(settings.contactsSettings.action);
    this.nextButton.addEventListener('click', this.onSubmitForm.bind(this));
		return view;
	}

	protected onFormChange({ value }: IChangeableEvent<ContactsData>) {
		if(value)
      this.settings.onChange(value);
	}

  protected onSubmitForm() {
		this.settings.onNext();
	}

	set contacts(value: ContactsData) {
    this.modal.modalMessageSelector = settings.contactsSettings.message;
		this.modal.content = value;
    this.nextButton.disabled = !(value.email.length > 0 && value.phone.length > 0);
	}
}