import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';
import { Supplier } from "src/app/models/supplier";
import { AuthenticationService } from "src/app/security/services/authentication.service";
import { Base_url } from "src/app/shared/baseUrl";



@Injectable({
  providedIn: 'root'
})
export class SupplierService {


  url = Base_url.Url_ServBack + '/suppliers'; // Url vers l'api


  constructor(private http: HttpClient,
              private authService: AuthenticationService) {
  }

  list(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.url + '/list');
  }

  save(supplier: Supplier): Observable<Supplier> {

    if( supplier.id ) {
      return this.http.put<Supplier>(this.url, supplier);
    } else {
      return this.http.post<Supplier>(this.url, supplier);
    }
  }

  findById(id: number): Observable<Supplier> {
    return this.http.get<Supplier>(this.url + '/' + id);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>( this.url + '/' + id);
  }

}

