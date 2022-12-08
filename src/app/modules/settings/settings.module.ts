import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from "./settings-routing.module";
import { SettingsListComponent } from './settings-list/settings-list.component';
import { PaymentComponent } from './payment/payment.component';
import { OrderStateComponent } from './order-state/order-state.component';
import { DeliveryComponent } from './delivery/delivery.component';
import {
    TuiBadgeModule,
    TuiBreadcrumbsModule,
    TuiDataListDropdownManagerModule, TuiDataListWrapperModule,
    TuiInputModule, TuiInputTagModule,
    TuiIslandModule, TuiMultiSelectModule, TuiSelectModule,
    TuiTextAreaModule
} from "@taiga-ui/kit";
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDropdownModule, TuiLabelModule,
  TuiLinkModule,
  TuiLoaderModule,
  TuiSvgModule, TuiTextfieldControllerModule
} from "@taiga-ui/core";
import { ApiLoadingStateModule } from "../../shared/pipes/api-loading-state/api-loading-state.module";
import { DataEmptyModule } from "../../shared/components/data-empty/data-empty.module";
import { DeliveryDialogComponent } from './delivery/delivery-dialog/delivery-dialog.component';
import { PaymentDialogComponent } from './payment/payment-dialog/payment-dialog.component';
import { ReactiveFormsModule } from "@angular/forms";
import { TuiLetModule } from "@taiga-ui/cdk";
import { OrderStateDialogComponent } from './order-state/order-state-dialog/order-state-dialog.component';

@NgModule({
  declarations: [
    SettingsComponent,
    SettingsListComponent,
    PaymentComponent,
    OrderStateComponent,
    DeliveryComponent,
    DeliveryDialogComponent,
    PaymentDialogComponent,
    OrderStateDialogComponent
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
        TuiDataListDropdownManagerModule,
        TuiDropdownModule,
        TuiDataListModule,
        ReactiveFormsModule,
        TuiInputModule,
        TuiTextAreaModule,
        TuiTextfieldControllerModule,
        TuiInputTagModule,
        TuiLabelModule,
        TuiMultiSelectModule,
        TuiLetModule,
        TuiDataListWrapperModule,
        TuiSelectModule,
        TuiBadgeModule,
    ]
})
export class SettingsModule { }
