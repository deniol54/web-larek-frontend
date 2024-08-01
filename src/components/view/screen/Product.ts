import { ModalScreen } from './ModalScreen';
import { IClickableEvent } from '../../../types/base/View';
import { cloneTemplate } from '../../../utils/html';
import { settings } from '../../../utils/constants';
import { ProductCategory } from '../../../types/model/ShopAPI';

import {
	ProductData,
	ProductSettings,
} from '../../../types/view/Screen/Product';
import { CardDataModal } from '../../../types/view/Partial/Card';
import { CardDataModalView } from '../partial/Card';
import { HeaderData } from '@/types/view/Common/Header';
import { HeaderView } from '../common/Header';


export class ProductScreen extends ModalScreen<
	CardDataModal,
	ProductData,
	ProductSettings
> {

	initContent() {
		return new CardDataModalView(cloneTemplate(settings.cardModalTemplate), {
			...settings.cardSettings,
      onClick: this.settings.onClose
		});
	}

	protected onRemoveProduct({ item }: IClickableEvent<CardDataModal>) {
    if(item)
		  this.settings.onNext();
	}

	set image(value: string) {
		console.log(this.modal);

		this.modal.content.image = value;
	}

	set title(value: string) {
		this.modal.content.title = value;
	}
	set category(value: ProductCategory) {
		this.modal.content.category = value;
	}
	set price(value: number) {
		this.modal.content.price = value;
	}
	set description(value: string) {
		this.modal.content.description = value;
	}
	// set total(total: string) {
	// 	this.modal.message = `${total} ${settings.basketModal.totalLabel}`;
	// }
}