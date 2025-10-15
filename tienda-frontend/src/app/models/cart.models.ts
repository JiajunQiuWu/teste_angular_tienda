import { Product } from './product.models';

export interface CartItem {
  id?: number;
  user?: any;
  product: Product;
  quantity: number;
}
