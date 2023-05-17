import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {config, Observable} from "rxjs";
import { User } from 'src/app/models/user';
import { Base_url } from 'src/app/shared/baseUrl';


@Injectable({
  providedIn: 'root'
})
export class UserService {
 url = Base_url.Url_ServBack + '/users'; // url vers l'api

  constructor(private http: HttpClient) { }

  // Liste tous les utilisateurs
  list(): Observable<User[]> {
    return this.http.get<User[]>(this.url + '/list');
  }

  // Cette methode verifie l'Id, s'il y'a une; il modifie l'user entré sinon
 // une nouvelle Id est auto-générée et l'utilisateur est enregistré
  save(user: User): Observable<User> {
    if( user.id ) {
      return this.http.put<User>(this.url, user);
    } else {
      return this.http.post<User>(this.url, user);
    }
  }

  // Trouve un utilisateur à l'aide de son Id
  findById(id: number): Observable<User> {
    return this.http.get<User>(this.url + '/detail/' + id);
  }

  // Supprimer un utilisateur à l'aide de son Id
  delete(id: number): Observable<void> {
    return this.http.delete<void>( this.url + '/' + id );
  }

  // Trouve le compte de l'utilisateur
  findAccount(): Observable<User>{
    return this.http.get<User>(this.url + '/account');
  }

}
