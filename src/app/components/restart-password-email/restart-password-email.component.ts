import { ConstantPool } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { FormMensajeComponent } from 'src/app/shared/form-mensaje/form-mensaje.component';

@Component({
  selector: 'app-restart-password-email',
  templateUrl: './restart-password-email.component.html',
  styleUrls: ['./restart-password-email.component.scss']
})
export class RestartPasswordEmailComponent implements OnInit {
  email: FormControl;

  constructor(
    private dialog: MatDialog,
    private appSrv: AppService
  ) {
    this.email = new FormControl('', Validators.required);
  }

  ngOnInit(): void { }

  handleBuscar() {

    const email = this.email.value;

    if (!email.trim()) {
      const dialogRef2 = this.dialog.open(FormMensajeComponent, {
        data: {
          message: 'Ingrese un correo',
          title: 'Mensaje',
          closeMessage: 'Volver'
        }
      });
      return ;
    }
    this.appSrv.validarEmail(email).subscribe(res => {
      const dialogRef2 = this.dialog.open(FormMensajeComponent, {
        data: {
          message: 'Te enviamos un correo para reestablecer tu contra',
          title: 'Mensaje',
          closeMessage: 'Volver'
        }
      });
      this.email.setValue('');
    }, err => {
      const dialogRef2 = this.dialog.open(FormMensajeComponent, {
        data: {
          message: err.error.message,
          title: 'Error',
          closeMessage: 'Volver'
        }
      });
    })

  }
}
