import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, TimeoutError } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from '../app.model';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard2 implements CanActivate {
  constructor(
    private router: Router,
    private appSrv: AppService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const user: IUser = JSON.parse(localStorage.getItem('user') || 'null')

    console.log('route', route);
    const url: any[] =route?.url;
    console.log('url', url);

    if (url.length == 0) {
      this.router.navigateByUrl('/auth/login');
      return false;
    }
    const ruta = (url as any).path;

    console.log('ruta', ruta)
    console.log('user', user)
    // if (ruta == 'auth' && user) {
    //   this.router.navigateByUrl('/admin/home');
    //   return false;
    // }
    // if (ruta == 'auth' && !user) {
    //   // this.router.navigateByUrl('/auth/login');
    //   return true;
    // }
    if (user) {
      this.router.navigateByUrl('/admin/home');
      return true;
    } else {
      // this.router.navigateByUrl('/auth/login');
      return true;
    }
    // else {
    return true;
    // }
  }
}
