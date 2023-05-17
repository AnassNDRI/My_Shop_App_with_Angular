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

  url = Base_url.Url_ServBack + '/users';   // Url vers l'api user
  urlAddress = Base_url.Url_ServBack + '/adresses'; // Url vers l'api address


  constructor(private http: HttpClient,
              private authService : AuthenticationService) {
  }

  // Cette methode verifie l'Id, s'il y'a une; il modifie les infos de l'user sinon
  // une nouvelle Id est auto-générée et est enregistrée
  save(user: User): Observable<User> {
    if( user.id ) {
      return this.http.put<User>(this.url, user);  // Modification
    } else {
      return this.http.post<User>(this.url, user); // Enregistrement
    }
  }

  // Trouver le compte de l'utilisateur
  getAccount(): Observable<User> {
    return this.http.get<User>(this.url + '/account');
  }

  // Trouver l'adresse de l'utilisateur
  findByUtilisateur(): Observable<Address[]> {
    return this.http.get<Address[]>(this.urlAddress + '/utilisateur');
  }

  // Supprimer le profile de l'utilisateur
  delete(id: number): Observable<void> {
    return this.http.delete<void>( this.url + '/' + id );
  }

}

