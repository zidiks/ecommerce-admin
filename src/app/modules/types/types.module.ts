import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypesComponent } from './types.component';
import { TypesRoutingModule } from "./types-routing.module";
import { TypesListComponent } from './types-list/types-list.component';
import { TypeDetailsComponent } from './type-details/type-details.component';
import { TuiBreadcrumbsModule } from "@taiga-ui/kit";
import { TuiButtonModule, TuiLinkModule, TuiLoaderModule } from "@taiga-ui/core";
import { ApiLoadingStateModule } from "../../shared/pipes/api-loading-state/api-loading-state.module";

@NgModule({
  declarations: [
    TypesComponent,
    TypesListComponent,
    TypeDetailsComponent
  ],
  imports: [
    CommonModule, TypesRoutingModule, TuiBreadcrumbsModule, TuiLinkModule, TuiButtonModule, ApiLoadingStateModule, TuiLoaderModule,
  ]
})
export class TypesModule { }
