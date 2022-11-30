import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiDataModel } from "../../../shared/models/api-data.model";
import { ProductModel, ProductPropertyValueModel } from "../../../shared/models/product.model";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductsService } from "../products.service";
import { TypesService } from "../../types/types.service";
import { CategoryLinearModel, CategoryModel } from "../../../shared/models/category.model";
import { BrandModel } from "../../../shared/models/brand.model";
import {
  ProductTypeModel,
  ProductTypePrevModel,
  ProductTypePropertyModel
} from "../../../shared/models/type-property.model";
import { forkJoin, Observable, of } from "rxjs";
import { BrandsService } from "../../brands/brands.service";
import { CategoriesService } from "../../categories/categories.service";
import { EMPTY_ARRAY, TuiContextWithImplicit, TuiHandler, tuiPure, TuiStringHandler } from "@taiga-ui/cdk";
import { TuiAlertService, TuiNotification, TuiValueContentContext } from "@taiga-ui/core";
import { maxFilesLength } from "../../../shared/functions/form-control-max-filex.func";
import { TuiFileLike } from "@taiga-ui/kit";
import { productPropertyControl } from "../../../shared/functions/product-property-control.func";
import { AddProductDto, UpdateProductDto } from "../../../shared/dto/products.dto";
import { PropertyValue } from "../../../shared/dto/properties.dto";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { ImagesService } from "../../../shared/services/images.service";

const MAX_MEDIA_LENGTH = 10;

interface DataResponse {
  product?: ProductModel | null;
  brands: BrandModel[] | null;
  categories: CategoryModel | null;
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
  public categoriesData: ApiDataModel<CategoryModel>;
  public productTypesPrevsData: ApiDataModel<ProductTypePrevModel[]>;
  public currentTypeData: ApiDataModel<ProductTypeModel>;
  public linearCategoriesData: CategoryLinearModel[] = [];
  public loading = false;
  public maxMediaLength = MAX_MEDIA_LENGTH;

  loadingFile: TuiFileLike[] = [
    {
      name: `Loading file.txt`,
    },
    {
      name: `Loading file2.txt`,
    }
  ];

  removedFiles: TuiFileLike[] = this.loadingFile as unknown as TuiFileLike[];

  public formGroup: FormGroup = this.formBuilder.group({
    name: [null, Validators.required],
    media: [[], maxFilesLength(this.maxMediaLength)],
    price: [null, Validators.required],
    brand: [null, Validators.required],
    description: [null],
    categoryId: [null],
    productTypeId: [null],
    productProps: this.formBuilder.group({}),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private typesService: TypesService,
    private brandsService: BrandsService,
    private categoriesService: CategoriesService,
    private imagesService: ImagesService,
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
    this.f['media'].valueChanges.subscribe(response => {
      console.log(response);
    });
    this.f['productTypeId'].valueChanges.subscribe((value: string) => {
      if (value) {
        this.setPropertiesControls(value);
      }
    });
    this.f['categoryId'].valueChanges.subscribe((value: string) => {
      if (this.categoriesData) {
        const categoryItem = this.linearCategoriesData.find((category => category._id === value));
        if (categoryItem) {
          this.f['productTypeId'].setValue(categoryItem.productTypeId);
        }
      }
    });
  }

  public getImages(names: string[]): Observable<TuiFileLike[]> {
    return names.length ? forkJoin(names.map(name => this.imagesService.getImage(name))) : of([]);
  }

  public refreshData(): void {
    this.formGroup.reset();
    this.productData = undefined;
    forkJoin({
      product: this.productId ? this.productsService.getProductById(this.productId) : of(null),
      brands: this.brandsService.getBrands(),
      categories: this.categoriesService.getCategoriesTree(),
      productTypes: this.typesService.getTypes(),
    }).subscribe((res: DataResponse) => {
      this.productData = res.product;
      this.brandsData = res.brands;
      this.categoriesData = res.categories;
      if (res.categories) {
        this.linearCategoriesData = this.linearCategory([res.categories]);
      }
      this.productTypesPrevsData = res.productTypes;
      if (res.product) {
        const productData = res.product;
        this.getImages(res.product.media || []).subscribe(mediaRes => {
          setTimeout(() => {
            this.formGroup.patchValue({
              name: productData.name,
              media: mediaRes || [],
              price: productData.price,
              brand: productData.brand?._id,
              description: productData.description,
              categoryId: productData.categoryId,
              productTypeId: productData.productTypeId,
            });
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
    this.alertService.open([...(files as TuiFileLike[])].map(item => item.name).join(', '), {label: `Ошибка загрузки файлов`, status: TuiNotification.Error, autoClose: 5000}).subscribe();
  }

  public removeFile({name}: File): void {
    this.f['media'].setValue(
      this.f['media'].value?.filter((current: File) => current.name !== name) ?? [],
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

  public drop(event: CdkDragDrop<string[]>) {
    const array = this.f['media'].value;
    moveItemInArray(array, event.previousIndex, event.currentIndex);
    this.f['media'].setValue(array);
  }

  public submit(): void {
    this.formGroup.markAsTouched();
    if (this.formGroup.valid) {
      const data = this.formGroup.value;
      const payload = {
        ...data,
        media: data.media || [],
        productProps: Object.entries<PropertyValue>(data.productProps || [])
          .map(([productTypePropertyId, value]: [string, PropertyValue]) =>
            ({ productTypePropertyId, value }))
      }
      this.loading = true;
      if (this.productId) {
        this.productsService.updateProduct(this.productId.toString(), payload as UpdateProductDto).subscribe(
          res => {
            if (res) {
              this.alertService.open(`Продукт ${res.name} обновлён`, {label: `Успешно`, status: TuiNotification.Success, autoClose: 5000}).subscribe();
              this.router.navigate(['/products/list']);
            }
          },
          err => {
            this.loading = false;
          }
        );
      } else {
        this.productsService.addProduct(payload as AddProductDto).subscribe(
          res => {
            if (res) {
              this.alertService.open(`Продукт ${res.name} добавлен`, {label: `Успешно`, status: TuiNotification.Success, autoClose: 5000}).subscribe();
              this.router.navigate(['/products/list']);
            }
          },
          err => {
            this.loading = false;
          }
        );
      }
    }
  }

}
