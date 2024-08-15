import { ModalScreen } from './ModalScreen';
import { IClickableEvent } from '../../../types/base/View';
import { cloneTemplate } from '../../../utils/html';
import { settings } from '../../../utils/constants';

import { OrderData } from '../../../types/view/Partial/Order';
import { OrderFormData, OrderFormSettings } from '../../../types/view/Screen/OrderForm';
import { OrderView } from '../partial/Order';
import { IChangeableEvent} from '../../../types/base/View';
import { View } from '../../base/view';

export class OrderFormScreen extends ModalScreen<
	Partial<OrderData>,
	OrderFormData,
	OrderFormSettings
> {

	initContent() {
    const view = new OrderView(cloneTemplate(settings.orderTemplate), {
			...settings.orderSettings,
			onChange: this.onFormChange.bind(this),
		});
    this.nextButton = view.element.querySelector(settings.orderSettings.action);
		return view;
	}

	protected onFormChange({ value }: IChangeableEvent<OrderData>) {
		if(value)
      this.settings.onChange(value);
	}

	set contacts(value: OrderData) {
		this.modal.content = value;
    this.nextButton.disabled = !(value.address.length > 0 && value.payment.length > 0);
	}

	// set total(total: string) {
	// 	this.modal.message = `${SETTINGS.orderModal.totalLabel} ${total}`;
	// }
}