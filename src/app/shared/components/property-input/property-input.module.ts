import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyInputComponent } from "./property-input.component";
import { TuiInputColorModule } from "@taiga-ui/addon-editor";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    PropertyInputComponent,
  ],
  imports: [
    CommonModule,
    TuiInputColorModule,
    ReactiveFormsModule,
  ],
  exports: [
    PropertyInputComponent,
  ]
})
export class PropertyInputModule { }
