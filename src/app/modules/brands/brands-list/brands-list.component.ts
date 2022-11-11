import { Component, Inject, Injector, OnInit } from '@angular/core';
import { BrandsService } from "../brands.service";
import { tuiTablePaginationOptionsProvider } from "@taiga-ui/addon-table";
import { ApiDataModel } from "../../../shared/models/api-data.model";
import { BrandModel } from "../../../shared/models/brand.model";
import { SubmitService } from "../../../shared/services/submit.service";
import { PolymorpheusComponent } from "@tinkoff/ng-polymorpheus";
import { TuiDialogService } from "@taiga-ui/core";
import { BrandDialogComponent } from "./brand-dialog/brand-dialog.component";

@Component({
  selector: 'app-brands-list',
  templateUrl: './brands-list.component.html',
  styleUrls: ['./brands-list.component.scss'],
  providers: [
    tuiTablePaginationOptionsProvider({
      showPages: true,
    }),
  ],
})
export class BrandsListComponent implements OnInit {
  public page = 0;
  public size = 10;
  public brandsData: ApiDataModel<BrandModel[]>;
  public breadcrumbs = [
    {
      caption: `Главная`,
      routerLink: `/`,
    },
    {
      caption: `Бренды`,
      routerLink: `/brands`,
    },
  ];

  readonly columns = ['name', 'origin', 'description'];

  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private brandsService: BrandsService,
    private submitService: SubmitService,
  ) { }

  ngOnInit(): void {
    this.refreshData();
  }

  public refreshData(): void {
    this.brandsData = undefined;
    this.brandsService.getBrands().subscribe((res: BrandModel[] | null) => {
      this.brandsData = res;
    });
  }

  public showAddDialog(): void {
    const dialog = this.dialogService.open<null>(
      new PolymorpheusComponent(BrandDialogComponent, this.injector),
      {
        label: 'Бренд',
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

  public showEditDialog(brand: BrandModel): void {
    const dialog = this.dialogService.open<BrandModel>(
      new PolymorpheusComponent(BrandDialogComponent, this.injector),
      {
        label: 'Бренд',
        data: brand,
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
    this.submitService.submitDialog('Удалить', `Вы действительно хотите удалить бренд: ${title}?`).subscribe({
      next: (res) => {
        if (res) {
          console.log('Delete brand with id', id);
        }
      },
    })
  }

}
