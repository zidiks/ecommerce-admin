import { CustomerModel } from "./customer.model";
import { OrderHistory } from "../enums/order-history.enum";
import { StateColor } from "../enums/state-colors.enum";

export interface OrderModel {
  id: string;
  orderCode: string;
  customer: CustomerModel;
  startDate: number;
  state: OrderState;
  delivery: {
    deliveryMethod: DeliveryMethod;
    deliveryAddress: string;
  };
  paymentMethod: PaymentMethod;
  cartItems: CartItem[];
  totalPrice: number;
  totalDiscount: number;
  historyList: OrderHistoryItem[];
}

export interface DeliveryMethod {
  id: string;
  label: string;
  description: string;
}

export interface OrderHistoryItem {
  type: OrderHistory,
  details?: string;
  time: number;
  //TO DO
  products?: any[];
}

export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  media: string;
}

export interface CartItem {
  //TO DO
  product: any;
  count: number;
  discount: number;
}

interface OrderState {
  id: string;
  label: string;
  color: StateColor;
  description?: string;
}
