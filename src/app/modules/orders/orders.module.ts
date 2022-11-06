import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from "./orders.component";
import { TuiButtonModule, TuiFormatNumberPipeModule, TuiLinkModule } from "@taiga-ui/core";
import { TuiBadgeModule, TuiBreadcrumbsModule } from "@taiga-ui/kit";
import { TuiTableModule } from "@taiga-ui/addon-table";
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';

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
  ]
})
export class OrdersModule { }
