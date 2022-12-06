import { Injectable } from '@angular/core';
import { HttpService } from "../../../shared/services/http.service";
import { Observable } from "rxjs";
import { DeliveryMethodResponseDTO } from "../../../shared/dto/delivery-method.dto";

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(
    private http: HttpService,
  ) { }

  public getDeliveryMethods(): Observable<DeliveryMethodResponseDTO[]> {
    return this.http.get<DeliveryMethodResponseDTO[]>('store/delivery-method');
  }
}
