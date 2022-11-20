import { Component, Input, OnInit } from '@angular/core';
import { ProductTypePropertyModel } from "../../models/type-property.model";
import { AbstractControl, FormControl } from "@angular/forms";
import { ProductTypePropertyType } from "../../enums/product-property.enum";

@Component({
  selector: 'property-input',
  templateUrl: './property-input.component.html',
  styleUrls: ['./property-input.component.scss'],
})
export class PropertyInputComponent implements OnInit {
  @Input() public propertyData!: ProductTypePropertyModel;
  @Input() public control!: AbstractControl<any, any>;
  public propertyTypes = ProductTypePropertyType;

  constructor() { }

  public get formControl(): FormControl {
    return this.control as FormControl;
  }

  ngOnInit(): void {
    console.log(this.control.value);
  }

}
