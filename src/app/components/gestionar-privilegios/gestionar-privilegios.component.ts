import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { CreateRolModalComponent } from '../create-rol-modal/create-rol-modal.component';
import { HandleAccionesModalComponent } from '../handle-acciones-modal/handle-acciones-modal.component';
import { UsuarioModalComponent } from '../usuario-modal/usuario-modal.component';

@Component({
  selector: 'app-gestionar-privilegios',
  templateUrl: './gestionar-privilegios.component.html',
  styleUrls: ['./gestionar-privilegios.component.scss']
})
export class GestionarPrivilegiosComponent implements OnInit {

  codigoUsuario : FormControl;

  constructor(
    private dialog: MatDialog,
    private appSrv: AppService
  ) {
    this.codigoUsuario = new FormControl('', Validators.required);
  }

  ngOnInit(): void { }

  handleNuevoRol() {
    const dialogRef = this.dialog.open(CreateRolModalComponent, {
      data: {

      }
    });

    dialogRef.componentInstance.eventEmit.subscribe((event: any) => {
      dialogRef.close();
    })
  }
  handleAcciones() {
    const dialogRef = this.dialog.open(HandleAccionesModalComponent, {
      data: {

      }
  });

    dialogRef.componentInstance.eventEmit.subscribe((event: any) => {
      dialogRef.close();
    })

  }

  handleBuscar() {
    const codigoUsuario = this.codigoUsuario.value;

    this.appSrv.searchUsuario(codigoUsuario).subscribe((res: any) => {
      if (res.usuario.length > 0) {
        const dialogRef = this.dialog.open(UsuarioModalComponent, {
          width: '600px',
          data: {
            usuario: res.usuario[0]
          }
        })
      }
    }, err => {
    })
  }


}
