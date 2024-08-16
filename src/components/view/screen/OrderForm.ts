import { ModalScreen } from './ModalScreen';
import { cloneTemplate } from '../../../utils/html';
import { settings } from '../../../utils/constants';

import { OrderData } from '../../../types/view/Partial/Order';
import { OrderFormData, OrderFormSettings } from '../../../types/view/Screen/OrderForm';
import { OrderView } from '../partial/Order';
import { IChangeableEvent} from '../../../types/base/View';

export class OrderFormScreen extends ModalScreen<
	OrderData,
	OrderFormData,
	OrderFormSettings
> {

	initContent() {
    const view = new OrderView(cloneTemplate(settings.orderTemplate), {
			...settings.orderSettings,
			onChange: this.onFormChange.bind(this),
		});
    this.nextButton = view.element.querySelector(settings.orderSettings.action);
		this.nextButton.addEventListener('click', this.onSubmitForm.bind(this));
		return view;
	}

	protected onFormChange({ value }: IChangeableEvent<OrderData>) {
		if(value)
      this.settings.onChange(value);
	}

	protected onSubmitForm() {
		this.settings.onNext();
	}

	set contacts(value: OrderData) {
		this.modal.content = value;
		console.log(this.modal);
    this.nextButton.disabled = !(value.address.length > 0 && value.payment.length > 0);
	}
}
