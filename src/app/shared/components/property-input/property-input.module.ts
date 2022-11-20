import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyInputComponent } from "./property-input.component";
import { TuiInputColorModule } from "@taiga-ui/addon-editor";
import { ReactiveFormsModule } from "@angular/forms";
import { TuiCheckboxBlockModule, TuiDataListWrapperModule, TuiSelectModule } from "@taiga-ui/kit";

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
  ],
  exports: [
    PropertyInputComponent,
  ]
})
export class PropertyInputModule { }
