import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { FormMensajeComponent } from 'src/app/shared/form-mensaje/form-mensaje.component';

@Component({
  selector: 'app-create-rol-modal',
  templateUrl: './create-rol-modal.component.html',
  styleUrls: ['./create-rol-modal.component.scss']
})
export class CreateRolModalComponent implements OnInit {
  @Output() eventEmit = new EventEmitter<any>();
  rolForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appSrv: AppService,
    public dialogRef: MatDialogRef<CreateRolModalComponent>,
    public dialog: MatDialog
  ) {
    this.rolForm = this.createForm();
  }

  createForm() {
    let obj = {
      desc_rol: ['', Validators.required],
      resumen: ['', Validators.required],
    }
    return this.fb.group(obj);
  }


  ngOnInit(): void { }

  handleCreateRol() {
    const { desc_rol, resumen } = this.rolForm.value;
    if ( !desc_rol || !resumen ) {
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
      desc_rol, resumen
    }
    this.appSrv.insertRol(obj).subscribe(res => {
      this.eventEmit.emit(res);
      // this.dialogRef.close();
    }, err => {
    })
  }
}
