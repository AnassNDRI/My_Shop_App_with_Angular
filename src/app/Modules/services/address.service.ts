import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';
import { Base_url } from "src/app/shared/baseUrl";
import { Address } from "src/app/models/address";


@Injectable({
  providedIn: 'root'
})
export class AddressService {

  url = Base_url.Url_ServBack + '/address';



  constructor(private http: HttpClient) {
  }

  list(): Observable<Address[]> {
    return this.http.get<Address[]>(this.url + '/list');
  }

  save(adress: Address): Observable<Address> {
    if(adress.id) {
      return this.http.put<Address>(this.url, adress);
    }
      return this.http.post<Address>(this.url, adress);

  }

  findById(id: number): Observable<Address> {
    return this.http.get<Address>(this.url  + 'detail' + id);
  }

  findByUtilisateur(): Observable<Address[]> {
    return this.http.get<Address[]>(this.url + '/utilisateur');
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>( this.url + '/delete/' + id);
  }


}

