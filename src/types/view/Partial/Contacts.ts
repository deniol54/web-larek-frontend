import { IChangeable } from '../../base/View';


export interface ContactsData {
  phoneNumber: string;
	email: string;
}

export interface ContactsSettings extends IChangeable<ContactsData> {
  phoneNumber: string;
	email: string;
}