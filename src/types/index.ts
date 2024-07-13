// Данные

enum ProductTypes{
  soft = 'софт-скил',
  other = 'другое',
  additional = 'дополнительное',
  button = 'кнопка',
  hard = 'хард-скил'
}

enum PayType {
  online = 'Онлайн',
  offline = 'При получении'
}

enum AppStateModals {
	product = 'modal:product',
	basket = 'modal:basket',
  address = 'modal:address',
	contacts = 'modal:contacts',
	success = 'modal:success',
	none = 'modal:none',
}

type OrderStage = 1|2;

class Product {
  productId: string;
  productType: ProductTypes;
  productTitle: string;
  productImage: string;
  productPrice: Number;
  productDescription: string;
}

class UserData {
  _email: string;
  _phoneNumber: string;
  _address: string;
  _payType: PayType;

  set payType(payType: string){};

  set phoneNumber(number:string){};

  set address(address:string){};

  set email(email:string){};
  

  reset():void{};
}

class Order extends UserData {
	products: Product[];
}

interface OrderResult {
	id: string;
  total: number;
}

class ProductBasket {
  products: Product[];
  _basketPrice: number;
  _basketCount: number;
  
  addProduct(product: Product):void{};

  removeProduct(product: Product): void{};

  reset():void{};

  getListOfProducts():string[]{return};

  get basketCount():number{return};

  get basketPrice():number{return};
}

class Catalog {
  products: Product[];

  fillCatalog(products: Product[]): void{};
  getCatalog(): Product[] | null{ return };
}

interface IShopAPI {
	getProducts: () => Promise<Product[]>;
  getCertainProduct: (productId: string) => Promise<Product>;
	orderProducts: (order: Order) => Promise<OrderResult[]>;
}

interface ShopState {
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
	orderProducts(): Promise<OrderResult[]>;


	fillUserData(contacts: Partial<UserData>): void;
	isValidContacts(): boolean;

  openModal(modal: AppStateModals): void;
}

// Отображение

class ShopUI {
  productList: ProductUI[];
  basket: BasketUI;
  payForm: PaymentUI;

  renderPage():void{};
}

interface ModalUI {
  modalState: AppStateModals;
  renderModal():void;
}

class BasketUI implements ModalUI {
  modalState: AppStateModals;
  basket: ProductBasket;
  renderModal(): void {
    
  }
}

class ProductUI implements ModalUI {
  modalState: AppStateModals;
  product: Product;
  renderModal(): void {};
  renderCardProduct():void{};
}

class PaymentUI implements ModalUI {
  modalState: AppStateModals;
  userData: UserData;
  renderModal(): void {};
}

