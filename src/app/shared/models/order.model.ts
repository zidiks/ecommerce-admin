import { CustomerModel } from "./customer.model";

export interface OrderModel {
  id: string;
  startDate: number;
  customer: CustomerModel;
  total: number;
  status: OrderStatus;
  deliveryMethod: DeliveryMethod;
}

export enum OrderStatus {
  Pending = 'PENDING',
  Delivery = 'DELIVERY',
  Paid = 'PAID',
  Draft = 'DRAFT',
  Unknown = 'UNKNOWN',
}

export interface DeliveryMethod {
  id: string;
  label: string;
  description: string;
}
