import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartLine } from 'src/app/models/cartLine';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent  implements OnInit{

cart!: CartLine[];

constructor (private route: Router, private cartService: CartService) {}


ngOnInit(): void {
  this.cart = this.cartService.cart;
}

backTocheckCart() {
  this.route.navigate(['/cart/checkCart']);

}

goToConfirmCart() {
    this.route.navigate(['/cart/confirmCart']);

  }

}
