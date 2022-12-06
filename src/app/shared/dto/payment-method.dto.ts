import { ApiId } from "../models/api-data.model";

export interface PaymentMethodResponseDto extends ApiId {
  name: string;
  description: string;
}
