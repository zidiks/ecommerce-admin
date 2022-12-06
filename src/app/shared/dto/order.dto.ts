import { CustomerModel } from "../models/customer.model";
import { OrderState } from "../models/order.model";
import { OrderHistory } from "../enums/order-history.enum";
import { ProductPrevModel } from "../models/product.model";

export interface AddOrderDto {
  orderCode: string;
  customer: CustomerModel;
  state: OrderState;
  delivery: DeliveryDTO;
  paymentMethod: PaymentMethodDTO;
  cartItems: CartItemDTO[];
  subTotalPrice: number;
  totalPrice: number;
  totalDiscount: number;
  historyList: OrderHistoryItemDTO[];
}

export interface UpdateOrderDto extends AddOrderDto { }

export interface CartItemDTO {
  product: ProductPrevModel;
  count: number;
  discount: number;
  total: number;
}

export interface DeliveryDTO {
  deliveryMethod: DeliveryMethodDTO;
  deliveryAddress: string;
  deliveryData: DeliveryMethodFieldValueDTO[];
  comment?: string;
}

export interface DeliveryMethodFieldValueDTO {
  code: string;
  name: string;
  value: string;
}

export interface DeliveryMethodFieldDTO {
  code: string;
  name: string;
}

export interface PaymentMethodDTO {
  name: string;
  description: string;
  media: string;
}

export interface DeliveryMethodDTO {
  name: string;
  description: string;
  media: string;
  fields: DeliveryMethodFieldDTO;
  paymentMethod: PaymentMethodDTO
}

export interface OrderHistoryItemDTO {
  type: OrderHistory,
  details?: string;
  products?: ProductPrevModel[];
}
