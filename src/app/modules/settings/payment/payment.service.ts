import { Injectable } from '@angular/core';
import { HttpService } from "../../../shared/services/http.service";
import { Observable } from "rxjs";
import { PaymentMethodResponseDto } from "../../../shared/dto/payment-method.dto";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private http: HttpService,
  ) { }

  public getPaymentMethods(): Observable<PaymentMethodResponseDto[]> {
    return this.http.get<PaymentMethodResponseDto[]>('store/payment-method');
  }
}
