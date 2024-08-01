import { Screen } from '../../base/screen';
import { cloneTemplate } from '../../../utils/html';
import { settings } from '../../../utils/constants';
import { ElementCreator } from '../../../types/html';

import { ModalView } from '../common/Modal' ;
import { ButtonView } from '../common/Button';
import { IView } from '../../../types/base/View';
import { ModalScreenSettings } from '../../../types/view/Screen/ModalScreen';

/**
 * Общая логика и структура модальных окон
 */
export abstract class ModalScreen<
	M, // внутренние данные для контента модального окна
	C, // внешние данные для экрана
	S extends ModalScreenSettings // настройки экрана (обработчики событий
> extends Screen<C, S> {
	// модальное окно
	protected declare modal: ModalView<M>;
	// кнопка "Далее"
	protected declare nextButton: HTMLButtonElement;

	// Абстрактные методы для реализации в дочерних классах


	abstract initContent(): IView<M>;

	// Переопределенный init() для инициализации модального окна
	protected init() {
    const curSettings = {
      nextLabel: settings.basketModal.nextLabel,
      nextSettings: <ElementCreator>settings.basketModal.nextSettings
    }
		this.nextButton = this.getNextButton(
			curSettings,
			this.settings.onNext
		);


		this.modal = this.getModalView(
			{
				contentView: this.initContent(),
			},
			this.settings.onClose
		);

		this.element = this.modal.element;
	}

	// Вспомогательные методы

	protected getNextButton(
		settings: { nextLabel: string; nextSettings: ElementCreator },
		onClick: () => void
	) {
		return ButtonView.make<HTMLButtonElement>(
			settings.nextLabel,
			settings.nextSettings,
			onClick
		);
	}

	protected getModalView(
		setting: { contentView: IView<M> },
		onClose: () => void
	) {
		return new ModalView<M>(cloneTemplate(settings.modalTemplate), {
			...settings.modalSettings,
			...setting,
			actions: [this.nextButton],
			onClose,
		});
	}

	// Методы установки данных

	// set header(value: H) {
	// 	this.modal.header = value;
	// }

	set content(value: M) {
		this.modal.content = value;
	}

	set isActive(value: boolean) {
		this.modal.isActive = value;
	}

	set message(value: string) {
		this.modal.message = value;
	}

	set isError(value: boolean) {
		this.modal.isError = value;
	}

	set isDisabled(state: boolean) {
		this.nextButton.disabled = state;
	}
}