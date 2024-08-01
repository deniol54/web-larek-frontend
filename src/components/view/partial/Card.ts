import { View } from '../../base/view';
import { CardData, CardDataBasket, CardSettings, CardDataModal, CardDataBasketSettings } from '@/types/view/Partial/Card';


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
}

export class CardDataModalView extends View<CardDataModal, CardSettings> {
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

	set description(value: string) {
		this.setValue(this.settings.text, value);
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
		this.settings.onClick({ event, item: this._item.id });
	}
}
