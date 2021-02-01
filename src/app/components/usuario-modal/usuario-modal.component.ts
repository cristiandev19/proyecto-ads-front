import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { FormMensajeComponent } from 'src/app/shared/form-mensaje/form-mensaje.component';

@Component({
  selector: 'app-usuario-modal',
  templateUrl: './usuario-modal.component.html',
  styleUrls: ['./usuario-modal.component.scss']
})
export class UsuarioModalComponent implements OnInit {
  roles: any[] = [];
  rolSelect : FormControl;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UsuarioModalComponent>,
    private appSrv: AppService,
    private dialog: MatDialog
  ) {
    console.log('data', this.data);
    this.rolSelect = new FormControl(this.data.usuario._id_rol, Validators.required);
    // this.medioPago = new FormControl('', [
      // Validators.required
    // ]);
  }

  ngOnInit(): void {
    this.appSrv.getRoles().subscribe((res: any) => {
      console.log('res', res)
      this.roles = res.roles;

      this.rolSelect.setValue(this.data.usuario._id_rol);
    }, err => {
      console.log('err', err);
    })
  }

  handleAceptar() {
    // handleAceptar
    const rol = this.rolSelect.value;
    console.log('rol', rol)

    const obj = {
      rol: rol,
      id_usuario: this.data.usuario.id_usuario
    }

    this.appSrv.updateRol(obj).subscribe(res => {
      console.log('res', res);
      const dialogRef2 = this.dialog.open(FormMensajeComponent, {
        data: {
          message: 'Se cambio el rol exitosamente',
          title: 'Mensaje',
          closeMessage: 'Volver'
        }
      });
      this.dialogRef.close();
    }, err => {
      console.log('err', err);
    })
  }
}
