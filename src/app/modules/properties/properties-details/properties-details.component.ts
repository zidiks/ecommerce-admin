import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TuiContextWithImplicit, tuiPure, TuiStringHandler } from "@taiga-ui/cdk";
import {
  ProductTypePropertyDataModel,
  ProductTypePropertyItemModel
} from "../../../shared/models/product-type-property-data.model";
import { ProductTypePropertyType } from "../../../shared/enums/product-property.enum";
import { productsTypesPropertiesData } from "../../../shared/constants/product-type-property.const";

@Component({
  selector: 'app-properties-details',
  templateUrl: './properties-details.component.html',
  styleUrls: ['./properties-details.component.scss']
})
export class PropertiesDetailsComponent implements OnInit {
  public breadcrumbs;
  public propertyId;
  public typesList: ProductTypePropertyItemModel[] = this.productTypePropertyTypes;

  public formGroup: FormGroup = this.formBuilder.group({
    name: [``, Validators.required],
    description: [null],
    showCard: [false],
    showFilter: [false],
    type: [null, Validators.required],
    options:this.formBuilder.array([]),
  });

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
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
        caption: `Детали`,
        routerLink: `/properties/${this.propertyId}`,
      }
    ];
  }

  ngOnInit(): void {
  }

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
