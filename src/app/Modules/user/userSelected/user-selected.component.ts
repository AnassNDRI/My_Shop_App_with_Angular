import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-selected',
  templateUrl: './user-selected.component.html',
  styleUrls: ['./user-selected.component.css']
})
export class UserSelectedComponent implements OnInit {

  user!: User
  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.userService.findAccount().subscribe( res => this.user = res);
  }

  askBack() {
    this.router.navigate(['/profile']);
  }

  askEdit(id: number) {
    this.router.navigate(['/users', 'single', 'form']);
  }
}
