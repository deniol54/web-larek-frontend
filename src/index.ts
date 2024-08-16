import './scss/styles.scss';

import { ShopAPI } from './components/model/ShopAPI';
import { API_URL, CDN_URL, settings } from './utils/constants';
import { ShopStateModel } from './components/model/ShopState';
import { MainScreen } from './components/view/screen/Main';
import { MainController } from './components/controller/Main';
import { AppStateEmitter } from './components/model/ShopStateEmmiter';
import { AppStateChanges, AppStateModals } from './types/model/ShopState';
import { BasketScreen } from './components/view/screen/Basket';
import { BasketController } from './components/controller/Basket';
import { ModalChange } from './types/model/ShopStateEmmiter';
import { ProductScreen } from './components/view/screen/Product';
import { ProductController } from './components/controller/Product';

import { OrderFormScreen } from './components/view/screen/OrderForm';
import { OrderController } from './components/controller/Order';
import { ContactsFormScreen } from './components/view/screen/ContsctsForm';
import { ContactsController } from './components/controller/Contacts';
import { SuccessScreen } from './components/view/screen/Success';
import { ModalController } from './components/controller/Modal';

const api = new ShopAPI(CDN_URL, API_URL);
const app = new AppStateEmitter(api, settings.appState, ShopStateModel);
const main = new MainScreen(new MainController(app.model));

const modal = {
	[AppStateModals.basket]: new BasketScreen(new BasketController(app.model)),
	[AppStateModals.product]: new ProductScreen(new ProductController(app.model)),
	[AppStateModals.address]: new OrderFormScreen(new OrderController(app.model)),
	[AppStateModals.contacts]: new ContactsFormScreen(new ContactsController(app.model)),
	[AppStateModals.success]: new SuccessScreen(new ModalController(app.model)),
};


app.on(AppStateChanges.openModal, ({ previous, current }: ModalChange) => {
	main.page.isLocked = current !== AppStateModals.none;
	if (previous !== AppStateModals.none) {
		modal[previous].render({ isActive: false });
	}
});

app.on(AppStateChanges.setModalMessage, () => {
	if (app.model.openedModal !== AppStateModals.none) {
		modal[app.model.openedModal].render({
			message: app.model.modalMessage,
			isError: app.model.isError,
		});
	}
});


app.on(AppStateChanges.openBasket, () => {
	main.counter = app.model.basket.basketCount;
	modal[AppStateModals.basket].products = Array.from(
		app.model.basket.products
	);
	modal[AppStateModals.basket].total = String(app.model.basket.basketPrice);
});

app.on(AppStateModals.basket, () => {
	modal[AppStateModals.basket].render({
		products: app.model.basket.products,
		total: String(app.model.basket.basketPrice),
		isActive: true,
	});
});

app.on(AppStateModals.product, () => {
	modal[AppStateModals.product].render({
		product: app.model.selectedProduct,
		isActive: true,
	})
})


app.on(AppStateModals.address, () => {
	modal[AppStateModals.address].render({
		contacts:app.model.userData,
		isActive: true,
	})
})

app.on(AppStateChanges.orderData, () => {
	const currentModal = <Exclude<AppStateModals,AppStateModals.none>>app.model.openedModal;
	modal[currentModal].render({
		contacts:app.model.userData,
		isActive: true,
	})
})

app.on(AppStateModals.contacts, () => {
	modal[AppStateModals.contacts].render({
		contacts: app.model.userData,
		isActive: true,
	})
})

app.on(AppStateChanges.order, () => {
	modal[AppStateModals.address].render({
		contacts: app.model.userData,
	});
	modal[AppStateModals.contacts].render({
		contacts: app.model.userData,
	})
})

app.on(AppStateModals.success, () => {
	modal[AppStateModals.success].render({
		content: {
			title: settings.successModal.title,
			description: settings.appState.formatCurrency(app.model.order.total),
		},
		isActive: true,
	})
})

app.model.loadProducts().then(()=>{
  main.items = app.model.catalog.products;
	app.model.restoreState();
});
