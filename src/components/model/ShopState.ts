
import { Catalog, Order, ProductBasket, UserData, Product, IShopAPI, OrderResult } from '../../types/model/ShopAPI';
import { AppStateModals,AppStateChanges, AppStateSettings, ShopState } from '../../types/model/ShopState';

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

  pushProduct2Basket() {
    if (!this.basket.products.find(el => el.id === this.selectedProduct.id)){
      this.basket.basketCount++;
      this.basket.basketPrice += this.selectedProduct.price;
      this.basket.products.push(
        {
          ...this.selectedProduct,
          index: this.basketTotal,
        });
    }
    this.notifyChanged(AppStateChanges.openBasket);
  }

  selectProduct(id: string): void {
    const findRes = this.catalog.products.filter(el=>el.id===id);
    if (!findRes.length) {
			throw new Error(`Invalid products id: ${id}`);
		}
    else 
      this.selectedProduct = findRes[findRes.length-1];
  }

  removeProduct(id: string): void {
    const findRes = this.basket.products.filter(el=>el.id===id);
    const removedProduct = findRes[findRes.length-1];
    this.basket.basketPrice -= removedProduct.price;
    this.basket.products.map(el=>{
      if(el.index > removedProduct.index){
        const res = el.index-=1;
        return res;
      }
    });
    this.basket.products = this.basket.products.filter(el => {
      return el.id !== id;
    });
    this.basket.basketCount -=1;
    this.notifyChanged(AppStateChanges.openBasket);
  }

  fillUserData(contacts: Partial<UserData>): void {
    this.userData = {
			...this.userData,
			...contacts,
		};
    this.notifyChanged(AppStateChanges.orderData);
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
		// switch (modal) {
		// 	case AppStateModals.contacts:
		// 		if (this.basket.basketCount === 0) {
		// 			throw new Error(`No tickets selected`);
		// 		}
		// 		break;
		// }
		if (this.openedModal !== modal) {
			this.openedModal = modal;
			this.notifyChanged(AppStateChanges.openModal);
      console.log(this.openedModal);
      console.log(this.settings);
		}
	}

  protected notifyChanged(changed: AppStateChanges): void {
		this.settings.onChange(changed);
	}

  setMessage(message: string | null, isError: boolean = false): void {
    this.modalMessage = message;
    this.isError = isError;
    this.notifyChanged(AppStateChanges.setModalMessage);
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


