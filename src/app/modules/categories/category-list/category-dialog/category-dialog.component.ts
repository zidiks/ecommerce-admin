import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext } from "@taiga-ui/core";
import { CategoryModel } from "../../../../shared/models/category.model";
import { CategoryDialogDataModel } from "../../../../shared/models/category-dialog-data.model";
import { TypesService } from "../../../types/types.service";
import { Observable } from "rxjs";
import { ProductTypePrevModel } from "../../../../shared/models/type-property.model";
import { TuiContextWithImplicit, tuiPure, TuiStringHandler } from "@taiga-ui/cdk";

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent {
  public typesList: Observable<ProductTypePrevModel[] | null>;

  public formGroup: FormGroup = this.formBuilder.group( {
    parent: [ this.parentData?.name || this.categoryData?.parent?.name || 'Корень каталога' ],
    name : [ this.categoryData?.name, Validators.required ],
    handle : [ this.categoryData?.handle, Validators.required ],
    description : [ this.categoryData?.description ],
    type : [ this.categoryData?.productTypeId ],
  } );

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<any, CategoryDialogDataModel>,
    private formBuilder: FormBuilder,
    private typesService: TypesService,
  ) {
    this.typesList = this.typeListData;
  }

  @tuiPure
  public stringify(
    items: ProductTypePrevModel[],
  ): TuiStringHandler<TuiContextWithImplicit<string>> {
    const map = new Map(items.map(({id, name}) => [id, name] as [string, string]));

    return ({$implicit}: TuiContextWithImplicit<string>) => map.get($implicit) || ``;
  }

  public get f(): { [key: string]: AbstractControl; } { return this.formGroup.controls; }

  get categoryData(): Partial<CategoryModel> | undefined {
    return this.context.data.categoryData;
  }

  get parentData(): CategoryModel | undefined {
    return this.context.data.parentData;
  }

  public get typeListData(): Observable<ProductTypePrevModel[] | null> {
    return this.typesService.getTypes();
  }

}
