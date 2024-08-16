import { ModalScreen } from './ModalScreen';
import { IClickableEvent } from '../../../types/base/View';
import { cloneTemplate } from '../../../utils/html';
import { settings } from '../../../utils/constants';
import { BasketData, BasketSettings } from '../../../types/view/Screen/Basket';
import { ListView } from '../../view/common/List';
import { ListData } from '../../../types/view/Common/List';
import { CardDataBasket } from '../../../types/view/Partial/Card';
import { CardDataBasketView } from '../partial/Card';


export class BasketScreen extends ModalScreen<
	ListData<CardDataBasket>,
	BasketData,
	BasketSettings
> {


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
		this.nextButton.addEventListener('click', this.onGoToOrder.bind(this));
		return list;
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
}