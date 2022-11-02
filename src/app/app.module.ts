import {
  TuiRootModule,
  TuiDialogModule,
  TuiAlertModule,
  TuiSvgModule,
  TuiButtonModule,
  TuiHostedDropdownModule,
  TuiLinkModule,
  TuiScrollbarModule,
  TUI_SANITIZER
} from "@taiga-ui/core";
import { TuiAvatarModule } from "@taiga-ui/kit";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
      BrowserAnimationsModule,
      TuiRootModule,
      TuiDialogModule,
      TuiAlertModule,
      TuiSvgModule,
      TuiButtonModule,
      TuiAvatarModule,
      TuiHostedDropdownModule,
      TuiLinkModule,
      TuiScrollbarModule,
],
  providers: [
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
