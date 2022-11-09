import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from "./categories.component";
import { ListComponent } from "./list/list.component";

const routes: Routes = [
  {
    path: '', component: CategoriesComponent, children: [
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: '**',
        redirectTo: 'list',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
