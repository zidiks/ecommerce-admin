import { CustomerModel } from "../models/customer.model";
import { CartItem, DeliveryMethod, OrderHistoryItem, OrderState, PaymentMethod } from "../models/order.model";

export interface AddOrderDto {
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

export interface UpdateOrderDto extends AddOrderDto { }
