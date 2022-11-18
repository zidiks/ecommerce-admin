import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ApiDataModel } from "../../../shared/models/api-data.model";
import { ProductModel } from "../../../shared/models/product.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent implements OnInit {
  public breadcrumbs;
  public productId;
  public productData: ApiDataModel<ProductModel>;

  public formGroup: FormGroup = this.formBuilder.group({
    name: [null, Validators.required],
    media: [],
    price: [null, Validators.required],
    brand: [null, Validators.required],
    description: [null],
    categoryId: [null],
    productTypeId: [null],
    productProps: this.formBuilder.array([]),
  });

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
    this.productId = this.route.snapshot.params['id'];
    this.breadcrumbs = [
      {
        caption: `Главная`,
        routerLink: `/`,
      },
      {
        caption: `Товары`,
        routerLink: `/products`,
      },
      {
        caption: `${!this.productId ? 'Новый товар' : 'Детали'}`,
        routerLink: `/products/details/${this.productId}`,
      }
    ];
  }

  ngOnInit(): void {
  }

}
