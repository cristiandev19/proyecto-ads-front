import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/app.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  user: IUser;

  constructor(
    private router: Router
  ) {
    const user: string = localStorage.getItem('user') || '';
    this.user = JSON.parse(user);
  }

  ngOnInit(): void { }

  handleLogout() {
    console.log('entrooo')
    localStorage.removeItem('user');

    this.router.navigate(['/auth/login'])
  }
}
