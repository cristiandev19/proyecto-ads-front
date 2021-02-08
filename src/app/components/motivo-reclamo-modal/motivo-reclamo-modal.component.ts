import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { PdfService } from 'src/app/service/pdf.service';
import { FormMensajeComponent } from 'src/app/shared/form-mensaje/form-mensaje.component';

const COMBO = [
  {
    value: 1,
    desc: 'Peso incompleto'
  },
  {
    value: 2,
    desc: 'producto en mal estado'
  },
  {
    value: 3,
    desc: 'otro (especificar )'
  }
];
@Component({
  selector: 'cs-motivo-reclamo-modal',
  templateUrl: './motivo-reclamo-modal.component.html',
  styleUrls: ['./motivo-reclamo-modal.component.scss']
})
export class    MotivoReclamoModalComponent implements OnInit {
  combos = COMBO;
  motivo:any;
  reclamoForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MotivoReclamoModalComponent>,
    private appSrv: AppService,
    private dialog: MatDialog
  ) {
    this.reclamoForm = this.fb.group({
      option: ['']
    })
  }

  close() {
    this.dialogRef.close()
  }
  ngOnInit(): void { }

  handleSi() {
    const {option} = this.reclamoForm.value

    if (!option) {

      const dialogRef3 = this.dialog.open(FormMensajeComponent, {
        data: {
          message: 'No pueden haber campos vacios',
          title: 'Mensaje',
          closeMessage: 'Volver'
        }
      });
      return ;
    }
    
    const obj = {
      _id_boleta: this.data.boleta.id_boleta,
      desc_reclamo: option
    }
    this.appSrv.insertReclamo(obj).subscribe((res: any) => {
      const dialogRef2 = this.dialog.open(FormMensajeComponent, {
        data: {
          message: 'El estado de la boleta ha sido modificado',
          title: 'Mensaje',
          closeMessage: 'Volver'
        }
      });
      this.dialogRef.close();
    }, err => {
      const dialogRef2 = this.dialog.open(FormMensajeComponent, {
        data: {
          message: err.error.message,
          title: 'Error',
          closeMessage: 'Volver'
        }
      });
      this.dialogRef.close();
    })
  }
}
