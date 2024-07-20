import { CardDataBasket } from '../Partial/Card';
import { HeaderData } from '../Common/Header';

export interface BasketData {
	products: CardDataBasket[];
	isActive: boolean;
	header: HeaderData;
	total: string;
}

export interface BasketSettings {
	productList: string;
	total: string;
	onRemove: (id: string) => void;
	onClose: () => void;
	onNext: () => void;
}