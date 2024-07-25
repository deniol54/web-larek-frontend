import './scss/styles.scss';

import { ShopAPI } from './components/model/ShopAPI';
import { API_URL, CDN_URL } from './utils/constants';
import { ShopStateModel } from './components/model/ShopState';
import { MainScreen } from './components/view/screen/Main';
import { MainController } from './components/controller/Main';
import { CardData } from './types/view/Partial/Card';
const obj = new ShopAPI(CDN_URL, API_URL);
const model = new ShopStateModel(new ShopAPI(CDN_URL,API_URL));
const controller  = new MainController(model);
const screen = new MainScreen(new MainController(model));
model.loadProducts().then(()=>{
  screen.items = model.catalog.products;
});

