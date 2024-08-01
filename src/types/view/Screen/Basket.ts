import { CardDataBasket } from '../Partial/Card';
import { HeaderData } from '../Common/Header';

export interface BasketData {
	products: CardDataBasket[];
	isActive: boolean;
	total: string;
}

export interface BasketSettings {
	onRemove: (id: string) => void;
	onClose: () => void;
	onNext: () => void;
}