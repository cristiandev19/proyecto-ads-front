import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'cs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private appSrv: AppService
  ) {
    this.loginForm = this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    let obj = {
      email: ['', Validators.required],
      password: ['', Validators.required],
    }
    return this.fb.group(obj);
  }

  handleLogin() {
    const { email, password } = this.loginForm.value;
    this.appSrv.login(email, password).subscribe(res => {
      // console.log('res', res)
      const usuario = {
        ...res.user,
        isLoged: true
      }
      localStorage.setItem('user', JSON.stringify(usuario));
      this.router.navigate(['/admin/home'])
    }, err => {
      console.log('err', err)
    });

  }
}
