import { CustomerModel } from "./customer.model";
import { OrderStatus } from "../enums/order-status.enum";
import { OrderHistory } from "../enums/order-history.enum";

export interface OrderModel {
  id: string;
  startDate: number;
  customer: CustomerModel;
  total: number;
  status: OrderStatus;
  deliveryMethod: DeliveryMethod;
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
  products?: any[];
}
