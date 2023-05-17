import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { LoginComponent } from './Modules/login/login.component';
import { AutoLoginGuard } from './helpers/others/auto-login.guard';
import { RegisterComponent } from './Modules/register/register.component';
import { AproposComponent } from './Modules/apropos/apropos.component';
import { FaqsComponent } from './Modules/faqs/faqs.component';
import { EmployeGuard } from './helpers/others/employee.guards';
import { PageNotFoundComponent } from './Modules/page-not-found/page-not-found.component';
import { ContactComponent } from './Modules/contact/contact.component';


const routes: Routes = [


  { path: 'home', loadChildren: () => import('./Modules/home/home.module').then(m => m.HomeModule) },
  { path: 'cart', loadChildren: () => import('./Modules/shopCart/shop-cart.module').then(m => m.ShopCartModule), },
  { path: 'products', loadChildren: () => import('./Modules/product/product.module').then(m => m.ProductModule) },
  { path: 'login', component: LoginComponent, canActivate: [AutoLoginGuard]},
  { path: 'users', loadChildren: () => import('./Modules/user/user.module').then(m => m.UserModule) },
  { path: 'register', component: RegisterComponent ,canActivate: [AutoLoginGuard]},
  { path: 'address', loadChildren: () => import('./Modules/address/address.module').then(m => m.AddressModule)},
  { path: 'profile', loadChildren: () => import('./Modules/profile/profile.module').then(m => m.ProfileModule)},
  { path: 'admin', loadChildren: () => import('./Modules/admin/admin.module').then(m => m.AdminModule), canActivate: [EmployeGuard]},
  { path: 'profile', loadChildren: () => import('./Modules/profile/profile.module').then(m => m.ProfileModule)},
  { path: 'pargenotfound', component: PageNotFoundComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'faqs', component: FaqsComponent },
  { path: 'apropos', component: AproposComponent },
  {path: '', redirectTo: 'home', pathMatch: 'full'}


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
