import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertiesComponent } from './properties.component';
import { PropertiesRoutingModule } from "./properties-routing.module";
import { PropertiesListComponent } from './properties-list/properties-list.component';
import { PropertiesDetailsComponent } from './properties-details/properties-details.component';
import { TuiBreadcrumbsModule } from "@taiga-ui/kit";
import { TuiButtonModule, TuiLinkModule, TuiSvgModule } from "@taiga-ui/core";
import { TuiTableModule, TuiTablePaginationModule } from "@taiga-ui/addon-table";
import { TuiLetModule } from "@taiga-ui/cdk";
import { ApiLoadingStateModule } from "../../shared/pipes/api-loading-state/api-loading-state.module";

@NgModule({
  declarations: [
    PropertiesComponent,
    PropertiesListComponent,
    PropertiesDetailsComponent
  ],
  imports: [
    CommonModule,
    PropertiesRoutingModule,
    TuiBreadcrumbsModule,
    TuiButtonModule,
    TuiLinkModule,
    TuiTableModule,
    TuiLetModule,
    ApiLoadingStateModule,
    TuiSvgModule,
    TuiTablePaginationModule,
  ]
})
export class PropertiesModule { }
