import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { IUser } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';
import { ConfirmModalComponent } from 'src/app/shared/confirm-modal/confirm-modal.component';
import { UsuarioEdicionModalComponent } from '../usuario-edicion-modal/usuario-edicion-modal.component';

@Component({
  selector: 'app-gestionar-usuario',
  templateUrl: './gestionar-usuario.component.html',
  styleUrls: ['./gestionar-usuario.component.scss']
})
export class GestionarUsuarioComponent implements OnInit {
  displayedColumns: string[] = ['nombres','usurio','password','rol','id','acciones'];
  dataSource: MatTableDataSource<IUser> = new MatTableDataSource();

  constructor(
    private appSrv: AppService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.refreshTable()
  }

  refreshTable() {
    this.appSrv.getUsuarios().subscribe((res: any) => {
      this.dataSource.data = res.usuarios;
    }, err => {
    })
  }

  handleCrearUsuario() {
    const usuario = {
      nombres: '',
      email: '',
      password: ''
    }
    const dialogRef = this.dialog.open(UsuarioEdicionModalComponent, {
      width: '500px',
      data: {
        usuario,
        type: 'crear'
      }
    })
    dialogRef.componentInstance.eventEmit.subscribe((emit: any) => {
      this.refreshTable();
      dialogRef.close();
    })
  }
  handleActualizarUsuario(usuario: any) {
    const dialogRef = this.dialog.open(UsuarioEdicionModalComponent, {
      width: '500px',
      data: {
        usuario,
        type: 'editar'
      }
    })
    dialogRef.componentInstance.eventEmit.subscribe((emit: any) => {
      this.refreshTable();
      dialogRef.close();

    })
  }

  handleDelete(usuario: any) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '500px',
      data: {
        title: 'eliminar',
        msj: 'estas seguro que quieres eliminar?'
      }
    })
    dialogRef.componentInstance.eventEmit.subscribe((emit: any) => {
      // this.refreshTable();
      // dialogRef.close();
      if(emit.action == 1) {
        const obj = {
          id_usuario: usuario.id_usuario
        }
        this.appSrv.deleteUsuario(obj).subscribe(res => {
          this.refreshTable()

        }, err => {
        })
      }

      dialogRef.close();
    })

  }
}
