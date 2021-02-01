import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: IUser;
  acciones: any = [];

  constructor(
    private router: Router,
    private appSrv: AppService
  ) {
    const user: string = localStorage.getItem('user') || '';
    this.user = JSON.parse(user);

    this.appSrv.getAccionesXRol(this.user._id_rol).subscribe((res: any) => {
      console.log('res', res);
      this.acciones = res.acciones;
    }, err => {
      console.log('err', err);
    })
  }

  ngOnInit(): void { }

  handleLogout() {
    console.log('entrooo')
    localStorage.removeItem('user');

    this.router.navigate(['/auth/login'])
  }

}
