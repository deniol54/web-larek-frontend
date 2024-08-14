import { View } from '../../base/view';

import {
	ElementsMap,
	ItemData,
	ListData,
	ListSettings,
} from '@/types/view/Common/List';

/**
 * Класс для отображения списка элементов
 */
export class ListView<T extends ItemData> extends View<
	ListData<T>,
	ListSettings<T>
> {
	// Сохраняем элементы в объекте, где ключ - id элемента
	protected _elements: ElementsMap;

	protected _listElement: HTMLElement;
	init() {
		this._listElement = this.element;
	}

	setListElement(element: HTMLElement) {
		this._listElement = element;
	}

	/**
	 * Устанавливаем активный элемент
	 */
	setActiveElement(element: HTMLElement) {
		const elements = Object.values(this._elements);
		if (elements.includes(element)) {
			elements.map((element) =>
				element.classList.remove(this.settings.activeItemClass)
			);
			element.classList.add(this.settings.activeItemClass);
		}
	}

	/**
	 * Устанавливаем активный элемент по id
	 */
	setActiveItem(id: string) {
		if (this._elements[id]) {
			this.setActiveElement(this._elements[id]);
		}
	}

	/**
	 * Обновляем отображение списка элементов
	 */
	set items(items: T[]) {
		this._elements = items.reduce<ElementsMap>((result, item) => {
			// Копируем заранее настроенное отображение
			const el = this.settings.item.copy();
			// Добавляем класс элемента
			el.element.classList.add(this.settings.itemClass);
			// Заполняем нужными данными и сохраняем в объекте
			result[item.id] = el.render(item);
			return result;
		}, {});

		this.setValue(this._listElement, Object.values(this._elements));
	}
}