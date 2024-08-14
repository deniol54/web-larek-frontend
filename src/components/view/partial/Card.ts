import { View } from '../../base/view';
import { CardData, CardDataBasket, CardSettings, CardDataModal, CardDataBasketSettings } from '@/types/view/Partial/Card';
import { ProductCategory, ProductCategoryReverse } from '../../../types/model/ShopAPI';

export class CardView extends View<CardData, CardSettings> {
	id: string;

	init() {
		this.element.addEventListener('click', this.onClickHandler.bind(this));
	}

	onClickHandler(event: MouseEvent) {
		this.settings.onClick({ event, item: this.id });
	}

	set image(value: string) {
		this.setValue<HTMLImageElement>(this.settings.image, {
			src: value,
		});
	}

	set title(value: string) {
		this.setValue(this.settings.title, value);
		this.setValue<HTMLImageElement>(this.settings.image, {
			alt: value,
		});
	}

	set price(value: number) {
		const price = value ? `${String(value)} синапсов` : 'Бесценно';
		this.setValue(this.settings.price, price);
	}

	set category(value: ProductCategory) {
		this.element.querySelector('.card__category').classList.replace('card__category_soft', 'card__category_'+ ProductCategoryReverse[value]);
		this.setValue(this.settings.category, value);
	}
}


export class CardDataModalView extends View<CardDataModal, CardSettings> {
	id: string;

	init() {
		this.element.querySelector('.card__button').addEventListener('click', this.onClickHandler.bind(this));
	}

	onClickHandler(event: MouseEvent) {
		this.settings.onClick({ event, item: this.id });
	}

	set image(value: string) {
		this.setValue<HTMLImageElement>(this.settings.image, {
			src: value,
		});
	}

	set title(value: string) {
		this.setValue(this.settings.title, value);
		this.setValue<HTMLImageElement>(this.settings.image, {
			alt: value,
		});
	}

	set description(value: string) {
		this.setValue(this.settings.text, value);
	}

	set price(value: number) {
		const price = value ? `${String(value)} синапсов` : 'Бесценно';
		this.setValue(this.settings.price, price);
	}

	set category(value: ProductCategory) {
		this.element.querySelector('.card__category').classList.replace('card__category_other', 'card__category_'+ ProductCategoryReverse[value]);
		this.setValue(this.settings.category, value);
	}
}

export class CardDataBasketView extends View<CardDataBasket, CardDataBasketSettings> {
  protected _item!: CardDataBasket;

	init() {
		this.ensure(this.settings.delete).addEventListener(
			'click',
			this.onClickHandler.bind(this)
		);

	}

	onClickHandler(event: MouseEvent) {
		console.log(this.settings.onClick)
		this.settings.onClick({ event, item: this._item.id });
	}

	set title(value: string) {
		this.setValue(this.settings.title, value);
		
	}

	set price(value: number) {
		const price = value ? `${String(value)} синапсов` : 'Бесценно';
		this.setValue(this.settings.price, price);
	}
	
	render(data: CardDataBasket) {
		this._item = data;
		return super.render(data);
	}
}
