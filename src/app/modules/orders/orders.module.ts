import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from "./orders.component";
import {
  TuiButtonModule,
  TuiFormatDatePipeModule,
  TuiFormatNumberPipeModule,
  TuiHintModule,
  TuiLinkModule,
  TuiLoaderModule,
  TuiSvgModule,
  TuiTooltipModule
} from "@taiga-ui/core";
import { TuiAvatarModule, TuiBadgeModule, TuiBreadcrumbsModule } from "@taiga-ui/kit";
import { TuiTableModule, TuiTablePaginationModule } from "@taiga-ui/addon-table";
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { TuiCurrencyPipeModule, TuiMoneyModule } from "@taiga-ui/addon-commerce";
import { TuiLetModule } from "@taiga-ui/cdk";
import { OrderHistoryModule } from "../../shared/pipes/order-history/order-history.module";
import { ApiLoadingStateModule } from "../../shared/pipes/api-loading-state/api-loading-state.module";

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
        TuiLetModule,
        TuiSvgModule,
        TuiHintModule,
        TuiLoaderModule,
        TuiTooltipModule,
        OrderHistoryModule,
        TuiMoneyModule,
        ApiLoadingStateModule,
    ]
})
export class OrdersModule { }
