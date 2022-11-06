import { CustomerModel } from "./customer.model";

export interface OrderModel {
  id: string;
  startDate: number;
  customer: CustomerModel;
  total: number;
  status: OrderStatus;
}

export enum OrderStatus {
  Pending = 'PENDING',
  Delivery = 'DELIVERY',
  Paid = 'PAID',
  Draft = 'DRAFT',
}
