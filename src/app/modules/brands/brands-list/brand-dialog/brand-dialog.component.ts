import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { POLYMORPHEUS_CONTEXT } from "@tinkoff/ng-polymorpheus";
import { TuiDialogContext } from "@taiga-ui/core";
import { BrandModel } from "../../../../shared/models/brand.model";

@Component({
  selector: 'app-brand-dialog',
  templateUrl: './brand-dialog.component.html',
  styleUrls: ['./brand-dialog.component.scss']
})
export class BrandDialogComponent {

  public formGroup: FormGroup = this.formBuilder.group( {
    name : [ this.brandData?.name, Validators.required ],
    origin : [ this.brandData?.origin, Validators.required ],
    description : [ this.brandData?.description, Validators.required ],
  } );

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<any, BrandModel | undefined>,
    private formBuilder: FormBuilder,
  ) { }

  get brandData(): Partial<BrandModel> | undefined {
    return this.context.data;
  }

}
