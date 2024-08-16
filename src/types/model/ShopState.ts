import { Catalog, ProductBasket, UserData, Order, OrderResult,IShopAPI, Product } from './ShopAPI';

export enum AppStateModals {
	product = 'modal:product',
	basket = 'modal:basket',
  address = 'modal:address',
	contacts = 'modal:contacts',
	// success = 'modal:success',
	none = 'modal:none',
}

export enum AppStateChanges {
	openModal = 'change:modal',
	setModalMessage = 'change:modalMessage',
  selectProduct = 'change:selectedProduct',
  orderData = 'change:orderData',
	openBasket = 'change:basket',
	order = 'change:order',
}

export type PersistedState = {
	products: Product[];
	contacts: UserData;
};

export interface ShopState {
	selectedProduct: Product;
  catalog: Catalog;
  basket: ProductBasket;
  userData: UserData;
  basketTotal: number;
  order: Order;
  openedModal: AppStateModals;
	isOrderReady: boolean;
	modalMessage: string | null;
	isError: boolean;

  loadProducts(): Promise<void>;
	orderProducts(): Promise<OrderResult>;

  selectProduct(id: string): void;
	pushProduct2Basket(): void;
	clearBasket(): void;
  removeProduct(id: string): void;
	fillUserData(contacts: Partial<UserData>): void;
	isValidContacts(): boolean;
	persistState(): void;
	restoreState(): void;

  openModal(modal: AppStateModals): void;
  setMessage(message: string | null, isError: boolean): void;
}

// Настройки модели данных
export interface AppStateSettings {
	formatCurrency: (value: number) => string;
	storageKey: string;
	// Функция, которая будет вызываться при изменении состояния
	onChange: (changed: AppStateChanges) => void;
}

// Конструктор модели данных
export interface AppStateConstructor {
	new (api: IShopAPI, settings?: AppStateSettings): ShopState;
}