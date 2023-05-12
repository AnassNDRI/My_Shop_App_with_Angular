import { NgModule } from '@angular/core';
import { CanActivate, RouterModule, Routes } from '@angular/router';

import {DetailProductComponent} from "./detail-product/detail-product.component";
import {ListProductComponent} from "./list-product/list-product.component";
import { AuthGuard } from 'src/app/helpers/others/auth.guard';

const routes: Routes = [
    {
      path: '', children: [
        { path: 'detail/:id', component: DetailProductComponent },
        { path: 'list', component: ListProductComponent, canActivate: [AuthGuard] },
        { path: '', redirectTo: 'list', pathMatch: 'full' }
      ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
