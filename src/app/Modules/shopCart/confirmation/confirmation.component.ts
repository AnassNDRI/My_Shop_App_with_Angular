import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Address } from 'src/app/models/address';
import { CartLine } from 'src/app/models/cartLine';
import { Tva } from 'src/app/models/tva';
import { User } from 'src/app/models/user';
import { AddressService } from '../../services/address.service';
import { TvaService } from '../../services/tva.service';
import { ProfileService } from '../../services/profile.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

numCommande:any;
  cart!: CartLine[];
  curDate=new Date();
  total:number=0.00;
  frais:number=0.00;
  soustotal:number = 0.00;
  currentUser!:User;
  address!: Address;
  addressList: Address[] = [];
  tvaList: Tva[]= [];
  cartSubscription!: Subscription;
  totalPrice:number=0
  addressSelected: Address | null = null;

  constructor(private profileService: ProfileService,
    private addressService: AddressService,
    private cartService: CartService,
    private tvaService:TvaService,
    private route: Router) {

}

ngOnInit(): void {
this.addressSelected?.rue;
this.cart = this.cartService.cart;
this.tvaService.list().subscribe( result => this.tvaList = result);
this.listenPanier();
this.addressService.findByUtilisateur().subscribe(address => this.addressList = address);
this.profileService.getAccount().subscribe(user => this.currentUser = user);
this.numCommande = this.generateNumCommande();
this.cartService.clearR();
}
private generateNumCommande() {
return Math.random().toString().slice(2,11);
}

listenPanier() {
this.cartSubscription = this.cartService.cart$.subscribe( cart => {
this.cart = cart;
this.calculerTotal();
});
}
calculerTotal() {
this.totalPrice = 0;
for( let ligne of this.cart ) {
this.totalPrice += ligne.product.prix * ligne.quantite;
}
}

change(event: any){
this.addressList=event;
}

close(){
this.route.navigate(['/home']);
}
}
