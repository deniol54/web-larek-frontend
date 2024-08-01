import { CardDataBasket } from '../Partial/Card';
import { ProductCategory } from '../../model/ShopAPI';

export interface ProductData {
	id: string;
	image: string;
	title: string;
  category: ProductCategory;
  price: number;
  description: string;
	isActive: boolean
}

export interface ProductSettings {
	onClose: () => void;
	onNext: () => void;
}