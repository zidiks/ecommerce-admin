import { Component, Inject, Injector, OnInit } from '@angular/core';
import { CategoryBaseModel, CategoryModel } from "../../../shared/models/category.model";
import { ApiDataModel } from "../../../shared/models/api-data.model";
import { CategoriesService } from "../categories.service";
import { EMPTY_ARRAY, TuiHandler } from "@taiga-ui/cdk";
import { ApiLoadingState } from "../../../shared/enums/api-loading-state.enum";
import { TuiDialogService } from "@taiga-ui/core";
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { CategoryDialogComponent } from "./category-dialog/category-dialog.component";
import { setCategoryChildParent } from "../../../shared/functions/set-category-child-parent.func";
import { SubmitService } from "../../../shared/services/submit.service";

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
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private categoriesService: CategoriesService,
    private submitService: SubmitService,
  ) { }

  ngOnInit(): void {
    this.refreshData();
  }

  public refreshData(): void {
    this.categoriesData = undefined;
    this.categoriesService.getCategories().subscribe((res: CategoryModel[] | null) => {
      if (res) {
        res.forEach((category: CategoryModel) => setCategoryChildParent(category));
      }
      this.categoriesData = res;
    })
  }

  readonly handler: TuiHandler<CategoryModel, readonly CategoryModel[]> = item => item.children || EMPTY_ARRAY;

  public showAddDialog(parent?: CategoryModel): void {
    const dialog = this.dialogService.open<CategoryBaseModel>(
      new PolymorpheusComponent(CategoryDialogComponent, this.injector),
      {
        label: 'Категория',
        data: { parentData: parent }
      }
    );
    dialog.subscribe({
      next: data => {
        console.info(`Dialog emitted data = ${data}`);
      },
      complete: () => {
        console.info(`Dialog closed`);
      },
    });
  }

  public showEditDialog(category: CategoryModel): void {
    const dialog = this.dialogService.open<CategoryBaseModel>(
      new PolymorpheusComponent(CategoryDialogComponent, this.injector),
      {
        label: 'Категория',
        data: {
          categoryData: category
        }
      }
    );
    dialog.subscribe({
      next: data => {
        console.info(`Dialog emitted data = ${data}`);
      },
      complete: () => {
        console.info(`Dialog closed`);
      },
    });
  }

  showDeleteDialog(id: string, title: string): void {
    this.submitService.submitDialog('Удалить', `Вы действительно хотите удалить категорию: ${title}?`).subscribe({
      next: (res) => {
        if (res) {
          console.log('Delete category with id', id);
        }
      },
    })
  }


}
