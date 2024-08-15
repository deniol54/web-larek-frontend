import './scss/styles.scss';

import { ShopAPI } from './components/model/ShopAPI';
import { API_URL, CDN_URL, settings } from './utils/constants';
import { ShopStateModel } from './components/model/ShopState';
import { MainScreen } from './components/view/screen/Main';
import { MainController } from './components/controller/Main';
import { CardData } from './types/view/Partial/Card';
import { AppStateEmitter } from './components/model/ShopStateEmmiter';
import { AppStateChanges, AppStateModals } from './types/model/ShopState';
import { BasketScreen } from './components/view/screen/Basket';
import { BasketController } from './components/controller/Basket';
import { ModalChange } from './types/model/ShopStateEmmiter';
import { ProductScreen } from './components/view/screen/Product';
import { ProductController } from './components/controller/Product';
import { ProductCategory } from './types/model/ShopAPI';
import { OrderFormScreen } from './components/view/screen/OrderForm';
import { OrderController } from './components/controller/Order';

const api = new ShopAPI(CDN_URL, API_URL);
const app = new AppStateEmitter(api, settings.appState, ShopStateModel);
const main = new MainScreen(new MainController(app.model));

const modal = {
	[AppStateModals.basket]: new BasketScreen(new BasketController(app.model)),
	[AppStateModals.product]: new ProductScreen(new ProductController(app.model)),
	[AppStateModals.address]: new OrderFormScreen(new OrderController(app.model)),
};


app.on(AppStateChanges.openModal, ({ previous, current }: ModalChange) => {
	console.log('New modal');
	main.page.isLocked = current !== AppStateModals.none;
	if (previous !== AppStateModals.none) {
		modal[previous].render({ isActive: false });
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
	modal[AppStateModals.address].render({
		contacts:app.model.userData,
		isActive: true,
	})
})

app.model.loadProducts().then(()=>{
  main.items = app.model.catalog.products;
});

// app.model.catalog.products.push({
// 	price: 100,
// 	id: '1',
// 	title: 'dad',
// 	category: ProductCategory.additional,
// 	description: 'dsd',
// 	image: 'D:\\Prog\\4course\fullstack\dev\web-larek-frontend\src\images\Subtract.png',

// });
// main.items = app.model.catalog.products;
// app.model.basket.products.push(app.model.catalog.products[0]);

