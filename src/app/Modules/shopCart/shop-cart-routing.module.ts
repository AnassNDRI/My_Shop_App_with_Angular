import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressFormComponent } from '../address/address-form/address-form.component';
import { CartComponent } from './cart/cart.component';
import { CheckCartComponent } from './check-cart/check-cart.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [

  {
    path: '',
    children: [
      {path :'',component: CartComponent},
      { path: 'checkCart', component: CheckCartComponent},
      { path: 'confirmCart', component: ConfirmationComponent},
      { path: 'paymentCart', component: PaymentComponent},
      { path: 'AddressForm', component: AddressFormComponent},
      { path: 'form', component: AddressFormComponent}]

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopCartRoutingModule { }
