import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-properties-details',
  templateUrl: './properties-details.component.html',
  styleUrls: ['./properties-details.component.scss']
})
export class PropertiesDetailsComponent implements OnInit {
  public breadcrumbs;
  public propertyId;

  constructor(
    private route: ActivatedRoute,
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
