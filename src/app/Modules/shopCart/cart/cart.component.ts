
import {Component, OnDestroy, OnInit} from '@angular/core';


import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

import {Tva} from '../../../models/tva';
import { CartLine } from 'src/app/models/cartLine';
import { TvaService } from '../../services/tva.service';
import { Product } from 'src/app/models/product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent  implements OnInit, OnDestroy {

  cart!: CartLine[];;
  totalPrice: number = 0;
  cartSubscription!: Subscription;
  tvaList: Tva[]= [];




constructor(private router: Router,
  private tvaService: TvaService,
  private cartService: CartService) { }

ngOnInit(): void {
this.cart = this.cartService.cart;
this.tvaService.list().subscribe( result => this.tvaList = result);
this.listenCart();
}

ngOnDestroy() {
this.cartSubscription.unsubscribe();
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

askDelete(id: number) {
this.cartService.removeLigne(id);
}

removeProduct (product : Product ) {
this.cartService.remove(product.id);
}

addProduct (product : Product ) {
// const confirmation = confirm('Desolé nous somme en rupture de stock pour ce product  ?');
this.cartService.add(product );
}

askBack() {
this.router.navigate(['/home'])
}

askOrder() {
this.router.navigate(['/cart/checkCart'])
}

clearCart(){
const confirmation = confirm('Souhaitez-vous vraiment VIDER votre Panier ?');
if (confirmation == true)
this.cartService.clear();
}




}
