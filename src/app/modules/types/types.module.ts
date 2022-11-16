import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypesComponent } from './types.component';
import { TypesRoutingModule } from "./types-routing.module";
import { TypesListComponent } from './types-list/types-list.component';
import {
  TuiActionModule,
  TuiBreadcrumbsModule, TuiDataListDropdownManagerModule,
  TuiInputModule,
  TuiMarkerIconModule,
  TuiTextAreaModule
} from "@taiga-ui/kit";
import {
  TuiButtonModule, TuiDataListModule,
  TuiDropdownModule,
  TuiLinkModule,
  TuiLoaderModule, TuiSvgModule,
  TuiTextfieldControllerModule
} from "@taiga-ui/core";
import { ApiLoadingStateModule } from "../../shared/pipes/api-loading-state/api-loading-state.module";
import { TypesDialogComponent } from './types-list/types-dialog/types-dialog.component';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    TypesComponent,
    TypesListComponent,
    TypesDialogComponent,
  ],
  imports: [
    CommonModule,
    TypesRoutingModule,
    TuiBreadcrumbsModule,
    TuiLinkModule,
    TuiButtonModule,
    ApiLoadingStateModule,
    TuiLoaderModule,
    TuiActionModule,
    TuiMarkerIconModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiTextAreaModule,
    TuiDataListDropdownManagerModule,
    TuiDropdownModule,
    TuiSvgModule,
    TuiDataListModule,
  ]
})
export class TypesModule { }
