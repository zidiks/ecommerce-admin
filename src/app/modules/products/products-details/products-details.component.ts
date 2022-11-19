import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ApiDataModel } from "../../../shared/models/api-data.model";
import { ProductModel } from "../../../shared/models/product.model";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductsService } from "../products.service";
import { TypesService } from "../../types/types.service";
import { CategoryModel } from "../../../shared/models/category.model";
import { BrandModel } from "../../../shared/models/brand.model";
import { ProductTypePrevModel } from "../../../shared/models/type-property.model";
import { forkJoin } from "rxjs";
import { BrandsService } from "../../brands/brands.service";
import { CategoriesService } from "../../categories/categories.service";

interface DataResponse {
  product: ProductModel | null;
  brands: BrandModel[] | null;
  categories: CategoryModel[] | null;
  productTypes: ProductTypePrevModel[] | null;
}

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent implements OnInit {
  public breadcrumbs;
  public productId;
  public productData: ApiDataModel<ProductModel>;
  public brandsData: ApiDataModel<BrandModel[]>;
  public categoriesData: ApiDataModel<CategoryModel[]>
  public productTypesPrevsData: ApiDataModel<ProductTypePrevModel[]>

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
    private productsService: ProductsService,
    private typesService: TypesService,
    private brandsService: BrandsService,
    private categoriesService: CategoriesService,
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
    this.refreshData();
  }

  public refreshData(): void {
    if (this.productId) {
      this.productData = undefined;
      forkJoin({
        product: this.productsService.getProductById(this.productId),
        brands: this.brandsService.getBrands(),
        categories: this.categoriesService.getCategories(),
        productTypes: this.typesService.getTypes(),
      }).subscribe((res: DataResponse) => {
        this.productData = res.product;
        this.brandsData = res.brands;
        this.categoriesData = res.categories;
        this.productTypesPrevsData = res.productTypes;
        if (res.product) {
          const productData = res.product;
          setTimeout(() => {
            this.formGroup.patchValue({
              name: productData.name,
              media: productData.media,
              price: productData.price,
              brand: productData.brand.id,
              description: productData.description,
              categoryId: productData.categoryId,
              productTypeId: productData.productTypeId,
            });
            console.log(this.formGroup.value);
          });
        }
      });
    }
  }

  public get f(): { [key: string]: AbstractControl; } { return this.formGroup.controls; }

}
