import { Component, OnInit } from '@angular/core';
import { PropertiesService } from "../properties.service";
import { ApiDataModel } from "../../../shared/models/api-data.model";
import { ProductTypePropertyModel } from "../../../shared/models/type-property.model";

@Component({
  selector: 'app-properties-list',
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.scss']
})
export class PropertiesListComponent implements OnInit {
  public page = 0;
  public size = 10;
  public propertiesData: ApiDataModel<ProductTypePropertyModel[]>;
  public breadcrumbs = [
    {
      caption: `Главная`,
      routerLink: `/`,
    },
    {
      caption: `Свойства`,
      routerLink: `/properties`,
    },
  ];

  readonly columns = ['name', 'type', 'showCard', 'showFilter'];

  constructor(
    private propertiesService: PropertiesService,
  ) { }

  ngOnInit(): void {
    this.refreshData();
  }

  public refreshData(): void {
    this.propertiesData = undefined;
    this.propertiesService.getProperties().subscribe((res: ProductTypePropertyModel[] | null) => {
      this.propertiesData = res;
    });
  }

}
