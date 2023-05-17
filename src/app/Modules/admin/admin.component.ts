import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/security/services/authentication.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  isAuth = false;
  isAdmin= false;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated.subscribe( auth => {
      this.isAuth = auth;
      this.isAdmin = this.authService.isAdmin;
    });
  }
}
