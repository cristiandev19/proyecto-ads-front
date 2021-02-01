import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { INotaVenta } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';
import { FormMensajeComponent } from 'src/app/shared/form-mensaje/form-mensaje.component';

@Component({
  selector: 'app-nota-venta-modal',
  templateUrl: './nota-venta-modal.component.html',
  styleUrls: ['./nota-venta-modal.component.scss']
})
export class NotaVentaModalComponent implements OnInit {
  @Output() eventEmit = new EventEmitter();
  displayedColumns: string[] = ['descripcion', 'cantidad', 'total', 'acciones'];
  dataSource: MatTableDataSource<INotaVenta> = new MatTableDataSource();

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NotaVentaModalComponent>,
    private appSrv: AppService,
    private dialog: MatDialog
  ) {
    this.dataSource.data = this.data.nota_ventas;
  }

  ngOnInit(): void { }

  handleAgregar() {
    this.eventEmit.emit({
      event: 'agregar'
    });
  }

  handleEliminar(data: INotaVenta) {
    const newData = this.data.nota_ventas
      .filter((nv: INotaVenta) => data.id_producto !== nv.id_producto);

    this.eventEmit.emit({
      nota_ventas: newData,
      event: 'delete'
    });
  }

  handleEmitir() {
    const nota_ventas: any[] = this.data.nota_ventas
      .map((nv: INotaVenta) => {
        return {
          id_producto: nv.id_producto,
          cantidad: nv.cantidad
        }
      });
    console.log('nota_ventas', nota_ventas)
    const total = (this.data.nota_ventas as INotaVenta[]).reduce((prev, curr, idx) => {
      const calc = (curr.cantidad * +curr.precio);
      return prev + calc
    }, 0);
    console.log('total', total);
    const obj = {
      nota_ventas,
      total
    }
    this.appSrv.emitirNotaVenta(obj).subscribe(res => {
      console.log('res', res)

      const dialogRef = this.dialog.open(FormMensajeComponent, {
        data: {
          message: 'Se emitio nota de venta',
          title: 'Mensaje',
          closeMessage: 'Volver'
        }
      });
      this.eventEmit.emit({
        event: 'emitir'
      });
      this.dialogRef.close();
    }, err => {
      console.log('err', err);
    })
  }

}
