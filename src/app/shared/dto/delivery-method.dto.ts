import { PaymentMethodResponseDto } from "./payment-method.dto";
import { ApiId, ApiTimestamp } from "../models/api-data.model";

export interface CrateDeliveryMethodRequestDTO {
  name: string;
  description: string;
  fields: DeliveryMethodFieldDTO;
  paymentMethods: string[];
}

export interface DeliveryMethodFieldDTO {
  code: string;
  name: string;
}

export interface DeliveryMethodResponseDTO extends ApiId, ApiTimestamp {
  name: string;
  description: string;
  fields: DeliveryMethodFieldDTO;
  paymentMethods: PaymentMethodResponseDto[];
}
