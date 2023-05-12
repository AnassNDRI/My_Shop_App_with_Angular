import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/security/services/authentication.service';
import { ProfileService } from '../../services/profile.service';
import { Address } from 'src/app/models/address';
import { AddressService } from '../../services/address.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  currentUser ! : User;

  constructor( private authService: AuthenticationService,
    private router:Router ,
    private profileService: ProfileService) {
}


ngOnInit(): void {

  // initialise le compte de l'utilisateur courant
this.profileService.getAccount().subscribe( user => this.currentUser = user );

}

// Ferme la session de l'utilisteur et le ramène à la page d'acceuil
closeSession() {
this.router.navigate(['/home']);
}

// Redirige vers le profile du l'utilisateur courant
askProfil() {
  this.router.navigate(['/utilisateur', 'single']);
}

// Redirige vers  addressForm
askAddresse() {
  this.router.navigate(['/address', 'list']);
}

// Redirige vers faqs
askHelp() {
  this.router.navigate(['/faqs']);
}

// Redirige vers la gestion des commandes
askCommande() {
  this.router.navigate(['/commandes', 'single']);
}

// Redirige vers la facture du client
askFactures() {
  this.router.navigate(['/factures', 'single']);
}

}
