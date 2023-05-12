import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { AuthenticationService } from 'src/app/security/services/authentication.service';
import { Base_url } from 'src/app/shared/baseUrl';
import { User } from 'src/app/models/user';
import { Address } from 'src/app/models/address';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  url = Base_url.Url_ServBack + '/utilisateurs';
  urlAddress = Base_url.Url_ServBack + '/adresses';


  constructor(private http: HttpClient,
              private authService : AuthenticationService) {
  }


  save(user: User): Observable<User> {
    if( user.id ) {
      return this.http.put<User>(this.url, user);
    } else {
      return this.http.post<User>(this.url, user);
    }
  }

  getAccount(): Observable<User> {
    return this.http.get<User>(this.url + '/account');
  }

  findByUtilisateur(): Observable<Address[]> {
    return this.http.get<Address[]>(this.urlAddress + '/utilisateur');
  }


  delete(id: number): Observable<void> {
    return this.http.delete<void>( this.url + '/' + id );
  }

}

