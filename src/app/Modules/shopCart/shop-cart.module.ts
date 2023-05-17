import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopCartRoutingModule } from './shop-cart-routing.module';
import { CheckCartComponent } from './check-cart/check-cart.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { PaymentComponent } from './payment/payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddressModule } from '../address/address.module';
import { CartComponent } from './cart/cart.component';



@NgModule({
  declarations: [
    CheckCartComponent,
    PaymentComponent,
    ConfirmationComponent,
    CartComponent
  ],


  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ShopCartRoutingModule,
        AddressModule,
  ]
})
export class ShopCartModule { }
