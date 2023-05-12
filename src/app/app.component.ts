import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AuthenticationService} from "./security/services/authentication.service";
import {Router} from "@angular/router";
import {LayoutService} from "./security/services/layout.service";
import {TranslateService} from "@ngx-translate/core";
import { CartLine } from './models/cartLine';
import { CartService } from './Modules/services/cart.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ng-shop-app';
  isAuth = false;
  myToken:any;
  headerVisible = true;
  nbArticlesPanier = 0;
  cartSubscription!: Subscription;
  isAdmin = false;
  isEmploye = false;

  constructor( private authService: AuthenticationService,
               private router: Router,
               private cdr: ChangeDetectorRef,
               public layoutService: LayoutService,
               private cartService: CartService,
               private translate: TranslateService) {
  }
  ngOnInit() {

    this.cartService.loadPanier();
    this.cartSubscription = this.cartService.cart$.subscribe( (panier: CartLine[]) => {
      this.nbArticlesPanier = 0;
      for (let ligne of panier ) {
        this.nbArticlesPanier += ligne.quantite;
      }
    });

    console.log('isAuth before : ' , this.isAuth);
    this.myToken = sessionStorage.getItem('my-token');
    if(this.myToken){
      this.isAuth = true;
      this.authService.isAuthenticated.next(true);
    }else{
      this.isAuth=false;
      this.authService.isAuthenticated.next(false);
    }

    this.authService.isAuthenticated.subscribe( auth => {
      this.isAuth = auth;
      this.isAdmin = this.authService.isAdmin;
      this.isEmploye = this.authService.isEmploye;
      console.log('----->', this.isEmploye);
    });

    this.layoutService.isHeaderVisible$.subscribe(headerVisible => {
      this.headerVisible = headerVisible;
      // Si on ne met pas cdr.detectChanges, on a une erreur :
      // "NG0100: ExpressionChangedAfterItHasBeenCheckedError.."
      // On essaie de changer la variable (headerVisible) qui était à true pour la mettre à false,
      // il faut forcer à se remettre à jour en détectant le changement de valeurs
      this.cdr.detectChanges();
    });

    console.log('isAuth : ' , this.isAuth);

  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }


  goToLogin(){
    this.router.navigate(['/login']);
  }

  logout(){
    this.authService.logout();
    this.cartService.clear();
    this.router.navigate(['/home']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
