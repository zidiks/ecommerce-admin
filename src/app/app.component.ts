import { Component } from '@angular/core';
import { TUI_ARROW } from "@taiga-ui/kit";
import { AppListItemModel } from "./shared/models/app-list-item.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public readonly arrow = TUI_ARROW;

  public appsList: AppListItemModel[] = [
    {
      icon: 'tuiIconCheckList',
      name: 'Заказы',
      route: '/orders'
    },
    {
      icon: 'tuiIconFile',
      name: 'Продукты',
      route: '/products',
    },
    {
      icon: 'tuiIconBookmark',
      name: 'Категории',
      route: '/categories',
    },
    {
      icon: 'tuiIconCode',
      name: 'Сущности',
      route: '/types',
    },
    {
      icon: 'tuiIconChartBar',
      name: 'Аналитика',
      route: '/analytics',
    },
    {
      icon: 'tuiIconSettings',
      name: 'Настройки',
      route: '/settings',
    }
  ]
}
