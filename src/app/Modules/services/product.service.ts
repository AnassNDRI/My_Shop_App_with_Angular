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

  url = Base_url.Url_ServBack + '/products';


  constructor(private http: HttpClient,
              private authService: AuthenticationService) {
  }

  list(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url + '/list');
  }

  save(article: Product): Observable<Product> {
       if( article.id ) {
      return this.http.put<Product>(this.url, article);
    } else {
      return this.http.post<Product>(this.url, article);
    }
  }

  findById(id: number): Observable<Product> {
    return this.http.get<Product>(this.url + '/detail/' + id);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>( this.url + '/delete/' + id);
  }

/**
  url = BaseUrl.backenURL + '/products';

  constructor(private http: HttpClient) { }


  // recherche per autoCompletion avec la librairie RXJS
  searchProductList(term: string): Observable<Product[]> {
    // cette condition impose une saisi pour la recherche au moins à 2 lettres
    // pour ne pas soliciter inutilement le serveur.
    if(term.length <= 1) {
      return of([]);
    }
    return this.http.get<Product[]>(`api/products/?name=${term}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );

  }

  getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url ).pipe (
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined)));
  }

  addProduct(product: Product): Observable<Product> {

    return this.http.post<Product>(this.url, product).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );

  }

  updateProduct(product: Product): Observable<null> {
    return this.http.put(this.url, product).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );

  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(this.url + '/' + id).pipe (
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined)));
  }


  deleteProductById(productId: number) : Observable<null> {
    return this.http.delete<Product>(this.url + '/' + productId).pipe (
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
    );

  }





/////////////////////////////////////////////////////////////////////////////////////////////////
  // methode de log pour eviter la redondance de code dans les methode CRUD
  private log(response: any) {
    console.table(response);
  }
  // methode "prendre une Erreur" pour eviter la redondance  de code dans les methode CRUD
  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }


 */
}
