import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { ListProductComponent } from './list-product/list-product.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { SearchProductComponent } from './search-product/search-product.component';
import { LoaderComponent } from './loader/loader.component';
import { BorderCardDirective } from './helpers/directive/border-card.directive';
import { ProductCategoryColorePipePipe } from './helpers/pipe/product-category-colore-pipe.pipe';
import {FormsModule} from "@angular/forms";
import {ProductService} from "../services/product.service";




// @ts-ignore
@NgModule({
  declarations: [
    ListProductComponent,
    DetailProductComponent,
    EditProductComponent,
    AddProductComponent,
    ProductFormComponent,
    SearchProductComponent,
    LoaderComponent,
    BorderCardDirective,
    ProductCategoryColorePipePipe
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
  ],
  providers: [ProductService],
  exports: [
    ListProductComponent
  ]
})
export class ProductModule { }
