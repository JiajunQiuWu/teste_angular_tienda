import { Product } from './product.models';

export interface CheckoutRequest {
  shippingAddress: string;
  paymentMethod: string; // 'CARD' | 'COD' ...
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  total: number;
  items: OrderItem[];
}
