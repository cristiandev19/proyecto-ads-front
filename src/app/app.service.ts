import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  URL_BACK : string = environment.urlBack;

  constructor(
    private _http: HttpClient
  ) {}

  login(email: string, password: string): Observable<any> {
    const params = new HttpParams()
      .append('email', email)
      .append('password', password);
    return this._http.get(`${this.URL_BACK}/login`, { params })
  }


  getProductos(): Observable<any> {
    return this._http.get(`${this.URL_BACK}/productos`)
  }
}