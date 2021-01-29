import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/app.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: IUser;

  constructor() {
    const user: string = localStorage.getItem('user') || '';
    this.user = JSON.parse(user);
  }

  ngOnInit(): void { }
}
