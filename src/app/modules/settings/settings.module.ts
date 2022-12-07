import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from "./settings-routing.module";
import { SettingsListComponent } from './settings-list/settings-list.component';
import { PaymentComponent } from './payment/payment.component';
import { OrderStateComponent } from './order-state/order-state.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { TuiBreadcrumbsModule, TuiIslandModule } from "@taiga-ui/kit";
import { TuiButtonModule, TuiLinkModule, TuiLoaderModule, TuiSvgModule } from "@taiga-ui/core";
import { ApiLoadingStateModule } from "../../shared/pipes/api-loading-state/api-loading-state.module";
import { DataEmptyModule } from "../../shared/components/data-empty/data-empty.module";

@NgModule({
  declarations: [
    SettingsComponent,
    SettingsListComponent,
    PaymentComponent,
    OrderStateComponent,
    DeliveryComponent
  ],
    imports: [
        CommonModule,
        SettingsRoutingModule,
        TuiBreadcrumbsModule,
        TuiLinkModule,
        TuiIslandModule,
        TuiSvgModule,
        ApiLoadingStateModule,
        TuiLoaderModule,
        TuiButtonModule,
        DataEmptyModule,
    ]
})
export class SettingsModule { }
