import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandsComponent } from './brands.component';
import { BrandsListComponent } from './brands-list/brands-list.component';
import { BrandsRoutingModule } from "./brands-routing.module";



@NgModule({
  declarations: [
    BrandsComponent,
    BrandsListComponent
  ],
  imports: [
    CommonModule,
    BrandsRoutingModule,
  ]
})
export class BrandsModule { }
