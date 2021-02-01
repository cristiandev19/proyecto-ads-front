import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from '../app.model';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private appSrv: AppService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const user: IUser = JSON.parse(localStorage.getItem('user') || 'null')
    if (!user) {
      this.router.navigateByUrl('/auth/login');
      return false;
    }
    const ruta = route.url[0].path;
    if (ruta == 'admin') {
      return true;
    } else {
      return this.appSrv.getAccionesXRol(user._id_rol)
        .pipe(
          map((res: any) => {
            const acciones = res.acciones
            .map((acc: any) => acc.ruta_accion.split('/')[2]);
            if (acciones.includes(ruta)) {
              return true;
            } else {
              this.router.navigateByUrl('/admin/home');
              return false;
            }
          }, (err: any) => {
            return false;
          })
        )
    }
  }
}
