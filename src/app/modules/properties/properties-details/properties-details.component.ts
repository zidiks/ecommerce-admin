import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-properties-details',
  templateUrl: './properties-details.component.html',
  styleUrls: ['./properties-details.component.scss']
})
export class PropertiesDetailsComponent implements OnInit {
  public breadcrumbs;
  public propertyId;

  public formGroup: FormGroup = this.formBuilder.group({
    name: [``, Validators.required],
    description: [null],
    showCard: [false],
    showFilter: [false],
    type: [null, Validators.required],
    options:this.formBuilder.array([]),
  });

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
    this.propertyId = this.route.snapshot.params['id'];
    this.breadcrumbs = [
      {
        caption: `Главная`,
        routerLink: `/`,
      },
      {
        caption: `Свойства`,
        routerLink: `/properties`,
      },
      {
        caption: `Детали`,
        routerLink: `/properties/${this.propertyId}`,
      }
    ];
  }

  ngOnInit(): void {
  }

}
