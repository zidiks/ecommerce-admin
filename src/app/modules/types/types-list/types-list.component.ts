import { Component, OnInit } from '@angular/core';
import { ApiDataModel } from "../../../shared/models/api-data.model";
import { ApiLoadingState } from "../../../shared/enums/api-loading-state.enum";
import { ProductTypeModel } from "../../../shared/models/product-property.model";
import { TypesService } from "../types.service";

@Component({
  selector: 'app-types-list',
  templateUrl: './types-list.component.html',
  styleUrls: ['./types-list.component.scss']
})
export class TypesListComponent implements OnInit {
  public typesData: ApiDataModel<ProductTypeModel[]>;
  public apiLoadingState = ApiLoadingState;
  public breadcrumbs = [
    {
      caption: `Главная`,
      routerLink: `/`,
    },
    {
      caption: `Сущности`,
      routerLink: `/types`,
    },
  ];

  constructor(
    private typesService: TypesService,
  ) { }

  ngOnInit(): void {
    this.refreshData();
  }

  public refreshData(): void {
    this.typesData = undefined;
    this.typesService.getTypes().subscribe((res: ProductTypeModel[] | null) => {
      this.typesData = res || null;
    })
  }

}
