import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProducto } from 'src/app/app.model';

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
  producto: IProducto;
  detalles: any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('data', data)
    this.producto = data.producto;
    
  }


  ngOnInit(): void { }
}
