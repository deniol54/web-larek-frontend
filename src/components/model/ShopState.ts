
import { Catalog, Order, ProductBasket, UserData, Product, IShopAPI, OrderResult } from '../../types/model/ShopAPI';
import { AppStateModals, AppStateSettings, ShopState } from '../../types/model/ShopState';

export class ShopStateModel implements ShopState{
  catalog: Catalog = {
    products: []
  };
  basket: ProductBasket = {
    products: [],
    basketPrice: 0,
    basketCount: 0
  };

  userData: UserData = {
    payment: '',
    email: '',
    phone: '',
    address: ''

  };

  order: Order = {
    ...this.userData,
    total: 0,
    items: []
  };
  selectedProduct: Product;
  openedModal: AppStateModals = AppStateModals.none;
  modalMessage: string = '';
  isError: boolean = false;

  constructor(protected api: IShopAPI, protected settings?: AppStateSettings) {}

  get basketTotal(): number {
    return this.basket.basketCount;
  }

  get isOrderReady(): boolean {
    return this.basketTotal>0 &&
          this.userData.payment.length>0 &&
          this.userData.email.length>0 &&
          this.userData.address.length>0 &&
          this.userData.phone.length>0;
  }

  async loadProducts(): Promise<void> {
    this.catalog.products.length = 0;
    const products = await this.api.getProducts();
    products.forEach(el =>{
      this.catalog.products.push(el);
    })
  }

  async orderProducts(): Promise<OrderResult> {
    try {
      const result = await this.api.orderProducts(this.order);
      this.basket.products.length = 0;
      this.order.items.length = 0;
      return result;
    }
    catch (error: unknown) {
      if (error instanceof Error) {
				this.setMessage(error.message, true);
			}
			if (typeof error === 'string') {
				this.setMessage(error, true);
			}
    }
  }

  selectProduct(id: string): void {
    const findRes = this.catalog.products.filter(el=>el.id===id);
    if (!findRes.length) {
			throw new Error(`Invalid movie id: ${id}`);
		}
    else 
      this.selectedProduct = findRes[findRes.length-1];
  }

  removeProduct(id: string): void {
    
  }

  fillUserData(contacts: Partial<UserData>): void {
    this.userData = {
			...this.userData,
			...contacts,
		};
  }

  isValidContacts(): boolean {
    const error = this.validateContacts(this.userData);
		if (error) {
			this.setMessage(error, true);
			return false;
		} else {
			this.setMessage(null);
			return true;
		}
  }

  openModal(modal: AppStateModals): void {
    
  }

  setMessage(message: string | null, isError: boolean = false): void {
    this.modalMessage = message;
    this.isError = isError;
  }

  protected validateContacts(contacts: Partial<UserData>): string | null {
		const errors: string[] = [];
		if (!contacts.email || !contacts.phone) {
			errors.push('Email и телефон обязательные поля');
		}
		if (
			contacts.email &&
			!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(contacts.email)
		) {
			errors.push('Некорректный email');
		}
		if (contacts.phone && !/^\+?[0-9]{10,14}$/.test(contacts.phone)) {
			errors.push('Некорректный телефон');
		}
		if (errors.length) {
			return errors.join('. ') + '.';
		}
		return null;
	}
}


