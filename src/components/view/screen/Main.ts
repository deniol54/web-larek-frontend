import { Screen } from '../../base/screen';
import { IClickableEvent } from '@/types/base/View';
import { cloneTemplate, ensureElement } from '../../../utils/html';
import { settings } from '../../../utils/constants';

import {
	MainData,
	MainSettings,
} from '@/types/view/Screen/Main';
import { ListView } from '../common/List';
import { CardView } from '../partial/Card';
import { PageView } from '../partial/Page';
import { CardData } from '@/types/view/Partial/Card';

/**
 * Экран главной страницы
 */
export class MainScreen extends Screen<MainData, MainSettings> {
	protected declare gallery: ListView<CardData>;
	public declare page: PageView;

	protected init() {
		this.page = new PageView(ensureElement(settings.pageSelector), {
			...settings.pageSettings,
			onClick: this.settings.onOpenBasket,
		});

		this.gallery = new ListView<CardData>(
			ensureElement(settings.gallerySelector),
			{
				...settings.gallerySettings,

				item: new CardView(cloneTemplate(settings.cardTemplate), {
					...settings.cardSettings,
					onClick: this.onOpenProductItem.bind(this),
				}),
			}
		);

		this.element = this.page.element;
	}


	protected onOpenProductItem({ item }: IClickableEvent<string>) {
		this.settings.onOpenProduct(item);
	}

	set counter(value: number) {
		this.page.counter = value;
	}

	set items(value: CardData[]) {
		this.gallery.items = value;
	}

}