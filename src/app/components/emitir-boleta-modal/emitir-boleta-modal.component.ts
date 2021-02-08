import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BoletaElement } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';
import { FormMensajeComponent } from 'src/app/shared/form-mensaje/form-mensaje.component';


@Component({
  selector: 'app-emitir-boleta-modal',
  templateUrl: './emitir-boleta-modal.component.html',
  styleUrls: ['./emitir-boleta-modal.component.scss']
})
export class EmitirBoletaModalComponent implements OnInit {
  medioPago: FormControl;
  displayedColumns: string[] = ['description', 'quantity', 'price'];
  dataSource: MatTableDataSource<BoletaElement> = new MatTableDataSource();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EmitirBoletaModalComponent>,
    private appSrv: AppService,
    private dialog: MatDialog
  ) {
    this.medioPago = new FormControl('', [
      Validators.required
    ]);
    this.dataSource.data = this.data.emitirBoletas;
  }

  ngOnInit(): void { }

  handleConfirmar() {
    const medioPago = this.medioPago.value;

    if (!medioPago) {

      const dialogRef = this.dialog.open(FormMensajeComponent, {
        data: {
          message: 'seleccione un medio de pago',
          title: 'error',
          closeMessage: 'aceptar'
        }
      });
      return ;
    }

    const obj = {
      nota_venta: this.data.nota_venta,
      medio_pago: medioPago
    }
    this.appSrv.emitirBoleta(obj).subscribe((res: any) => {

      if (res?.boleta?.error) {
        this.dialogRef.close();
        const dialogRef = this.dialog.open(FormMensajeComponent, {
          data: {
            message: res?.boleta?.message,
            title: 'error',
            closeMessage: 'cerrar'
          }
        });
      } else {

        this.dialogRef.close();
        const dialogRef = this.dialog.open(FormMensajeComponent, {
          data: {
            message: 'boleta generada con exito',
            title: 'mensaje',
            closeMessage: 'aceptar'
          }
        });
      }

    }, err => {
    })
  }
}
