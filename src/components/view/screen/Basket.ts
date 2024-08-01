import { ModalScreen } from './ModalScreen';
import { IClickableEvent } from '../../../types/base/View';
import { cloneTemplate } from '../../../utils/html';
import { settings } from '../../../utils/constants';

import {
	BasketData,
	BasketSettings,
} from '../../../types/view/Screen/Basket';
import { ListView } from '../../view/common/List';
import { ListData } from '../../../types/view/Common/List';
import { CardDataBasket } from '../../../types/view/Partial/Card';
import { CardDataBasketView } from '../partial/Card';
import { HeaderData } from '@/types/view/Common/Header';
import { HeaderView } from '../common/Header';

/**
 * Экран корзины
 */
export class BasketScreen extends ModalScreen<
	ListData<CardDataBasket>,
	BasketData,
	BasketSettings
> {


	initContent() {
		return new ListView<CardDataBasket>(cloneTemplate(settings.basketTemplate), {
			...settings.basketSettings,
			item: new CardDataBasketView(cloneTemplate(settings.cardBasket), {
				...settings.cardBasketSettings,
				onClick: this.onRemoveProduct.bind(this),
			}),
		});
	}


	protected onRemoveProduct({ item }: IClickableEvent<CardDataBasket>) {
    if(item)
		  this.settings.onRemove(item.id);
	}


	set products(products: CardDataBasket[]) {
		this.modal.content = {
			items: products,
		};
		this.nextButton.disabled = !products.length;
	}

	// set total(total: string) {
	// 	this.modal.content = `${total} ${settings.basketModal.totalLabel}`;
	// }

	// render(data:BasketData) {
	// 	this.modal.element.
	// 	return this.element
	// }
}