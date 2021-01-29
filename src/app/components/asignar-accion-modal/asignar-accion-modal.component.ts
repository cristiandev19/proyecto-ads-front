import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-asignar-accion-modal',
  templateUrl: './asignar-accion-modal.component.html',
  styleUrls: ['./asignar-accion-modal.component.scss']
})
export class AsignarAccionModalComponent implements OnInit {
  @Output() eventEmit = new EventEmitter();
  asignarForm: FormGroup;
  acciones: any = [];
  roles: any = [];

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appSrv: AppService,
    public dialogRef: MatDialogRef<AsignarAccionModalComponent>,
    private _snackBar: MatSnackBar
  ) {
    this.asignarForm = this.createForm();
  }

  createForm() {
    let obj = {
      accion: ['', Validators.required],
      rol: ['', Validators.required],
    }
    return this.fb.group(obj);
  }

  ngOnInit(): void {
    const roles = this.appSrv.getRoles();
    const acciones = this.appSrv.getAcciones();
    forkJoin([roles, acciones]).subscribe((results: any) => {
      const [roles, acciones] = results;
      this.acciones = acciones.acciones;
      this.roles = roles.roles;
    });
  }

  handleAsignar() {
    const { accion, rol } = this.asignarForm.value;
    const obj = {
      _id_accion: accion,
      _id_rol: rol
    }
    this.appSrv.asignarAccionRol(obj).subscribe(res => {
      this._snackBar.open(res.message, 'cerrar', {
        duration: 2000,
      });
      this.dialogRef.close();
    }, err => {
      this._snackBar.open(err.error.message, 'cerrar', {
        duration: 2000,
      });

    })
  }
}
