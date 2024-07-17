import { IClickable } from '../../base/View';
import { ProductCategory } from '../../model/ShopAPI';

export interface CardData {
	id: string;
	image: string;
	title: string;
  category: ProductCategory;
  price: number;
}

export interface CardDataModal extends CardData {
  text: string;
}

export interface CardDataBasket {
  id: string;
	title: string;
  price: number;
}

export interface CardSettings extends IClickable<string> {
	image: string;
	title: string;
  category: string;
  price: string;
  text: string;
  isModal: boolean;
  isBasket: boolean;
}