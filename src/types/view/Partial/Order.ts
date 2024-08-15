import { IChangeable } from '../../base/View';
import { PayType } from '../../model/ShopAPI';

export interface OrderData {
	payment: string;
	address: string;
}

export interface OrderSettings extends IChangeable<OrderData> {
  payment: string;
	address: string;
}