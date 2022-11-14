import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertiesComponent } from './properties.component';
import { PropertiesRoutingModule } from "./properties-routing.module";
import { PropertiesListComponent } from './properties-list/properties-list.component';
import { PropertiesDetailsComponent } from './properties-details/properties-details.component';

@NgModule({
  declarations: [
    PropertiesComponent,
    PropertiesListComponent,
    PropertiesDetailsComponent
  ],
  imports: [
    CommonModule,
    PropertiesRoutingModule,
  ]
})
export class PropertiesModule { }
