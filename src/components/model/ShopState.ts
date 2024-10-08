
import { Catalog, Order, ProductBasket, UserData, Product, IShopAPI, OrderResult } from '../../types/model/ShopAPI';
import { AppStateModals, PersistedState, AppStateChanges, AppStateSettings, ShopState } from '../../types/model/ShopState';

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
    return this.basket.basketPrice;
  }

  get isOrderReady(): boolean {
    return this.basketTotal>0 &&
          this.userData.payment.length>0 &&
          this.userData.email.length>0 &&
          this.userData.address.length>0 &&
          this.userData.phone.length>0;
  }

  loadProducts(products: Product[]): void {
    this.catalog.products.length = 0;
    products.forEach(el =>{
      this.catalog.products.push(el);
    })
  }

 getOrder(): Order {
      this.order = {
        ...this.userData,
        total: this.basket.basketPrice,
        items: Array.from(this.basket.products.map(el=>el.id)),
      }
      this.clearBasket();
      this.persistState();
			this.notifyChanged(AppStateChanges.changeBasket);
      return this.order;
  }

  Order(): void {
    this.notifyChanged(AppStateChanges.order);
  }

  pushProductToBasket() {
    if (!this.basket.products.find(el => el.id === this.selectedProduct.id)){
      this.basket.basketCount++;
      this.basket.basketPrice += this.selectedProduct.price;
      this.basket.products.push(
        {
          ...this.selectedProduct,
          index: this.basket.basketCount,
        });
    }
    this.notifyChanged(AppStateChanges.changeBasket);
  }

  clearBasket(): void {
    this.basket.products = [];
    this.basket.basketPrice = 0;
    this.basket.basketCount = 0;
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
    this.notifyChanged(AppStateChanges.changeBasket);
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
		switch (modal) {
			case AppStateModals.openContacts:
				if (this.basket.basketCount === 0) {
					throw new Error(`No tickets selected`);
				}
				break;
		}
		if (this.openedModal !== modal) {
			this.openedModal = modal;
			this.notifyChanged(AppStateChanges.openModal);
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

  persistState(): void {
		const state: PersistedState = {
			contacts: this.userData,
			products: Array.from(this.basket.products),
		};
		if (localStorage && this.settings.storageKey) {
			localStorage.setItem(this.settings.storageKey, JSON.stringify(state));
		}
	}

  restoreState(): void {
		if (!localStorage || !this.settings.storageKey) {
			return;
		}

		try {
			const state = localStorage.getItem(this.settings.storageKey);
			if (!state) return;
			const { products, contacts } = JSON.parse(state) as PersistedState;
			this.userData = contacts;
			this.clearBasket();
			for (const product of products) {
        this.selectProduct(product.id);
				this.pushProductToBasket();
			}
			this.notifyChanged(AppStateChanges.changeBasket);
			this.notifyChanged(AppStateChanges.orderData);
		} catch (err) {
			console.error('Failed to restore state:', err);
		}
	}

}


