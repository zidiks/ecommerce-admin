import { Component, OnInit } from '@angular/core';
import { ApiDataModel } from "../../../shared/models/api-data.model";
import { ProductModel } from "../../../shared/models/product.model";
import { ProductsService } from "../products.service";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  public page = 0;
  public size = 10;
  public productsData: ApiDataModel<ProductModel[]>;
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

  readonly columns = ['media', 'name', 'price', 'brand'];

  constructor(
    private productsService: ProductsService,
  ) { }

  ngOnInit(): void {
    this.refreshData();
  }

  public refreshData(): void {
    this.productsData = undefined;
    this.productsService.getProducts().subscribe((res: ProductModel[] | null) => {
      this.productsData = res;
    });
  }

}
