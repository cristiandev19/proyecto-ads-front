import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { FormMensajeComponent } from 'src/app/shared/form-mensaje/form-mensaje.component';

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
    private appSrv: AppService,
    private dialog: MatDialog
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
      const dialogRef2 = this.dialog.open(FormMensajeComponent, {
        data: {
          message: err.error.message || 'hubo un problema',
          title: 'ERROR',
          closeMessage: 'Volver'
        }
      });
    });

  }
}
