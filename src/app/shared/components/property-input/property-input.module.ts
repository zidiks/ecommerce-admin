import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiInputColorModule } from "@taiga-ui/addon-editor";
import { ReactiveFormsModule } from "@angular/forms";
import {
  TuiCheckboxBlockModule,
  TuiDataListWrapperModule,
  TuiInputModule,
  TuiMultiSelectModule,
  TuiSelectModule
} from "@taiga-ui/kit";
import { PropertyInputComponent } from "./property-input.component";

@NgModule({
  declarations: [
    PropertyInputComponent,
  ],
  imports: [
    CommonModule,
    TuiInputColorModule,
    ReactiveFormsModule,
    TuiCheckboxBlockModule,
    TuiSelectModule,
    TuiDataListWrapperModule,
    TuiMultiSelectModule,
    TuiInputModule,
  ],
  exports: [
    PropertyInputComponent,
  ]
})
export class PropertyInputModule { }
