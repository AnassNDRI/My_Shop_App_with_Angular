import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/security/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isAuth = false;
  constructor(private authService: AuthenticationService) {

   }

  ngOnInit(): void {
    this.authService.isAuthenticated.subscribe( auth => {
      if (auth !== null) {
        this.isAuth = auth;
      }
    });
  }

}
