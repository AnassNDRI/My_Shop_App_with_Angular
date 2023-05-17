import { NgModule } from '@angular/core';
import { CanActivate, RouterModule, Routes } from '@angular/router';

import {DetailProductComponent} from "./detail-product/detail-product.component";
import {ListProductComponent} from "./list-product/list-product.component";
import { AuthGuard } from 'src/app/helpers/others/auth.guard';
import { ProductFormComponent } from './product-form/product-form.component';

const routes: Routes = [
    {
      path: '', children: [
        { path: 'detail/:id', component: DetailProductComponent },
        { path: 'form', component: ProductFormComponent, canActivate: [AuthGuard] },
        { path: 'form/:id', component: ProductFormComponent, canActivate: [AuthGuard] },
        { path: 'list', component: ListProductComponent, canActivate: [AuthGuard] },
        { path: '', redirectTo: 'list', pathMatch: 'full' }
      ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
