// Данные

export enum ProductCategory{
  soft = 'софт-скил',
  other = 'другое',
  additional = 'дополнительное',
  button = 'кнопка',
  hard = 'хард-скил'
}

export enum PayType {
  online = 'Онлайн',
  offline = 'При получении'
}

export type ApiListResponse<Type> = {
	total: number;
	items: Type[];
};


export interface Product {
  productId: string;
  productType: ProductCategory;
  productTitle: string;
  productImage: string;
  productPrice: Number;
  productDescription: string;
}

export interface UserData {
  _email: string;
  _phoneNumber: string;
  _address: string;
  _payType: PayType;

  set payType(payType: string);

  set phoneNumber(number:string);

  set address(address:string);

  set email(email:string);
  

  reset():void;
}

export interface Order extends UserData {
	products: Product[];
}

export interface OrderResult {
	id: string;
  total: number;
}

export interface ProductBasket {
  products: Product[];
  _basketPrice: number;
  _basketCount: number;
  
  addProduct(product: Product):void;

  removeProduct(product: Product): void;

  reset():void;

  getListOfProducts():string[];

  get basketCount():number;

  get basketPrice():number;
}

export interface Catalog {
  products: Product[];

  fillCatalog(products: Product[]): void;
  getCatalog(): Product[] | null;
}

export interface IShopAPI {
	getProducts: () => Promise<Product[]>;
  getCertainProduct: (productId: string) => Promise<Product>;
	orderProducts: (order: Order) => Promise<OrderResult[]>;
}



