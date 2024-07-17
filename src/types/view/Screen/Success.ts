import { HeaderData } from '../Common/Header';

export interface SuccessData {
	content: HeaderData;
  total: number;
	isActive: boolean;
}

export interface SuccessSettings {
	onClose: () => void;
}