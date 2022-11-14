import { Component } from '@angular/core';
import { TUI_ARROW } from "@taiga-ui/kit";
import { AppListItemModel } from "../shared/models/app-list-item.model";
import { AuthService } from "../shared/services/auth.service";

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent {
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
      icon: 'tuiIconStar',
      name: 'Бренды',
      route: '/brands',
    },
    {
      icon: 'tuiIconComment',
      name: 'Новости',
      route: '/news',
    },
    {
      icon: 'tuiIconFilter',
      name: 'Свойства',
      route: '/properties',
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
      icon: 'tuiIconUsers',
      name: 'Пользователи',
      route: '/users',
    },
    {
      icon: 'tuiIconSettings',
      name: 'Настройки',
      route: '/settings',
    }
  ];

  constructor(
    public authService: AuthService
  ) {
    if (authService.currentUserValue) {
      authService.updCurrentUser().subscribe();
    }
  }
}
