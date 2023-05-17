import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {Observable} from 'rxjs';
import { Brand } from "src/app/models/brand";
import { AuthenticationService } from "src/app/security/services/authentication.service";
import { Base_url } from "src/app/shared/baseUrl";



@Injectable({
  providedIn: 'root'
})
export class BrandService {


  url = Base_url.Url_ServBack + '/brands'; // Url vers l'api

  constructor(private http: HttpClient,
              private authService : AuthenticationService) {
  }

  list(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.url + '/list');
  }

  save(marque: Brand): Observable<Brand> {

    if( marque.id ) {
      return this.http.put<Brand>(this.url, marque);
    } else {
      return this.http.post<Brand>(this.url, marque);
    }
  }

  findById(id: number): Observable<Brand> {
    return this.http.get<Brand>(this.url + '/detail' + id);
  }

  delete(id: number): Observable<void> {

    return this.http.delete<void>( this.url + '/delete' + id);
  }

}

