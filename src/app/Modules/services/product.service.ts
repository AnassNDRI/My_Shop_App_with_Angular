import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of, tap} from "rxjs";
import { AuthenticationService } from 'src/app/security/services/authentication.service';
import { Base_url } from 'src/app/shared/baseUrl';
import {Product} from "../../models/product";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = Base_url.Url_ServBack + '/products'; // Url vers l'api


  constructor(private http: HttpClient,
              private authService: AuthenticationService) {
  }

  // Liste tous les produits
  list(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url + '/list');
  }

  // Cette methode verifie l'Id, s'il y'a une; il modifie l'article sinon
 // une nouvelle Id est auto-générée et l'article est enregistrée
  save(article: Product): Observable<Product> {
       if( article.id ) {
      return this.http.put<Product>(this.url, article);
    } else {
      return this.http.post<Product>(this.url, article);
    }
  }

  // Trouver un product Type à l'aide de son Id
  findById(id: number): Observable<Product> {
    return this.http.get<Product>(this.url + '/detail/' + id);
  }

  // supprime l'article
  delete(id: number): Observable<void> {
    return this.http.delete<void>( this.url + '/delete/' + id);
  }

}
