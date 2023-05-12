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

this.profileService.getAccount().subscribe( user => this.currentUser = user );

}


closeSession() {
this.router.navigate(['/home']);
}


askProfil() {
  this.router.navigate(['/utilisateur', 'single']);
}

askAddresse() {
  this.router.navigate(['/address', 'list']);
}

askHelp() {
  this.router.navigate(['/faqs']);
}

askCommande() {
  this.router.navigate(['/commandes', 'single']);
}

askFactures() {
  this.router.navigate(['/factures', 'single']);
}

}
