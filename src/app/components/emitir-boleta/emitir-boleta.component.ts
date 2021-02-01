import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { FormMensajeComponent } from 'src/app/shared/form-mensaje/form-mensaje.component';
import { EmitirBoletaModalComponent } from '../emitir-boleta-modal/emitir-boleta-modal.component';

@Component({
  selector: 'cs-emitir-boleta',
  templateUrl: './emitir-boleta.component.html',
  styleUrls: ['./emitir-boleta.component.scss']
})
export class EmitirBoletaComponent implements OnInit {
  buscarBoleta: FormControl;


  constructor(
    private appSrv: AppService,
    private dialog: MatDialog
  ) {

    this.buscarBoleta = new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+$/)
    ]);
  }

  ngOnInit(): void { }

  handleBuscar() {
    console.log('hola')
    const nota_venta = this.buscarBoleta.value;
    this.appSrv.buscarNotaVenta(nota_venta).subscribe((res: any) => {
      console.log('res', res);

      if ((res.nota_venta as any[]).length > 0) {
        const dialogRef = this.dialog.open(EmitirBoletaModalComponent, {
          width: '500px',
          data: {
            emitirBoletas: res.nota_venta,
            nota_venta
          }
        })
      } else {
        const dialogRef = this.dialog.open(FormMensajeComponent, {
          data: {
            message: 'escribe un id valido',
            title: 'error',
            closeMessage: 'ok'
          }
        });
      }
    }, err => {
      console.log('err', err);
    })
    // EmitirBoletaModalComponent
  }
}
