import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ApiDataModel } from "../../../shared/models/api-data.model";
import { ProductModel } from "../../../shared/models/product.model";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductsService } from "../products.service";
import { TypesService } from "../../types/types.service";
import { CategoryLinearModel, CategoryModel } from "../../../shared/models/category.model";
import { BrandModel } from "../../../shared/models/brand.model";
import { ProductTypePrevModel } from "../../../shared/models/type-property.model";
import { forkJoin } from "rxjs";
import { BrandsService } from "../../brands/brands.service";
import { CategoriesService } from "../../categories/categories.service";
import { EMPTY_ARRAY, TuiContextWithImplicit, TuiHandler, tuiPure, TuiStringHandler } from "@taiga-ui/cdk";
import { TuiValueContentContext } from "@taiga-ui/core";

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
  public categoriesData: ApiDataModel<CategoryModel[]>;
  public productTypesPrevsData: ApiDataModel<ProductTypePrevModel[]>;
  public linearCategoriesData: CategoryLinearModel[] = [];

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
    this.f['categoryId'].valueChanges.subscribe((value: string) => {
      if (this.categoriesData?.length) {
        const categoryItem = this.linearCategoriesData.find((category => category.id === value));
        if (categoryItem) {
          this.f['productTypeId'].setValue(categoryItem.productTypeId);
        }
      }
    });
  }

  public refreshData(): void {
    this.formGroup.reset();
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
        if (res.categories) {
          this.linearCategoriesData = this.linearCategory(res.categories);
        }
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
          });
        }
      });
    }
  }

  public get f(): { [key: string]: AbstractControl; } { return this.formGroup.controls; }

  @tuiPure
  public stringifyBrands(
    items: BrandModel[],
  ): TuiStringHandler<TuiContextWithImplicit<string>> {
    const map = new Map(items.map(({id, name}) => [id, name] as [string, string]));

    return ({$implicit}: TuiContextWithImplicit<string>) => map.get($implicit) || ``;
  }

  @tuiPure
  public stringifyTypes(
    items: ProductTypePrevModel[],
  ): TuiStringHandler<TuiContextWithImplicit<string>> {
    const map = new Map(items.map(({id, name}) => [id, name] as [string, string]));

    return ({$implicit}: TuiContextWithImplicit<string>) => map.get($implicit) || ``;
  }

  readonly categoryContent: TuiStringHandler<TuiValueContentContext<readonly unknown[]>> = ({$implicit}) => {
    const categoryItem = (this.linearCategoriesData).find((category => category.id === $implicit.toString()));
    if (categoryItem) {
      return categoryItem.name;
    }
    return 'Неизвестно';
  };

  readonly categoryChildHandler: TuiHandler<CategoryModel, readonly CategoryModel[]> = item => item.children || EMPTY_ARRAY;

  private linearCategory(treeData: CategoryModel[]): CategoryLinearModel[] {
    const recursionFn = (linearTree: CategoryLinearModel[],categoryNode: CategoryModel): void => {
      linearTree.push({
        id: categoryNode.id,
        name: categoryNode.name,
        productTypeId: categoryNode.productTypeId,
      });
      if (categoryNode.children?.length) {
        categoryNode.children.forEach((child: CategoryModel) => {
          recursionFn(linearTree, child);
        });
      }
    }
    const linearData: CategoryLinearModel[] = [];
    treeData.forEach((item: CategoryModel) => recursionFn(linearData, item));
    return linearData;
  }

}
