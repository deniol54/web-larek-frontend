import { PayType, ProductCategory } from "@/types/model/ShopAPI";

export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {
  pageSelector: '.page',
  pageSettings: {
		wrapper: '.page__wrapper',
		counter: '.header__basket-counter',
		basket: '.header__basket',
		lockedClass: 'page__wrapper_locked',
	},
  gallerySelector: '.gallery',
  gallerySettings: {
		itemClass: 'gallery__item',
	},

  cardTemplate: '#card-catalog',
	cardModalTemplate: '#card-preview',
  cardSettings: {
		text: '.card__text',
		image: '.card__image',
    title: '.card__title',
    category: '.card__category',
    price: '.card__price',
    cardModal: '.card_full',
    cardBasket: '.card_compact'
	},
  cardBasket: '#card-basket',
  cardBasketSettings: {
    title: '.card__title',
    price: '.card__price',
    delete: '.basket__item-delete',
		index: '.basket__item-index',
  },

  modalTemplate: '#modal',
  modalSettings: {
		close: '.modal__close',
		content: '.modal__content',
		header: '.modal__title',
		footer: '.modal__actions',
		activeClass: 'modal_active',
		message: '',
		messageErrorClass: 'modal__message_error',
	},

	productModal: {
		nextLabel: 'В корзину',
		nextSettings: ['button', {className: 'button card__button'}],
	},


  basketModal: {
		headerTitle: 'Корзина',
    totalLabel: 'синапсов',
		nextLabel: 'Оформить',
		nextSettings: ['button', { className: 'button' }],
	},
	
  basketTemplate: '#basket',
	basketSettings: {
		title: '.modal__title',
		content: '.basket__list',
		description: '',
		action: '.basket__button',
		itemClass: '.basket__item',
		message: '.basket__price',
	},

	orderTemplate: '#order',
	orderSettings: {
		address: 'input[name=address]',
		payment: '.button_alt',
		activeButton: 'button_alt-active',
		action: '.order__button',
	},
  appState: {
		formatCurrency: (value: number) => `${value} руб.`,
		storageKey: '__filmTickets',
	},
};
