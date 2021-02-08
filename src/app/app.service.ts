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

  getBoletas1() {
    const params = new HttpParams();
    return this._http.get(`${this.URL_BACK}/boletas1`, { params });
  }

  getBoletasFiltro(fecha: string) {
    const params = new HttpParams()
    .append('fecha', fecha);
    return this._http.get(`${this.URL_BACK}/boletas-filtro`, { params });
  }

  // boletasFiltro2
  // getBoletasFiltro(fecha: string) {
  //   const params = new HttpParams()
  //   .append('fecha', fecha);
  //   return this._http.get(`${this.URL_BACK}/boletas-filtro`, { params });
  // }

  detalleBoleta(id_boleta: number) {
    const params = new HttpParams()
      .append('id_boleta', `${id_boleta}`);
    return this._http.get(`${this.URL_BACK}/detalle-boleta`, { params });
  }

  updateBoleta(obj: any) {
    return this._http.post(`${this.URL_BACK}/update-boleta`, obj, this.httpOptions);
  }

  validarEmail(email: string) {
    const params = new HttpParams()
      .append('email', email);
    return this._http.get(`${this.URL_BACK}/validar-email`, { params });
  }

  updatePass(obj: any) {
    return this._http.post(`${this.URL_BACK}/update-pass`, obj, this.httpOptions);
  }

  searchUsuario(id_usuario: string) {
    const params = new HttpParams()
      .append('id_usuario', id_usuario);
    return this._http.get(`${this.URL_BACK}/search-usuario`, { params });

  }
  // getBoletas() {
  //   return this._http.get(`${this.URL_BACK}/boletas`, obj, this.httpOptions);
  // }
  updateRol(obj: any) {
    return this._http.post(`${this.URL_BACK}/update-rol`, obj, this.httpOptions);
  }

  searchProduct(desc_producto: string) {
    const params = new HttpParams()
      .append('desc_producto', desc_producto);
    return this._http.get(`${this.URL_BACK}/search-producto`, { params });
  }

  boletasFiltro2(fecha_ini: string, fecha_fin: string) {
    const params = new HttpParams()
      .append('fecha_ini', fecha_ini)
      .append('fecha_fin', fecha_fin);
    return this._http.get(`${this.URL_BACK}/boletas-filtro2`, { params });
  }

  insertReclamo(obj: any) {
    return this._http.post(`${this.URL_BACK}/insert-reclamo`, obj, this.httpOptions);
  }

 
  buscarBoleta(boleta: string) {
    const params = new HttpParams()
      .append('boleta', boleta);
    return this._http.get(`${this.URL_BACK}/buscar-boleta`, { params });
  }

  deleteUsuario(obj: any) {
    return this._http.post(`${this.URL_BACK}/delete-usuario`, obj, this.httpOptions);
  }

}