import { Product } from '../../model/ShopAPI';

export interface ProductData {
	product: Product,
	isActive: boolean
}

export interface ProductSettings {
	onClose: () => void;
	onNext: () => void;
}