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
import { HeaderData, HeaderSettings } from '@/types/view/Common/Header';
import { HeaderView } from '../common/Header';
import { View } from '../../base/view';

/**
 * Экран корзины
 */
// class BasketView extends View<BasketData, BasketSettings> {
// 	protected _basketContent: ListView<CardDataBasket>;

// 	init() {
// 		this._basketContent = new ListView<CardDataBasket> (this.element.querySelector(settings.basketSettings.content), {
// 			...settings.basketSettings,
// 			item: new CardDataBasketView(cloneTemplate(settings.cardBasket), {
// 				...settings.cardBasketSettings,
// 				onClick: this.onRemoveProduct.bind(this),
// 			})
// 		});

// 	}

// 	protected onRemoveProduct({ item }: IClickableEvent<string>) {
// 		this.settings.onRemove(item);
// }

// 	set title(value: string) {
// 		this.setValue(this.settings.title, value);
// 	}
	
// }

export class BasketScreen extends ModalScreen<
	HeaderData,
	ListData<CardDataBasket>,
	BasketData,
	BasketSettings
> {
	protected _basket: HTMLElement;

	initHeader() {
		return new HeaderView(cloneTemplate(settings.basketTemplate), {
			...settings.basketSettings,
			onClick: null,
		});
	}

	initContent() {
		const list = new ListView<CardDataBasket>(cloneTemplate(settings.basketTemplate), {
			...settings.basketSettings,
			item: new CardDataBasketView(cloneTemplate(settings.cardBasket), {
				...settings.cardBasketSettings,
				onClick: this.onRemoveProduct.bind(this),
			}),
		});
		list.setListElement(list.element.querySelector(settings.basketSettings.content));
		this.nextButton = list.element.querySelector(settings.basketSettings.action);
		return list;
		// return new BasketView(cloneTemplate(settings.basketTemplate),{
		// 	...settings.basketSettings,
		// 	onClick: this.onGoToOrder.bind(this),
		// })
	}


	protected onRemoveProduct({ item }: IClickableEvent<string>) {
		this.settings.onRemove(item);
	}

	protected onGoToOrder() {
		this.settings.onNext();
	}


	set products(products: CardDataBasket[]) {
		this.modal.content = {
			items: products,
		};
		this.nextButton.disabled = !products.length;
	}

	set total(total: string) {
		this.element.querySelector(settings.basketSettings.message).textContent = `${total} ${settings.basketModal.totalLabel}`;
	}

	// render(data: Partial<BasketData>) {
	// 	console.log(this.modal.element);
	// 	console.log(this._basket);
	// 	Object.assign(this, data);
	// 	console.log(this.modal)
	// 	Object.assign(this, this._basket);
	// 	return this.modal.element;
	// }
}