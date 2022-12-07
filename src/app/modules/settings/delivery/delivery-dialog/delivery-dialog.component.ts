import { Component, Inject } from '@angular/core';
import { POLYMORPHEUS_CONTEXT } from "@tinkoff/ng-polymorpheus";
import { TuiDialogContext } from "@taiga-ui/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DeliveryService } from "../delivery.service";
import {
  AddDeliveryMethodRequestDto,
  DeliveryMethodResponseDto,
  UpdateDeliveryMethodRequestDto
} from "../../../../shared/dto/delivery-method.dto";
import { PaymentService } from "../../payment/payment.service";

@Component({
  selector: 'app-delivery-dialog',
  templateUrl: './delivery-dialog.component.html',
  styleUrls: ['./delivery-dialog.component.scss']
})
export class DeliveryDialogComponent {
  public loading = false;

  public formGroup: FormGroup = this.formBuilder.group( {
    name : [ this.deliveryData?.name, Validators.required ],
    description : [ this.deliveryData?.description, Validators.required ],
    fields: [ this.deliveryData?.fields ? this.deliveryData?.fields?.map(item => item.name) :  [] ],
    paymentMethods: [ this.deliveryData?.paymentMethods || [] ],
  } );

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<any, DeliveryMethodResponseDto | undefined>,
    private formBuilder: FormBuilder,
    private deliveryService: DeliveryService,
    private paymentsService: PaymentService,
  ) { }

  get deliveryData(): Partial<DeliveryMethodResponseDto> | undefined {
    return this.context.data;
  }

  public submit(): void {
    if (this.formGroup.valid) {
      this.loading = true;
      if (this.deliveryData?._id) {
        this.deliveryService.updateDeliveryMethod(this.deliveryData._id, this.formGroup.value as UpdateDeliveryMethodRequestDto).subscribe(
          res => this.context.completeWith(res),
          err => this.context.completeWith(null),
        );
      } else {
        this.deliveryService.addDeliveryMethod(this.formGroup.value as AddDeliveryMethodRequestDto).subscribe(
          res => this.context.completeWith(res),
          err => this.context.completeWith(null),
        );
      }
    } else {
      this.formGroup.markAsTouched();
    }
  }

}
