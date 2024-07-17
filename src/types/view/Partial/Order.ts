import { IChangeable } from '../../base/View';
import { PayType } from '../../model/ShopAPI';

export interface OrderData {
	payType: PayType;
	address: string;
}

export interface OrderSettings extends IChangeable<OrderData> {
  payType: string;
	phone: string;
}