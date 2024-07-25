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
  cardSettings: {
		text: '.card__text',
		image: '.card__image',
    title: '.card__title',
    category: '.card__category',
    price: '.card__price',
    cardModal: '.card_full',
    cardBasket: '.card_compact'
	},
};
