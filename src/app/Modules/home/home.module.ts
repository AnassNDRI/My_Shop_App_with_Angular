import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {TranslateModule} from "@ngx-translate/core";
import {HomeComponent} from "./home.component";
import { ProductModule } from "../product/product.module";


@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        HomeRoutingModule,
        TranslateModule,
        ProductModule
    ]
})
export class HomeModule { }
