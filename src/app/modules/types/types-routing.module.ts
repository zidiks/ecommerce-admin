import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypesComponent } from "./types.component";

const routes: Routes = [
  {
    path: '', component: TypesComponent, children: [

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypesRoutingModule { }
