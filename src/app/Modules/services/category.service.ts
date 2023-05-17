import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';
import { Category } from "src/app/models/category";
import { AuthenticationService } from "src/app/security/services/authentication.service";
import { Base_url } from "src/app/shared/baseUrl";




@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url = Base_url.Url_ServBack + '/category';  // Url vers l'api


  constructor(private http: HttpClient,
              private authService : AuthenticationService) {
  }

  // liste toutes les categories
  list(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url + '/list');
  }

  // Cette methode verifie l'Id, s'il y'a une; il modifie la categorie
 // sinon une nouvelle Id est auto-générée et la categorie est enregistrée
  save(category: Category): Observable<Category> {

    if( category.id ) {
      return this.http.put<Category>(this.url, category);
    } else {
      return this.http.post<Category>(this.url, category);
    }
  }

    // Trouver une categorie à l'aide de son Id
  findById(id: number): Observable<Category> {
    return this.http.get<Category>(this.url + '/detail/' + id);
  }

    // Supprimer une categorie
  delete(id: number): Observable<void> {
    return this.http.delete<void>( this.url + '/delete/' + id);
  }
}



