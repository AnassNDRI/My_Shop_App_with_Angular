import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';
import { PayementMethod } from "src/app/models/paymentMethod";
import { Base_url } from "src/app/shared/baseUrl";



@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  url = Base_url.Url_ServBack + '/paymentMethods';


  constructor(private http: HttpClient) {
  }

  list(): Observable<PayementMethod[]> {
    return this.http.get<PayementMethod[]>(this.url + '/list');
  }

  save(moyenPaiement: PayementMethod): Observable<PayementMethod> {
    if( moyenPaiement.id ) {
      return this.http.put<PayementMethod>(this.url, moyenPaiement);
    } else {
      return this.http.post<PayementMethod>(this.url, moyenPaiement);
    }
  }

  findById(id: number): Observable<PayementMethod> {
    return this.http.get<PayementMethod>(this.url + '/detail/' + id);
  }

  delete(id: number): Observable<void> {

    const url = `${this.url}/delete/${id}`;
    return this.http.delete<void>(url);
  }

}

