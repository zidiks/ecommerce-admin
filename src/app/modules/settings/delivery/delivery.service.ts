import { Injectable } from '@angular/core';
import { HttpService } from "../../../shared/services/http.service";
import { Observable } from "rxjs";
import { DeliveryMethodResponseDto } from "../../../shared/dto/delivery-method.dto";

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(
    private http: HttpService,
  ) { }

  public getDeliveryMethods(): Observable<DeliveryMethodResponseDto[]> {
    return this.http.get<DeliveryMethodResponseDto[]>('store/delivery-method');
  }
}
