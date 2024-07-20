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
  email: string;
  phoneNumber: string;
  address: string;
  payType: PayType;

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
  basketPrice: number;
  basketCount: number;
}

export interface Catalog {
  products: Product[];
}

export interface IShopAPI {
	getProducts: () => Promise<Product[]>;
  getCertainProduct: (productId: string) => Promise<Product>;
	orderProducts: (order: Order) => Promise<OrderResult[]>;
}



