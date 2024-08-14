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
import { ElementCreator } from '@/types/html';


export class ProductScreen extends ModalScreen<
	never,	
	CardDataModal,
	ProductData,
	ProductSettings
> {

	initHeader (): undefined {
		return ;
	}

	initContent() {

		// const nextButton = { 
		// 	nextLabel : settings.productModal.nextLabel,
		// 	nextSettings: <ElementCreator>settings.productModal.nextSettings
		// }

		// this.nextButton = this.getNextButton(nextButton,this.settings.onNext);

		return new CardDataModalView(cloneTemplate(settings.cardModalTemplate), {
			...settings.cardSettings,
      onClick: this.onRemoveProduct.bind(this),
		});
	}

	protected onRemoveProduct({ item }: IClickableEvent<CardDataModal>) {
    if(item)
		  this.settings.onNext();
	}

	set product(value: CardDataModal) {
		this.modal.content = value;
	}

	set title(value: string) {
		this.modal.content.title = value;
	}
	
}