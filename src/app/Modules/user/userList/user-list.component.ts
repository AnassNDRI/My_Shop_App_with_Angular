import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { RoleService } from '../../services/role.service';
import { UserService } from '../../services/user.service';
import { AddressTypeService } from '../../services/addressType.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  roleList: Role[]= [];
  user!: User;
  isAdmin = false;
  accountMode = false;

  constructor(
              private roleService: RoleService,
              private addressService: AddressTypeService,
              private router: Router,
              private userService: UserService) { }

  ngOnInit(): void {
    this.roleService.list().subscribe(result => this.roleList = result);
    this.refresh();
  }

  refresh() {
    this.userService.list().subscribe(users => {
      this.users = users;
    });
  }

  askEdit(id: number) {
    this.router.navigate(['/users', 'form', id]);
  }

  askDelete(id: number) {
    this.userService.delete(id).subscribe(() => {
      alert('cet utilisateur  bien été supprimé');
      this.refresh();
    });
  }

  askAdd() {
    this.router.navigate(['/users', 'form']);
  }

  askBack() {
    this.router.navigate(['/admin']);
  }

  getLabelRole(roleId: number) {
    const role = this.roleList.find(role => role.id === roleId);
    if (role) {
      return role.libelle;
    }
    return 'Pas d\'utilisateur';
  }

}
