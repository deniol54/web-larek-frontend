import { OrderData } from '../Partial/Order';
import { ContactsData } from '../Partial/Contacts';
import { HeaderData } from '../Common/Header';

export interface OrderFormData {
	contacts: OrderData & ContactsData;
  header: HeaderData;
	isDisabled: boolean;
	message: string;
	total: string;
	isError: boolean;
}

export interface OrderFormSettings {
	onChange: (data: OrderData) => void;
	onClose: () => void;
	onNext: () => void;
	onBack: () => void;
}