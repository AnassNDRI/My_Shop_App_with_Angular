import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {ProductModule} from "./Modules/product/product.module";
import {RouterModule} from "@angular/router";

import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import {DatePipe} from "@angular/common";
import {JwtInterceptor} from "./security/services/jwt.interceptor";

import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

import { LoginComponent } from './Modules/login/login.component';
import { OrderComponent } from './Modules/order/order.component';
import { PageNotFoundComponent } from './Modules/page-not-found/page-not-found.component';
import { RegisterComponent } from './Modules/register/register.component';
import { LanguageComponent } from './Modules/language/language.component';
import { LogoComponent } from './Modules/logo/logo.component';
import { ShopCartModule } from './Modules/shopCart/shop-cart.module';
import { AddressModule } from './Modules/address/address.module';
import { FaqsComponent } from './Modules/faqs/faqs.component';
import { AproposComponent } from './Modules/apropos/apropos.component';
import { ContactComponent } from './Modules/contact/contact.component';


@NgModule({
  declarations: [
    AppComponent,
    LanguageComponent,
    LogoComponent,
    PageNotFoundComponent,
    RegisterComponent,
    OrderComponent,
    LoginComponent,
    FaqsComponent,
    AproposComponent,
    ContactComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ProductModule,
    ShopCartModule,
    AddressModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService,
    DatePipe
  ],
  exports: [
    LogoComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
