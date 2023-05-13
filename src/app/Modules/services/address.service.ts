import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';
import { Base_url } from "src/app/shared/baseUrl";
import { Address } from "src/app/models/address";


@Injectable({
  providedIn: 'root'
})
export class AddressService {

  url = Base_url.Url_ServBack + '/address'; // Url vers l'api



  constructor(private http: HttpClient) {
  }

  // liste toutes les adresses
  list(): Observable<Address[]> {
    return this.http.get<Address[]>(this.url + '/list');
  }

  // Cette methode verifie l'Id, s'il y'a une; il modifie l'adresse
  save(adress: Address): Observable<Address> {
    if(adress.id) {
      return this.http.put<Address>(this.url, adress); // modification
    }
      return this.http.post<Address>(this.url, adress); // Enregistrement
  }

  // Trouver une adresse en à l'aide l'Id
  findById(id: number): Observable<Address> {
    return this.http.get<Address>(this.url  + 'detail' + id);
  }

  // Trouver l'adresse de l'utilisateur
  findByUtilisateur(): Observable<Address[]> {
    return this.http.get<Address[]>(this.url + '/utilisateur');
  }

  // Supprimer une addresse
  delete(id: number): Observable<void> {
    return this.http.delete<void>( this.url + '/delete/' + id);
  }


}

