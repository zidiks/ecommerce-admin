import { Pipe, PipeTransform } from '@angular/core';
import { TuiStatus } from "@taiga-ui/kit";
import { statusData } from "../../constants/order-status.const";
import { OrderStatus } from "../../enums/order-status.enum";

@Pipe({
  name: 'orderStatus'
})
export class OrderStatusPipe implements PipeTransform {


  transform(value: any): { color: TuiStatus, label: string } {
    return this.getStatusInfo(value);
  }

  public getStatusInfo(value: any): { color: TuiStatus, label: string } {
    if (value && typeof value === 'string') {
      const statusInfo = statusData[value];
      if (statusInfo) {
        return statusInfo;
      }
      return  statusData[OrderStatus.Unknown];
    } else {
      return statusData[OrderStatus.Unknown];
    }
  }

}
