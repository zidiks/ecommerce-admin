import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from "./products-routing.module";
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsDetailsComponent } from './products-details/products-details.component';
import { TuiBreadcrumbsModule } from "@taiga-ui/kit";
import { TuiButtonModule, TuiFormatNumberPipeModule, TuiLinkModule, TuiSvgModule } from "@taiga-ui/core";
import { TuiTableModule, TuiTablePaginationModule } from "@taiga-ui/addon-table";
import { ApiLoadingStateModule } from "../../shared/pipes/api-loading-state/api-loading-state.module";
import { TuiLetModule } from "@taiga-ui/cdk";
import { TuiCurrencyPipeModule } from "@taiga-ui/addon-commerce";

@NgModule({
  declarations: [
    ProductsComponent,
    ProductsListComponent,
    ProductsDetailsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    TuiBreadcrumbsModule,
    TuiLinkModule,
    TuiButtonModule,
    TuiTableModule,
    ApiLoadingStateModule,
    TuiSvgModule,
    TuiTablePaginationModule,
    TuiLetModule,
    TuiFormatNumberPipeModule,
    TuiCurrencyPipeModule,
  ]
})
export class ProductsModule { }
