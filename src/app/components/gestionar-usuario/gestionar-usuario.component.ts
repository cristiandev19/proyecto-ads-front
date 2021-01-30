import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { IUser } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';
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
      console.log('res', res)
      this.dataSource.data = res.usuarios;
    }, err => {
      console.log('err', err);
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

}
