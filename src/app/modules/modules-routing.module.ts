import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModulesComponent } from "./modules.component";

const routes: Routes = [
  {
    path: '', component: ModulesComponent, children: [
      {
        path: 'orders',
        loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule),
        canActivate: [],
      },
      {
        path: 'products',
        loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
        canActivate: [],
      },
      {
        path: 'categories',
        loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule),
        canActivate: [],
      },
      {
        path: 'news',
        loadChildren: () => import('./news/news.module').then(m => m.NewsModule),
        canActivate: [],
      },
      {
        path: 'types',
        loadChildren: () => import('./types/types.module').then(m => m.TypesModule),
        canActivate: [],
      },
      {
        path: 'analytics',
        loadChildren: () => import('./analytics/analytics.module').then(m => m.AnalyticsModule),
        canActivate: [],
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
        canActivate: [],
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
        canActivate: [],
      },
      {
        path: '**',
        redirectTo: 'orders',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
