import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { FormMensajeComponent } from 'src/app/shared/form-mensaje/form-mensaje.component';

@Component({
  selector: 'cs-restart-password',
  templateUrl: './restart-password.component.html',
  styleUrls: ['./restart-password.component.scss']
})
export class RestartPasswordComponent implements OnInit {

  id_usuario: any;
  restartForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private appSrv: AppService
  ) {
    this.restartForm = this.createForm(); 
  }

  ngOnInit(): void {
    this.id_usuario = this.route.snapshot.paramMap.get('id');

    // this.hero$ = this.service.getHero(heroId);
  }

  createForm() {
    let obj = {
      password: ['', Validators.required],
      password_confirm: ['', Validators.required],
    }
    return this.fb.group(obj);
  }
  handlePass() {
    const pass : any = this.restartForm.value;
    if (!pass.password.trim()) {
      const dialogRef2 = this.dialog.open(FormMensajeComponent, {
        data: {
          message: 'ingreses una contrasena',
          title: 'Mensaje',
          closeMessage: 'Volver'
        }
      });
      return ;
    }
    if (pass.password !== pass.password_confirm) {
      const dialogRef2 = this.dialog.open(FormMensajeComponent, {
        data: {
          message: 'las contrasenas deben ser iguales',
          title: 'Mensaje',
          closeMessage: 'Volver'
        }
      });
      return ;
    }

    const obj= {
      password: pass.password,
      id_usuario: this.id_usuario
    }
    this.appSrv.updatePass(obj).subscribe(res => {
      const dialogRef2 = this.dialog.open(FormMensajeComponent, {
        data: {
          message: 'Se actualizo correctamente',
          title: 'Mensaje',
          closeMessage: 'Volver'
        }
      });
      this.router.navigate(['/auth/login'])
    }, err => {
    })
  }

  
}
