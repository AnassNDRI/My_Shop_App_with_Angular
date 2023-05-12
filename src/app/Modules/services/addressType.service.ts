import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';
import { AddressType } from "src/app/models/address-type";
import { Base_url } from "src/app/shared/baseUrl";



@Injectable({
  providedIn: 'root'
})
export class AddressTypeService {

  url = Base_url.Url_ServBack + '/addressTypes'; // Url vers l'api

  constructor(private http: HttpClient) {
  }

  // Trouver une adresse Type en à l'aide l'Id
  findById(id: number): Observable<AddressType > {
    return this.http.get<AddressType >(this.url + '/' + id);
  }

  // liste toutes les adresses Types
  list(): Observable<AddressType []> {
    return this.http.get<AddressType []>(this.url + '/list');
  }

   // Supprimer une addresse Type
  delete(id: number): Observable<void> {

    const url = `${this.url}/${id}`;
    return this.http.delete<void>(url);
  }

 // Cette methode verifie l'Id, s'il y'a une; il modifie l'adresse Type sinon
 // une nouvelle Id est auto-générée et l'adresse est enregistrée
  save(addressType: AddressType ): Observable<AddressType > {
    if( addressType.id ) {
      return this.http.put<AddressType >(this.url, addressType);  // modification
    } else {
      return this.http.post<AddressType >(this.url, addressType);  // Enregistrement
    }
  }

}

