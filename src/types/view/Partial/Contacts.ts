import { IChangeable } from '../../base/View';


export interface ContactsData {
  phone: string;
	email: string;
}

export interface ContactsSettings extends IChangeable<ContactsData> {
  phone: string;
	email: string;
}