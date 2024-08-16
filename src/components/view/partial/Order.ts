import { OrderData, OrderSettings } from "../../../types/view/Partial/Order";
import { View } from '../../base/view';
import { settings } from '../../../utils/constants';

export class OrderView extends View<OrderData, OrderSettings> {
  protected _cashButton: Element;
  protected _cardButton: Element; 
  protected _activeButton: Element;

  init() {
    const buttons = this.element.querySelectorAll(this.settings.payment);
    [this._cardButton, this._cashButton] = buttons;
    this._cardButton.addEventListener('click', this.onClickHandler.bind(this));
    this._cashButton.addEventListener('click', this.onClickHandler.bind(this));
		this.element.addEventListener('submit', this.onSubmitHandler.bind(this));
		this.element.addEventListener('change', this.onSubmitHandler.bind(this));
	}

  onClickHandler(event: MouseEvent) {
    const element = <Element>event.target;
    if(!this._activeButton)
    {
      this._activeButton = element;
      element.classList.toggle(settings.orderSettings.activeButton);
      this.settings.onChange({ event, value: this.data });
      return
    }
      
    if(this._activeButton !== element) {
      this._activeButton.classList.toggle(settings.orderSettings.activeButton);
      this._activeButton = element;
      element.classList.toggle(settings.orderSettings.activeButton);
    }
    else
    {
      element.classList.toggle(settings.orderSettings.activeButton);
      this._activeButton = undefined;
    }
    this.settings.onChange({ event, value: this.data });
  }

	onSubmitHandler(event: SubmitEvent) {
		event.preventDefault();
		this.settings.onChange({ event, value: this.data });
		return false;
	}

	set payment(value: string) {
    if(value.length > 0){
      const curButton = value === 'online' ? this._cardButton : this._cashButton;
      curButton.classList.add(settings.orderSettings.activeButton);
      this._activeButton = curButton;
    }
	}

	set address(value: string) {
		this.setValue<HTMLInputElement>(this.settings.address, {
			value,
		});
	}

	get data() {
    const paymentElement = this.element.querySelector(`.${settings.orderSettings.activeButton}`);
    const payment = paymentElement ? paymentElement.textContent: '';
		return {
			payment: payment.length > 0 ? payment === 'Онлайн' ? 'online' : 'offline' : payment,
			address: this.ensure<HTMLInputElement>(this.settings.address).value,
		};
	}
}