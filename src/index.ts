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
	[AppStateModals.openBasket]: new BasketScreen(new BasketController(app.model)),
	[AppStateModals.openProduct]: new ProductScreen(new ProductController(app.model)),
	[AppStateModals.openAddress]: new OrderFormScreen(new OrderController(app.model)),
	[AppStateModals.openContacts]: new ContactsFormScreen(new ContactsController(app.model)),
	[AppStateModals.openSuccess]: new SuccessScreen(new ModalController(app.model)),
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
			isDisabled: app.model.isError,
		});
	}
});


app.on(AppStateChanges.changeBasket, () => {
	main.counter = app.model.basket.basketCount;
	modal[AppStateModals.openBasket].products = Array.from(
		app.model.basket.products
	);
	modal[AppStateModals.openBasket].total = String(app.model.basket.basketPrice);
});

app.on(AppStateModals.openBasket, () => {
	modal[AppStateModals.openBasket].render({
		products: app.model.basket.products,
		total: String(app.model.basket.basketPrice),
		isActive: true,
	});
});

app.on(AppStateModals.openProduct, () => {
	modal[AppStateModals.openProduct].render({
		product: app.model.selectedProduct,
		isActive: true,
	})
})


app.on(AppStateModals.openAddress, () => {
	modal[AppStateModals.openAddress].render({
		contacts:app.model.userData,
		isActive: true,
	})
})

app.on(AppStateChanges.orderData, () => {
	modal[AppStateModals.openAddress].render({
		contacts: app.model.userData,
	});
	modal[AppStateModals.openContacts].render({
		contacts: app.model.userData,
	})
})

app.on(AppStateModals.openContacts, () => {
	modal[AppStateModals.openContacts].render({
		contacts: app.model.userData,
		isActive: true,
	})
})

app.on(AppStateChanges.order, async () => {
	try {
		const orderTotal = app.model.basketTotal;
		const result = await api.orderProducts(app.model.getOrder());
		if(orderTotal === result.total) {
			app.model.persistState();
			app.model.openModal(AppStateModals.openSuccess);
		}
	}
	catch (error: unknown) {
		if (error instanceof Error) {
			console.log(`Error: `,error.message);
		}
		if (typeof error === 'string') {
			console.log(`Error: `, error)
		}
	}

})

app.on(AppStateModals.openSuccess, () => {
	modal[AppStateModals.openSuccess].render({
		content: {
			title: settings.successModal.title,
			description: settings.appState.formatCurrency(app.model.order.total),
		},
		isActive: true,
	})
})

api.getProducts().then((products)=>{
  main.items = products;
	app.model.loadProducts(products);
	app.model.restoreState();
}).catch((err: string) => console.log(`Error: `, err));
