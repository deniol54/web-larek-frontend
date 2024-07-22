import './scss/styles.scss';

import { ShopAPI } from './components/model/ShopAPI';
import { API_URL, CDN_URL } from './utils/constants';

const obj = new ShopAPI(CDN_URL, API_URL);

console.log(obj.getProducts());

console.log(obj.getCertainProduct('854cef69-976d-4c2a-a18c-2aa45046c390'));

const order = {
  "payment": "online",
  "email": "test@test.ru",
  "phone": "+71234567890",
  "address": "Spb Vosstania 1",
  "total": 2200,
  "items": [
      "854cef69-976d-4c2a-a18c-2aa45046c390",
      "c101ab44-ed99-4a54-990d-47aa2bb4e7d9"
  ]
}

console.log(obj.orderProducts(order));
