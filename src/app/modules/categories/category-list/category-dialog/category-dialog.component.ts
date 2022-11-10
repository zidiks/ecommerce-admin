import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext } from "@taiga-ui/core";
import { CategoryModel } from "../../../../shared/models/category.model";

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent implements OnInit {

  public formGroup: FormGroup = this.formBuilder.group( {
    name : [ this.contextData?.name || null, Validators.required ],
    handle : [ this.contextData?.handle, Validators.required ],
    description : [ this.contextData?.description ],
  } );

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<any, Partial<CategoryModel>>,
    private formBuilder: FormBuilder,
  ) { }

  get contextData(): Partial<CategoryModel> | undefined {
    return this.context.data;
  }

  ngOnInit(): void {
  }

}
