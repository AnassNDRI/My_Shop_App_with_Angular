
import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from "@angular/router";
import { Product } from "src/app/models/product";
import { CartLine } from "src/app/models/cartLine";

@Injectable({
  providedIn: 'root'
})

export class CartService {

  private cartSubject$: BehaviorSubject<CartLine[]> = new BehaviorSubject<CartLine[]>([]);
  public cart$: Observable<CartLine[]> = this.cartSubject$.asObservable();


  items:  Product[] = [];

  constructor(private route: Router) {
  }

  get cart(): CartLine[] {
    return this.cartSubject$.getValue();
  }

  add(product: Product) {
    let cart = this.cart;

    // Vérifier si l'article n'existe pas déjà dans le panier :
    // - s'il existe : on augmente simplement sa quantité
    let dejaDansPanier = false;
    for (let line of cart) {
      if (line.product.id === product.id) {
          line.quantite++;
          dejaDansPanier = true;
      }
    }

    // - s'il n'existe pas : on crée une nouvelle ligne dans le panier
    if (!dejaDansPanier) {
      const line = {
        product: product,
        quantite: 1
      }
      cart.push(line);
    }

    this.cartSubject$.next( cart );
    this.savePanier();
  }

  removeLigne(productId: number) {
    const cart = this.cart;
    let i = 0;

    for (let line of cart) {
      if (line.product.id === productId) {
        const confirmation = confirm('Souhaitez-vous supprimer cet article de votre panier ?');
        if (confirmation == true)
        cart.splice(i, 1);
        break;
      }
      i++;
    }

    this.cartSubject$.next( cart );
    this.savePanier();

  }

  remove(productId: number) {
    const cart = this.cart;
    let i = 0;

    for (let ligne of cart) {

      if (ligne.product.id === productId) {
        if (ligne.quantite > 1) {
          ligne.quantite--;
        }
        else {
        const confirmation = confirm('Souhaitez-vous supprimer cet article de votre panier?');
          if (confirmation == true)
          cart.splice(i, 1);
          else
            ;
        }
        break;
      }
      i++;
    }
    this.cartSubject$.next( cart );
    this.savePanier();
  }

  clear() {
    this.cartSubject$.next([]);
    this.savePanier();
    this.route.navigate(['/home']);
  }

  clearR() {
    this.cartSubject$.next([]);
    this.savePanier();
  }

  savePanier() {
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
  }

  loadPanier() {
    const cartJson: string | null = sessionStorage.getItem('cart');
    if (cartJson) {
      const cart = JSON.parse(cartJson);
      this.cartSubject$.next(cart);
    }
  }

  clearCart() {
    this.items = [];
    this.savePanier();
    return this.items;
  }


}
