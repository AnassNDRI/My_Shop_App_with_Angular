import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { LoginComponent } from './Modules/login/login.component';
import { AutoLoginGuard } from './helpers/others/auto-login.guard';
import { RegisterComponent } from './Modules/register/register.component';


const routes: Routes = [

  {path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', loadChildren: () => import('./Modules/home/home.module').then(m => m.HomeModule) },
  { path: 'cart', loadChildren: () => import('./Modules/shopCart/shop-cart.module').then(m => m.ShopCartModule), },
  { path: 'products', loadChildren: () => import('./Modules/product/product.module').then(m => m.ProductModule) },
  { path: 'login', component: LoginComponent, canActivate: [AutoLoginGuard]},
  { path: 'users', loadChildren: () => import('./Modules/user/user.module').then(m => m.UserModule) },
  { path: 'register', component: RegisterComponent ,canActivate: [AutoLoginGuard]},
  { path: 'address', loadChildren: () => import('./Modules/address/address.module').then(m => m.AddressModule)},
  { path: 'profile', loadChildren: () => import('./Modules/profile/profile.module').then(m => m.ProfileModule)},


];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
