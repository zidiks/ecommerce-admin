import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { CategoriesRoutingModule } from "./categories-routing.module";
import { CategoryListComponent } from './category-list/category-list.component';
import { TuiBreadcrumbsModule, TuiTreeModule } from "@taiga-ui/kit";
import { TuiButtonModule, TuiLinkModule, TuiLoaderModule, TuiSvgModule } from "@taiga-ui/core";
import { ApiLoadingStateModule } from "../../shared/pipes/api-loading-state/api-loading-state.module";

@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryListComponent,
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    TuiBreadcrumbsModule,
    TuiButtonModule,
    TuiLinkModule,
    ApiLoadingStateModule,
    TuiTreeModule,
    TuiSvgModule,
    TuiLoaderModule,
  ]
})
export class CategoriesModule { }
