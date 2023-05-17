import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';
import { Tva } from "src/app/models/tva";
import { Base_url } from "src/app/shared/baseUrl";



@Injectable({
  providedIn: 'root'
})
export class TvaService {

  url = Base_url.Url_ServBack + '/tvas';


  constructor(private http: HttpClient) {
  }

  // Liste toutes les TVA
  list(): Observable<Tva[]> {
    return this.http.get<Tva[]>(this.url + '/list');
  }

  // Cette methode verifie l'Id, s'il y'a une; il modifie la TVA sinon
 // une nouvelle Id est auto-générée et la tv est enregistrée
  save(tva: Tva): Observable<Tva> {
    if( tva.id ) {
      return this.http.put<Tva>(this.url, tva);
    } else {
      return this.http.post<Tva>(this.url, tva);
    }
  }

  // Trouver la Tva à l'aide de l'Id
  findById(id: number): Observable<Tva> {
    return this.http.get<Tva>(this.url + '/' + id);
  }

  // Suppression de la Tva à l'aide de l'Id
  delete(id: number): Observable<void> {
    const url = `${this.url}/${id}`;
    return this.http.delete<void>(url);
  }

}

