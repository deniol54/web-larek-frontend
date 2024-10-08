import { View } from '../../base/view';
import { ModalData, ModalSettings } from '../../../types/view/Common/Modal';

/**
 * Отображение модального окна
 */
export class ModalView<C> extends View<
	ModalData<C>,
	ModalSettings<C>
> {
	// модальное окно, которое сейчас открыто, оно всегда одно
	protected static _openedModal: ModalView<unknown> | null;
	public modalMessageSelector: string;

	protected init() {
		// слушаем клик по иконке закрыть
		this.ensure(this.settings.close).addEventListener(
			'click',
			this.onCloseHandler.bind(this)
		);
		// клик по оверлею тоже закрывает модальное окно
		this.element.addEventListener('click', this.onCloseHandler.bind(this));
		this.modalMessageSelector = this.settings.message;
	}

	protected onCloseHandler(event?: MouseEvent) {
		if (
			event &&
			// при повторном вызове ensure возвращает элемент из кеша
			![this.ensure(this.settings.close), this.element].includes(
				event.target as HTMLElement
			)
		)
			return;
		this.element.remove();
		this.element.classList.remove(this.settings.activeClass);
		if (event) {
			this.settings.onClose?.();
		}
		if (ModalView._openedModal === this) {
			// если закрывается текущее модальное окно, то обнуляем статическое поле
			ModalView._openedModal = null;
		}
	}

	protected onOpenHandler() {
		if (ModalView._openedModal) {
			ModalView._openedModal.isActive = false;
		}
		ModalView._openedModal = this;
		this.element.classList.add(this.settings.activeClass);
		document.body.append(this.element);
		this.settings.onOpen?.();
	}

	// Проброс данных во вложенные отображения

	set content(data: C) {
		this.setValue(
			this.settings.content,
			this.settings.contentView.render(data)
		);
	}

	// Установка сообщения в модальное окно
	set message(value: string | undefined) {
		if (value) {
			this.setValue(this.modalMessageSelector, value);
			this.setVisibility(this.modalMessageSelector, true);
		} else {
			this.setVisibility(this.modalMessageSelector, false);
		}
	}

	set isError(state: boolean) {
		this.ensure(this.modalMessageSelector).classList.toggle(
			this.settings.messageErrorClass,
			!!state
		);
	}

	// Открытие и закрытие модального окна
	set isActive(state: boolean) {
		if (state) {
			this.element.classList.add(this.settings.activeClass);
			this.onOpenHandler();
		} else {
			this.element.classList.remove(this.settings.activeClass);
			this.onCloseHandler();
		}
	}
}
