import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from "./orders.component";
import { TuiButtonModule, TuiFormatDatePipeModule, TuiFormatNumberPipeModule, TuiLinkModule } from "@taiga-ui/core";
import { TuiAvatarModule, TuiBadgeModule, TuiBreadcrumbsModule } from "@taiga-ui/kit";
import { TuiTableModule, TuiTablePaginationModule } from "@taiga-ui/addon-table";
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { TuiCurrencyPipeModule } from "@taiga-ui/addon-commerce";

@NgModule({
  declarations: [
    OrdersComponent,
    ListComponent,
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    TuiButtonModule,
    TuiBreadcrumbsModule,
    TuiLinkModule,
    TuiTableModule,
    TuiFormatNumberPipeModule,
    TuiBadgeModule,
    TuiTablePaginationModule,
    TuiAvatarModule,
    TuiCurrencyPipeModule,
    TuiFormatDatePipeModule,
  ]
})
export class OrdersModule { }
