import { Component, EventEmitter, OnInit } from '@angular/core';
import { ApiDataModel } from "../../../shared/models/api-data.model";
import { GetProductsOptions, ProductPrevModel } from "../../../shared/models/product.model";
import { ProductsService } from "../products.service";
import { Paginated } from "../../../shared/models/paginated.model";
import { BehaviorSubject, combineLatest, debounceTime, map, Observable, of, startWith, switchMap } from "rxjs";
import { BaseProductProperty } from "../../../shared/enums/base-product-property.emum";
import { FormControl } from "@angular/forms";
import { Autocomplete } from "../../../shared/dto/products.dto";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  readonly search = new FormControl('');
  readonly search$ = this.search.valueChanges.pipe(debounceTime(200), startWith(''));
  readonly autocomplete$: Observable<Autocomplete[]> = this.search$.pipe(switchMap((search: string | null) => {
    return search?.length ? this.productsService.autocomplete(search).pipe(map(res => res || [])) : of([])
  }));
  readonly limit$ = new BehaviorSubject<number>(10);
  readonly page$ = new BehaviorSubject<number>(0);
  readonly emitter = new EventEmitter();
  readonly emitter$ = this.emitter.asObservable();
  readonly direction$ = new BehaviorSubject<-1 | 1>(-1);
  readonly sorter$ = new BehaviorSubject<string>(`name`);
  readonly request$ = combineLatest({
    emitter: this.emitter$,
    search: this.search$,
    sort: this.sorter$,
    direction: this.direction$,
    page: this.page$,
    limit: this.limit$,
  }).pipe(
    debounceTime(0),
  );
  public productsData: ApiDataModel<Paginated<ProductPrevModel>>;
  public breadcrumbs = [
    {
      caption: `Главная`,
      routerLink: `/`,
    },
    {
      caption: `Товары`,
      routerLink: `/products`,
    },
  ];

  readonly columns = ['media', 'name', 'price', 'categoryId', 'brand'];

  constructor(
    private productsService: ProductsService,
  ) { }

  ngOnInit(): void {
    this.request$.subscribe(res => {
      this.getData({
        preview: true,
        search: res.search || undefined,
        sort: {
          property: res.sort as BaseProductProperty,
          direction: res.direction,
        },
        pagination: {
          page: res.page,
          limit: res.limit,
        }
      });
    });
    this.refreshData();
  }

  public changeSize(limit: number): void {
    this.limit$.next(limit);
  }

  public changePage(page: number): void {
    this.page$.next(page);
  }

  public refreshData(): void {
    this.emitter.emit();
  }

  public getData(options?: GetProductsOptions): void {
    this.productsData = undefined;
    this.productsService.getProducts<ProductPrevModel>(options).subscribe((res: Paginated<ProductPrevModel> | null) => {
      this.productsData = res || null;
    });
  }

}
