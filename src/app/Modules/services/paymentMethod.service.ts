import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';
import { PayementMethod } from "src/app/models/paymentMethod";
import { Base_url } from "src/app/shared/baseUrl";



@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  url = Base_url.Url_ServBack + '/paymentMethods'; // Url vers l'api


  constructor(private http: HttpClient) {
  }

  // liste toutes les moyens de paiements
  list(): Observable<PayementMethod[]> {
    return this.http.get<PayementMethod[]>(this.url + '/list');
  }

  // Cette methode verifie l'Id, s'il y'a une; il modifie le moyen de paiement
 // sinon une nouvelle Id est auto-générée et le moyen de paiement est enregistré
  save(moyenPaiement: PayementMethod): Observable<PayementMethod> {
    if( moyenPaiement.id ) {
      return this.http.put<PayementMethod>(this.url, moyenPaiement);
    } else {
      return this.http.post<PayementMethod>(this.url, moyenPaiement);
    }
  }

  // Trouver un moyen de paiement à l'aide de son Id
  findById(id: number): Observable<PayementMethod> {
    return this.http.get<PayementMethod>(this.url + '/detail/' + id);
  }

  // supprimer un moyen de paiement
  delete(id: number): Observable<void> {

    const url = `${this.url}/delete/${id}`;
    return this.http.delete<void>(url);
  }

}

