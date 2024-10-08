import { ModalScreen } from './ModalScreen';
import { IClickableEvent } from '../../../types/base/View';
import { cloneTemplate } from '../../../utils/html';
import { settings } from '../../../utils/constants';

import {
	ProductData,
	ProductSettings,
} from '../../../types/view/Screen/Product';
import { CardDataModal } from '../../../types/view/Partial/Card';
import { CardDataModalView } from '../partial/Card';


export class ProductScreen extends ModalScreen<
	CardDataModal,
	ProductData,
	ProductSettings
> {


	initContent() {
		const view = new CardDataModalView(cloneTemplate(settings.cardModalTemplate), {
			...settings.cardSettings,
      onClick: this.onRemoveProduct.bind(this),
		});
		this.nextButton = view.element.querySelector('.card__button');
		return view;
	}

	protected onRemoveProduct({ item }: IClickableEvent<CardDataModal>) {
    if(item)
		  this.settings.onNext();
	}

	set product(value: CardDataModal) {
		this.modal.content = value;
		this.nextButton.disabled = !value.price;

	}

	set title(value: string) {
		this.modal.content.title = value;
	}
	
}