import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { CategoriesRoutingModule } from "./categories-routing.module";
import { ListComponent } from './list/list.component';
import { TuiBreadcrumbsModule } from "@taiga-ui/kit";
import { TuiButtonModule, TuiLinkModule } from "@taiga-ui/core";
import { ApiLoadingStateModule } from "../../shared/pipes/api-loading-state/api-loading-state.module";

@NgModule({
  declarations: [
    CategoriesComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    TuiBreadcrumbsModule,
    TuiButtonModule,
    TuiLinkModule,
    ApiLoadingStateModule,
  ]
})
export class CategoriesModule { }
