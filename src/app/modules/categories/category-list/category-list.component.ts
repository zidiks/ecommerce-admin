import { Component, OnInit } from '@angular/core';
import { CategoryModel } from "../../../shared/models/category.model";
import { ApiDataModel } from "../../../shared/models/api-data.model";
import { CategoriesService } from "../categories.service";
import { EMPTY_ARRAY, TuiHandler } from "@taiga-ui/cdk";
import { ApiLoadingState } from "../../../shared/enums/api-loading-state.enum";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  public categoriesData: ApiDataModel<CategoryModel[]>;
  public apiLoadingState = ApiLoadingState;
  public breadcrumbs = [
    {
      caption: `Главная`,
      routerLink: `/`,
    },
    {
      caption: `Категории`,
      routerLink: `/categories`,
    },
  ];

  constructor(
    private categoriesService: CategoriesService,
  ) { }

  ngOnInit(): void {
    this.refreshData();
  }

  public refreshData(): void {
    this.categoriesData = undefined;
    this.categoriesService.getCategories().subscribe((res: CategoryModel[] | null) => {
      this.categoriesData = res;
    })
  }

  readonly handler: TuiHandler<CategoryModel, readonly CategoryModel[]> = item =>
    item.children || EMPTY_ARRAY;

}
