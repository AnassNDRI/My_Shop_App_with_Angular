import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';
import { Category } from "src/app/models/category";
import { AuthenticationService } from "src/app/security/services/authentication.service";
import { Base_url } from "src/app/shared/baseUrl";




@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  url = Base_url.Url_ServBack + '/categories';


  constructor(private http: HttpClient,
              private authService : AuthenticationService) {
  }

  list(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url + '/list');
  }

  save(category: Category): Observable<Category> {

    if( category.id ) {
      return this.http.put<Category>(this.url, category);
    } else {
      return this.http.post<Category>(this.url, category);
    }
  }

  findById(id: number): Observable<Category> {
    return this.http.get<Category>(this.url + '/detail/' + id);
  }



  delete(id: number): Observable<void> {
    return this.http.delete<void>( this.url + '/delete/' + id);
  }






}

