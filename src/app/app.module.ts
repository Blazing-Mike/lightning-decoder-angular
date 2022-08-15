import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeadersInterceptor } from './interceptors/headers.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { InputComponent } from './components/input/input.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, InputComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule, ClipboardModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
