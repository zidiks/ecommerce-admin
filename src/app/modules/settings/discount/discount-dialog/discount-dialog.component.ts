import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {POLYMORPHEUS_CONTEXT} from "@tinkoff/ng-polymorpheus";
import {TuiDialogContext} from "@taiga-ui/core";
import {DiscountConfigDto, DiscountConfigResponseDto} from "../../../../shared/dto/discount-config.dto";
import {DiscountService} from "../discount.service";

@Component({
  selector: 'app-discount-dialog',
  templateUrl: './discount-dialog.component.html',
  styleUrls: ['./discount-dialog.component.scss']
})
export class DiscountDialogComponent {
  public loading = false;

  public formGroup: FormGroup = this.formBuilder.group( {
    minCount : [ this.discountConfig?.minCount, Validators.required ],
    discount : [ this.discountConfig?.discount, Validators.required ],
  } );

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<any, DiscountConfigResponseDto>,
    private formBuilder: FormBuilder,
    private discountService: DiscountService,
  ) { }

  get discountConfig(): DiscountConfigResponseDto{
    return this.context.data;
  }

  public submit(): void {
    if (this.formGroup.valid) {
      this.loading = true;
      if (this.discountConfig._id){
        this.discountService.updateDiscountConfig(this.discountConfig._id, this.formGroup.value as DiscountConfigDto).subscribe(
          res => this.context.completeWith(res),
          err => this.context.completeWith(null),
        );
      }
    } else {
      this.formGroup.markAsTouched();
    }
  }
}
