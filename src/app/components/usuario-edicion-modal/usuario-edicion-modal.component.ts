import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUser } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';
import { FormMensajeComponent } from 'src/app/shared/form-mensaje/form-mensaje.component';

@Component({
  selector: 'app-usuario-edicion-modal',
  templateUrl: './usuario-edicion-modal.component.html',
  styleUrls: ['./usuario-edicion-modal.component.scss']
})
export class UsuarioEdicionModalComponent implements OnInit {
  @Output() eventEmit = new EventEmitter()
  usuarioForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appSrv: AppService,
    public dialogRef: MatDialogRef<UsuarioEdicionModalComponent>,
    private dialog: MatDialog
  ) {
    this.usuarioForm = this.createForm(this.data.usuario);
  }

  createForm({ nombres, email, password}: any) {
    let obj = {
      nombres : [nombres, Validators.required],
      email   : [email, Validators.required],
      password: [password, Validators.required],
    }
    return this.fb.group(obj);
  }


  ngOnInit(): void { }

  handleCreate() {
    const { nombres, email, password } = this.usuarioForm.value;
    
    if ( !nombres || !email || !password ) {
      const dialogRef2 = this.dialog.open(FormMensajeComponent, {
        data: {
          message: 'no pueden haber cambios vacios',
          title: 'error',
          closeMessage: 'Volver'
        }
      });
      return ;
    }
    
    const obj = {
      nombres, email, password
    }
    this.appSrv.createUsuario(obj).subscribe(res => {
      console.log('res', res);
      this.eventEmit.emit(res);
    }, err => {
      console.log('err', err);
    })
  }

  handleEdit() {
    const { nombres, email, password } = this.usuarioForm.value;

    if ( !nombres || !email || !password ) {
      const dialogRef2 = this.dialog.open(FormMensajeComponent, {
        data: {
          message: 'no pueden haber cambios vacios',
          title: 'error',
          closeMessage: 'Volver'
        }
      });
      return ;
    }

    const obj = {
      id_usuario: this.data.usuario.id_usuario, 
      nombres, email, password
    }
    // console.log('nombres, email, password', nombres, email, password)
    this.appSrv.updateUsuario(obj).subscribe(res => {
      console.log('res', res);
      this.eventEmit.emit(res);
    }, err => {
      console.log('err', err);
    })
  }
}
