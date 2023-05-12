import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';
import { AddressType } from "src/app/models/address-type";
import { Base_url } from "src/app/shared/baseUrl";



@Injectable({
  providedIn: 'root'
})
export class AddressTypeService {

  url = Base_url.Url_ServBack + '/addressTypes';

  constructor(private http: HttpClient) {
  }

  findById(id: number): Observable<AddressType > {
    return this.http.get<AddressType >(this.url + '/' + id);
  }
  list(): Observable<AddressType []> {
    return this.http.get<AddressType []>(this.url + '/list');
  }
  delete(id: number): Observable<void> {

    const url = `${this.url}/${id}`;
    return this.http.delete<void>(url);
  }

  save(addressType: AddressType ): Observable<AddressType > {
    if( addressType.id ) {
      return this.http.put<AddressType >(this.url, addressType);
    } else {
      return this.http.post<AddressType >(this.url, addressType);
    }
  }




}

