import { CardDataBasket } from '../Partial/Card';
import { HeaderData } from '../Common/Header';

export interface BasketData {
	tickets: CardDataBasket[];
	isActive: boolean;
	header: HeaderData;
	isDisabled: boolean;
	total: string;
}

export interface BasketSettings {
	onRemove: (id: string) => void;
	onClose: () => void;
	onNext: () => void;
	onBack: () => void;
}