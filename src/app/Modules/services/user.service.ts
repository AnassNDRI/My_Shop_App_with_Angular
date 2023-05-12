import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {config, Observable} from "rxjs";
import { User } from 'src/app/models/user';
import { Base_url } from 'src/app/shared/baseUrl';


@Injectable({
  providedIn: 'root'
})
export class UserService {
 url = Base_url.Url_ServBack + '/utilisateurs';

  constructor(private http: HttpClient) { }

  list(): Observable<User[]> {
    return this.http.get<User[]>(this.url + '/list');
  }

  save(user: User): Observable<User> {
    if( user.id ) {
      return this.http.put<User>(this.url, user);
    } else {
      return this.http.post<User>(this.url, user);
    }
  }

  findById(id: number): Observable<User> {
    return this.http.get<User>(this.url + '/detail/' + id);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>( this.url + '/delete/' + id );
  }

  findAccount(): Observable<User>{
    return this.http.get<User>(this.url + '/account');
  }

}
