import { Component, OnInit } from '@angular/core';
import { ApiDataModel } from "../../../shared/models/api-data.model";
import { ApiLoadingState } from "../../../shared/enums/api-loading-state.enum";
import { ProductTypePrevModel } from "../../../shared/models/type-property.model";
import { TypesService } from "../types.service";

@Component({
  selector: 'app-types-list',
  templateUrl: './types-list.component.html',
  styleUrls: ['./types-list.component.scss']
})
export class TypesListComponent implements OnInit {
  public typesData: ApiDataModel<ProductTypePrevModel[]>;
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
    this.typesService.getTypes().subscribe((res: ProductTypePrevModel[] | null) => {
      this.typesData = res || null;
    })
  }

}
