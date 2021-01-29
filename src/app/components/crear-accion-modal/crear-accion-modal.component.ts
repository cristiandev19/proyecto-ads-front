import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-crear-accion-modal',
  templateUrl: './crear-accion-modal.component.html',
  styleUrls: ['./crear-accion-modal.component.scss']
})
export class CrearAccionModalComponent implements OnInit {
  @Output() event = new EventEmitter();
  accionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appSrv: AppService,
    public dialogRef: MatDialogRef<CrearAccionModalComponent>,
    private _snackBar: MatSnackBar
  ) {
    this.accionForm = this.createForm();

  }

  createForm() {
    let obj = {
      desc_accion: ['', Validators.required],
      resumen: ['', Validators.required],
    }
    return this.fb.group(obj);
  }

  ngOnInit(): void { }

  handleCreateAccion() {
    const { desc_accion, resumen } = this.accionForm.value;
    const obj = {
      resumen,
      desc_accion,
      ruta_accion: ''
    };
    this.appSrv.insertAccion(obj).subscribe(res => {
      console.log('res', res)
      this._snackBar.open(res.message, 'cerrar', {
        duration: 2000,
      });
    }, err => {
      this._snackBar.open(err.error.message, 'cerrar', {
        duration: 2000,
      });
    });
  }
}
