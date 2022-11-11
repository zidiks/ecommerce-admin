import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext } from "@taiga-ui/core";
import { CategoryModel } from "../../../../shared/models/category.model";
import { CategoryDialogDataModel } from "../../../../shared/models/category-dialog-data.model";

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent {

  public formGroup: FormGroup = this.formBuilder.group( {
    parent: [ this.parentData?.name || this.categoryData?.parent?.name || 'Корень каталога' ],
    name : [ this.categoryData?.name, Validators.required ],
    handle : [ this.categoryData?.handle, Validators.required ],
    description : [ this.categoryData?.description ],
  } );

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<any, CategoryDialogDataModel>,
    private formBuilder: FormBuilder,
  ) {}

  get categoryData(): Partial<CategoryModel> | undefined {
    return this.context.data.categoryData;
  }

  get parentData(): CategoryModel | undefined {
    return this.context.data.parentData;
  }

}
