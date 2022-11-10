import { NgModule } from '@angular/core';
import { ApiLoadingStatePipe } from "./api-loading-state.pipe";

@NgModule({
  declarations: [
    ApiLoadingStatePipe,
  ],
  exports: [
    ApiLoadingStatePipe,
  ]
})
export class ApiLoadingStateModule { }
