import { Component, OnInit } from '@angular/core';
import { CategoryModel } from "../../../shared/models/category.model";
import { ApiDataModel } from "../../../shared/models/api-data.model";
import { CategoriesService } from "../categories.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public categoriesData: ApiDataModel<CategoryModel[]>;

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
    this.categoriesService.getCategories().subscribe((res: CategoryModel[] | null) => {
      this.categoriesData = res;
    })
  }

}
