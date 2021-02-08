import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProducto } from 'src/app/app.model';
import { FormMensajeComponent } from 'src/app/shared/form-mensaje/form-mensaje.component';

const DETALLES = [
  {
    label: 'Stock',
    value: 5
  },
  {
    label: 'En almacen',
    value: 'Si'
  },
  {
    label: 'Cantidad minima',
    value: 5
  },
  {
    label: 'Precio mayor',
    value: 10
  },
  {
    label: 'Cantidad',
    value: 0
  },
]


@Component({
  selector: 'cs-detalle-producto-modal',
  templateUrl: './detalle-producto-modal.component.html',
  styleUrls: ['./detalle-producto-modal.component.scss']
})
export class DetalleProductoModalComponent implements OnInit {
  @Output() eventEmit = new EventEmitter();
  producto: IProducto;
  detalles: any = [];
  cantidad: FormControl;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) {
    this.producto = data.producto;

    this.cantidad = new FormControl('', [
      Validators.required,
      Validators.max(this.producto.stock),
      Validators.pattern(/^\d+$/)
    ]);
  }


  ngOnInit(): void { }

  handleAgregar() {

    const cantidad = this.cantidad.value;

    if (this.cantidad.pristine || this.cantidad.invalid) {
      const dialogRef = this.dialog.open(FormMensajeComponent, {
        data: {
          message: 'Campo vacio',
          title: 'error',
          closeMessage: 'aceptar'
        }
      });
      return ;
    }


    this.eventEmit.emit({
      ...this.producto,
      cantidad: +cantidad
    });
  }
}
