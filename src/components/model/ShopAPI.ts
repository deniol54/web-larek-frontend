import {IShopAPI, Order, OrderResult, Product} from '../../types/model/ShopAPI';
import {Api, ApiListResponse} from '../base/api';
export class ShopAPI extends Api implements IShopAPI {

  readonly contentUrl: string;

  constructor(contentUrl: string, baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
    this.contentUrl = contentUrl;
  }

  async getProducts(): Promise<Product[]> {
    const response: Object = await this.get('/product/');
    const data:ApiListResponse<Product> = <ApiListResponse<Product>>response;
    return data.items.map(item=>({
      ...item,
      image: this.contentUrl + item.image,
    }));
  }

  async  getCertainProduct(productId: string): Promise<Product> {
    const response: Object = await this.get('/product/'+productId);
    const data: Product = <Product>response;
    data.image = this.contentUrl + data.image;
    return data;
  }

  async orderProducts(order: Order): Promise<OrderResult> {
    const response: Object = await this.post('/order',order);
    return <OrderResult>response;
  }
}