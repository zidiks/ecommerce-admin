import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ApiDataModel } from "../../../shared/models/api-data.model";
import { ProductModel, ProductPropertyValueModel } from "../../../shared/models/product.model";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ProductsService } from "../products.service";
import { TypesService } from "../../types/types.service";
import { CategoryLinearModel, CategoryModel } from "../../../shared/models/category.model";
import { BrandModel } from "../../../shared/models/brand.model";
import {
  ProductTypeModel,
  ProductTypePrevModel,
  ProductTypePropertyModel
} from "../../../shared/models/type-property.model";
import { forkJoin, of } from "rxjs";
import { BrandsService } from "../../brands/brands.service";
import { CategoriesService } from "../../categories/categories.service";
import { EMPTY_ARRAY, TuiContextWithImplicit, TuiHandler, tuiPure, TuiStringHandler } from "@taiga-ui/cdk";
import { TuiAlertService, TuiNotification, TuiValueContentContext } from "@taiga-ui/core";
import { maxFilesLength } from "../../../shared/functions/form-control-max-filex.func";
import { TuiFileLike } from "@taiga-ui/kit";
import { productPropertyControl } from "../../../shared/functions/product-property-control.func";

interface DataResponse {
  product?: ProductModel | null;
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
  public currentTypeData: ApiDataModel<ProductTypeModel>;
  public linearCategoriesData: CategoryLinearModel[] = [];
  rejectedFiles: readonly TuiFileLike[] = [];

  readonly mediaControl = new FormControl([], [maxFilesLength(5)]);

  public formGroup: FormGroup = this.formBuilder.group({
    name: [null, Validators.required],
    media: [[]],
    price: [null, Validators.required],
    brand: [null, Validators.required],
    description: [null],
    categoryId: [null],
    productTypeId: [null],
    productProps: this.formBuilder.group({}),
  });

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private typesService: TypesService,
    private brandsService: BrandsService,
    private categoriesService: CategoriesService,
    @Inject(TuiAlertService) private readonly alertService: TuiAlertService,
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
    this.mediaControl.statusChanges.subscribe(response => {
      console.info(`STATUS`, response);
      console.info(`ERRORS`, this.mediaControl.errors, `\n`);
    });
    this.f['productTypeId'].valueChanges.subscribe((value: string) => {
      if (value) {
        this.setPropertiesControls(value);
      }
    });
    this.f['categoryId'].valueChanges.subscribe((value: string) => {
      if (this.categoriesData?.length) {
        const categoryItem = this.linearCategoriesData.find((category => category._id === value));
        if (categoryItem) {
          this.f['productTypeId'].setValue(categoryItem.productTypeId);
        }
      }
    });
  }

  public refreshData(): void {
    this.formGroup.reset();
    this.productData = undefined;
    forkJoin({
      product: this.productId ? this.productsService.getProductById(this.productId) : of(null),
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
      console.log(this.formGroup.value);
      if (res.product) {
        const productData = res.product;
        setTimeout(() => {
          this.formGroup.patchValue({
            name: productData.name,
            media: productData.media,
            price: productData.price,
            brand: productData.brand._id,
            description: productData.description,
            categoryId: productData.categoryId,
            productTypeId: productData.productTypeId,
          });
        });
      } else {
        this.currentTypeData = null;
      }
    });
  }

  public get f(): { [key: string]: AbstractControl; } { return this.formGroup.controls; }

  public get fProp(): { [key: string]: AbstractControl; } { return (this.f['productProps'] as FormGroup).controls; }

  @tuiPure
  public stringifyBrands(
    items: BrandModel[],
  ): TuiStringHandler<TuiContextWithImplicit<string>> {
    const map = new Map(items.map(({_id, name}) => [_id, name] as [string, string]));

    return ({$implicit}: TuiContextWithImplicit<string>) => map.get($implicit) || ``;
  }

  @tuiPure
  public stringifyTypes(
    items: ProductTypePrevModel[],
  ): TuiStringHandler<TuiContextWithImplicit<string>> {
    const map = new Map(items.map(({_id, name}) => [_id, name] as [string, string]));

    return ({$implicit}: TuiContextWithImplicit<string>) => map.get($implicit) || ``;
  }

  readonly categoryContent: TuiStringHandler<TuiValueContentContext<readonly unknown[]>> = ({$implicit}) => {
    const categoryItem = (this.linearCategoriesData).find((category => category._id === $implicit.toString()));
    if (categoryItem) {
      return categoryItem.name;
    }
    return 'Неизвестно';
  };

  readonly categoryChildHandler: TuiHandler<CategoryModel, readonly CategoryModel[]> = item => item.children || EMPTY_ARRAY;

  private linearCategory(treeData: CategoryModel[]): CategoryLinearModel[] {
    const recursionFn = (linearTree: CategoryLinearModel[],categoryNode: CategoryModel): void => {
      linearTree.push({
        _id: categoryNode._id,
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

  public onReject(files: TuiFileLike | readonly TuiFileLike[]): void {
    this.rejectedFiles = [...this.rejectedFiles, ...(files as TuiFileLike[])];
  }

  public removeFile({name}: File): void {
    this.mediaControl.setValue(
      this.mediaControl.value?.filter((current: File) => current.name !== name) ?? [],
    );
  }

  public clearRejected({name}: TuiFileLike): void {
    this.rejectedFiles = this.rejectedFiles.filter(
      rejected => rejected.name !== name,
    );
  }

  private setPropertiesControls(productTypeId: string): void {
    this.currentTypeData = undefined;
    this.clearPropertiesControls();
    this.typesService.getTypeById(productTypeId).subscribe((res: ProductTypeModel | null) => {
      if (res) {
        res.properties.forEach((property: ProductTypePropertyModel) => {
          (this.f['productProps'] as FormGroup).addControl(property._id, productPropertyControl(property.type));
          const productPropValue: ProductPropertyValueModel | undefined = this.productData?.productProps.find((prop: ProductPropertyValueModel) => prop.productTypePropertyId === property._id);
          if (productPropValue) {
            this.fProp[property._id].setValue(productPropValue.value);
          }
        });
        this.currentTypeData = res;
      } else {
        this.alertService.open(`Невозможно загрузить свойства для сущности c id: ${productTypeId}`, {label: `Ошибка загрузки`, status: TuiNotification.Error, autoClose: 3000}).subscribe();
      }
    });
  }

  private clearPropertiesControls(): void {
    Object.keys((this.f['productProps'] as FormGroup).controls).forEach((controlKey: string) => {
      (this.f['productProps'] as FormGroup).removeControl(controlKey);
    });
  }

}
