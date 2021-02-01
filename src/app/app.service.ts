import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAccion, IAsignarAccion, IRol } from './app.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  URL_BACK : string = environment.urlBack;
  httpOptions : any;

  constructor(
    private _http: HttpClient
  ) {
    this.httpOptions = {
     headers: new HttpHeaders({
       'Content-Type':  'application/json',
       Authorization: 'my-auth-token'
     })
   };
  }

  login(email: string, password: string): Observable<any> {
    const params = new HttpParams()
      .append('email', email)
      .append('password', password);
    return this._http.get(`${this.URL_BACK}/login`, { params })
  }


  getProductos(): Observable<any> {
    return this._http.get(`${this.URL_BACK}/productos`)
  }

  insertRol(obj: IRol): Observable<any> {
    return this._http.post(`${this.URL_BACK}/insert-rol`, obj ,this.httpOptions);
  }


  insertAccion(obj: IAccion): Observable<any> {
    return this._http.post(`${this.URL_BACK}/insert-rol`, obj ,this.httpOptions);
  }

  asignarAccionRol(obj: IAsignarAccion): Observable<any> {
    return this._http.post(`${this.URL_BACK}/asignar-accion`, obj ,this.httpOptions);
  }

  getUsuario(id_usuario: string) {
    const params = new HttpParams()
      .append('id_usuario', id_usuario);
    return this._http.get(`${this.URL_BACK}/get-usuario`, { params });
  }

  getUsuarios() {
    return this._http.get(`${this.URL_BACK}/usuarios`);
  }


  getRoles() {
    return this._http.get(`${this.URL_BACK}/roles`);
  }

  getAcciones() {
    return this._http.get(`${this.URL_BACK}/acciones`);
  }


  createUsuario(obj: any) {
    return this._http.post(`${this.URL_BACK}/create-usuario`, obj ,this.httpOptions);
  }

  updateUsuario(obj: any) {
    return this._http.post(`${this.URL_BACK}/update-usuario`, obj ,this.httpOptions);
  }

  insertProducto(obj: any) {
    return this._http.post(`${this.URL_BACK}/insert-product`, obj ,this.httpOptions);
  }

  updateProducto(obj: any) {
    return this._http.post(`${this.URL_BACK}/update-product`, obj ,this.httpOptions);
  }

  deleteProducto(obj: any) {
    return this._http.post(`${this.URL_BACK}/delete-product`, obj, this.httpOptions);
  }

  getAccionesXRol(id_rol: string) {
    const params = new HttpParams()
      .append('id_rol', id_rol);
    return this._http.get(`${this.URL_BACK}/acciones-x-rol`, { params });
  }

  emitirNotaVenta(obj: any) {
    return this._http.post(`${this.URL_BACK}/emitir-notaventa`, obj, this.httpOptions);
  }

  buscarNotaVenta(nota_venta: string) {
    const params = new HttpParams()
    .append('nota_venta', nota_venta);
    return this._http.get(`${this.URL_BACK}/buscar-notaventa`, { params });
  }

  emitirBoleta(obj: any) {
    return this._http.post(`${this.URL_BACK}/emitir-boleta`, obj, this.httpOptions);
  }

  getBoletas() {
    const params = new HttpParams();
    return this._http.get(`${this.URL_BACK}/boletas`, { params });
  }


}