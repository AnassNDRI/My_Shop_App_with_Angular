import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Address } from 'src/app/models/address';
import { CartLine } from 'src/app/models/cartLine';
import { AuthenticationService } from 'src/app/security/services/authentication.service';
import { AddressService } from '../../services/address.service';
import { CartService } from '../../services/cart.service';
import { PayementMethod } from 'src/app/models/paymentMethod';
import { PaymentMethodService } from '../../services/paymentMethod.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-check-cart',
  templateUrl: './check-cart.component.html',
  styleUrls: ['./check-cart.component.css']
})
export class CheckCartComponent implements OnInit {

  totalPrice: number = 0;
  cart!: CartLine[];
  cartSubscription!: Subscription;
  adresse!: Address;
  user!: User;
  isAuth = false;
  myToken: any;
  addressList: Address[] = [];
  paymentMethodList: PayementMethod[] = [];

  constructor(private cartService: CartService,
              private addressService: AddressService,
              private paymentMethodService: PaymentMethodService,
              private route:Router ,
              private authService: AuthenticationService) { }

  ngOnInit(): void {
    console.log('isAuth before : ' , this.isAuth);
    this.myToken = sessionStorage.getItem('my-token');
    if(this.myToken){
      this.isAuth = true;
      this.authService.isAuthenticated.next(true);

    }else{
      this.isAuth=false;
      this.authService.isAuthenticated.next(false);
      alert('Veuillez-vous connecter pour valider votre commande');
      this.route.navigate(['/login']);
    }

    this.authService.isAuthenticated.subscribe( auth => {
      this.isAuth = auth;
    });
    this.addressService.findByUtilisateur().subscribe( result => this.addressList = result );
    this.paymentMethodService.list().subscribe( result => this.paymentMethodList = result );
    this.cart = this.cartService.cart;
    this.listenCart();
  }

  listenCart() {
    this.cartSubscription = this.cartService.cart$.subscribe( cart => {
      this.cart = cart;
      this.calculeTotal();
    });
  }

  calculeTotal() {
    this.totalPrice = 0;
    for( let line of this.cart ) {
      this.totalPrice += line.product.prix * line.quantite;
    }
  }


  onCheckout() {
    this.route.navigate(['/cart/paymentCart']);
  }

  askSave() {
    this.onCheckout();
  }


}
