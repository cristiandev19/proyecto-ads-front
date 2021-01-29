import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';

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
    console.log({desc_rol, resumen})
    const obj = {
      desc_rol, resumen
    }
    this.appSrv.insertRol(obj).subscribe(res => {
      console.log('res', res);
      this.eventEmit.emit(res);
      // this.dialogRef.close();
    }, err => {
      console.log('err', err);
    })
  }
}
