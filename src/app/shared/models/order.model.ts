import { CustomerModel } from "./customer.model";
import { OrderHistory } from "../enums/order-history.enum";
import { StateColor } from "../enums/state-colors.enum";
import { ProductPrevModel } from "./product.model";

export interface OrderModel {
  _id?: string;
  orderCode: string;
  customer: CustomerModel;
  createdAt: string;
  updatedAt: string;
  state: OrderState;
  delivery: {
    deliveryMethod: DeliveryMethod;
    deliveryAddress: string;
  };
  paymentMethod: PaymentMethod;
  cartItems: CartItem[];
  subTotalPrice: number;
  totalPrice: number;
  totalDiscount: number;
  historyList: OrderHistoryItem[];
}

export interface DeliveryMethod {
  id: string;
  name: string;
  description: string;
  media: string;
}

export interface OrderHistoryItem {
  type: OrderHistory,
  details?: string;
  time: number;
  products?: ProductPrevModel[];
}

export interface HistoryDataItem {
  type: OrderHistory;
  color: string;
  label: string;
  icons: string;
}

export interface HistoryDataItemWithCode {
  code: string;
  color: string;
  label: string;
  icons: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  media: string;
}

export interface CartItem {
  product: ProductPrevModel;
  count: number;
  discount: number;
}

export interface OrderState {
  id: string;
  label: string;
  color: StateColor;
  description?: string;
}
