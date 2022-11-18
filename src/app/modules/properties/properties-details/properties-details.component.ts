import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import {
  EMPTY_ARRAY,
  TuiBooleanHandler,
  TuiContextWithImplicit,
  tuiPure,
  TuiStringHandler,
  TuiValidationError
} from "@taiga-ui/cdk";
import {
  ProductTypePropertyDataModel,
  ProductTypePropertyItemModel
} from "../../../shared/models/product-type-property-data.model";
import { ProductTypePropertyType } from "../../../shared/enums/product-property.enum";
import { productsTypesPropertiesData } from "../../../shared/constants/product-type-property.const";
import { ApiDataModel } from "../../../shared/models/api-data.model";
import { ProductTypePropertyModel } from "../../../shared/models/type-property.model";
import { PropertiesService } from "../properties.service";
import { pairwise } from "rxjs";

@Component({
  selector: 'app-properties-details',
  templateUrl: './properties-details.component.html',
  styleUrls: ['./properties-details.component.scss']
})
export class PropertiesDetailsComponent implements OnInit {
  public breadcrumbs;
  public propertyId;
  public typesList: ProductTypePropertyItemModel[] = this.productTypePropertyTypes;
  public propertyData: ApiDataModel<ProductTypePropertyModel>;
  public productTypePropertyType = ProductTypePropertyType;

  public formGroup: FormGroup = this.formBuilder.group({
    name: [``, Validators.required],
    description: [null],
    showCard: [false],
    showFilter: [false],
    type: [null, Validators.required],
    options: [ [] ],
  });

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private propertiesService: PropertiesService,
  ) {
    this.propertyId = this.route.snapshot.params['id'];
    this.breadcrumbs = [
      {
        caption: `Главная`,
        routerLink: `/`,
      },
      {
        caption: `Свойства`,
        routerLink: `/properties`,
      },
      {
        caption: `${!this.propertyId ? 'Новое свойство' : 'Детали'}`,
        routerLink: `/properties/details/${this.propertyId}`,
      }
    ];
  }

  private createControlValidator(handler: TuiBooleanHandler<string>): ValidatorFn {
    return ({value}: AbstractControl) => {
      const invalidTags = value ? value.filter(handler) : EMPTY_ARRAY;

      return invalidTags.length > 0
        ? {
          tags: new TuiValidationError(`Some tags are invalid`),
        }
        : null;
    };
  }

  public tagDigitsValidator(tag: string): boolean {
    return /\d/.test(tag);
  }

  public tagWordsValidator(tag: string): boolean {
    return true;
  }

  public ngOnInit(): void {
    if (this.propertyId) {
      this.refreshData();
    } else {
      this.propertyData = null;
    }
    this.f['type'].valueChanges.pipe(pairwise()).subscribe(([prev, next]: [ProductTypePropertyType, ProductTypePropertyType]) => {
      if (ProductTypePropertyType.NumberSelect === next) {
        this.f['options'].clearValidators();
        this.f['options'].setValidators(this.createControlValidator(this.tagDigitsValidator));
      } else {
        this.f['options'].clearValidators();
        this.f['options'].setValidators(this.createControlValidator(this.tagWordsValidator));
      }
      if (!productsTypesPropertiesData[next].options && productsTypesPropertiesData[prev].options) {
        this.f['options'].reset();
      }
    });
  }

  public refreshData(): void {
    if (this.propertyId) {
      this.propertyData = undefined;
      this.propertiesService.getPropertyById(this.propertyId).subscribe((res: ProductTypePropertyModel | undefined) => {
        this.propertyData = res || null;
        if (res) {
          setTimeout(() => {
            this.formGroup.setValue({
              name: res.name,
              description: res.description,
              showCard: res.showCard,
              showFilter: res.showFilter,
              type: res.type,
              options: res.options || [],
            });
          });
        }
      });
    }
  }

  public get f(): { [key: string]: AbstractControl; } { return this.formGroup.controls; }

  private get productTypePropertyTypes(): ProductTypePropertyItemModel[] {
    return Object.entries(productsTypesPropertiesData).map(([key, value]: [string, ProductTypePropertyDataModel]) => {
      return {
        key: key as ProductTypePropertyType,
        ...value,
      }
    })
  }

  @tuiPure
  public stringify(
    items: ProductTypePropertyItemModel[],
  ): TuiStringHandler<TuiContextWithImplicit<string>> {
    const map = new Map(items.map(({key, name}) => [key.toString(), name] as [string, string]));

    return ({$implicit}: TuiContextWithImplicit<string>) => map.get($implicit) || ``;
  }

}
