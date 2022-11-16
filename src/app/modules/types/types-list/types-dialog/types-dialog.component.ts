import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { POLYMORPHEUS_CONTEXT } from "@tinkoff/ng-polymorpheus";
import { TuiDialogContext } from "@taiga-ui/core";
import { ProductTypeModel, ProductTypePrevModel } from "../../../../shared/models/type-property.model";
import { ApiDataModel } from "../../../../shared/models/api-data.model";
import { TypesService } from "../../types.service";

@Component({
  selector: 'app-types-dialog',
  templateUrl: './types-dialog.component.html',
  styleUrls: ['./types-dialog.component.scss']
})
export class TypesDialogComponent {
  public typesData: ApiDataModel<ProductTypeModel>;

  public formGroup: FormGroup = this.formBuilder.group( {
    name : [ null, Validators.required ],
    description : [null, Validators.required ],
    properties: [ [] ],
  } );

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<any, ProductTypePrevModel | undefined>,
    private formBuilder: FormBuilder,
    private typesService: TypesService,
  ) {
    if (this.context.data) {
      typesService.getTypeById(this.context.data?.id).subscribe((res: ProductTypeModel | undefined) => {
        this.typesData = res || null;
        this.formGroup.setValue({
          name: res?.name || '',
          description: res?.description || '',
          properties: res?.properties || [],
        });
      });
    } else {
      this.typesData = null;
    }
  }

}
