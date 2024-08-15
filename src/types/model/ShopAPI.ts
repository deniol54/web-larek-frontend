// Данные

export enum ProductCategory {
  soft = 'софт-скил',
  other = 'другое',
  additional = 'дополнительное',
  button = 'кнопка',
  hard = 'хард-скил'
}

export enum ProductCategoryReverse {
  'софт-скил' = 'soft',
  'другое' = 'other',
  'дополнительное' = 'additional',
  'кнопка' = 'button',
  'хард-скил'= 'hard'
}

export enum PayType {
  online = 'card',
  offline = 'cash'
}


export interface Product {
  id: string;
  description: string;
  image: string;
  title: string;
  category: ProductCategory;
  price: number;
  index?: number;
}

export interface UserData {
  payment: string;
  email: string;
  phone: string;
  address: string;
}

export interface Order extends UserData {
  total: number,
	items: string[];
}

export interface OrderResult {
	id: string;
  total: number;
}

export interface ProductBasket {
  products: Product[];
  basketPrice: number;
  basketCount: number;
}

export interface Catalog {
  products: Product[];
}

export interface IShopAPI {
	getProducts: () => Promise<Product[]>;
  getCertainProduct: (productId: string) => Promise<Product>;
	orderProducts: (order: Order) => Promise<OrderResult>;
}



