import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DetalleProductoModalComponent } from '../detalle-producto-modal/detalle-producto-modal.component';


const PRODUCTOS = [
  {
    name: 'Producto 1',
    id: 1
  },
  {
    name: 'Producto 2',
    id: 2
  }
]

@Component({
  selector: 'cs-emitir-nota',
  templateUrl: './emitir-nota.component.html',
  styleUrls: ['./emitir-nota.component.scss']
})
export class EmitirNotaComponent implements OnInit {
  searchForm: FormGroup;
  productos = PRODUCTOS;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog 
  ) {
    this.searchForm = this.fb.group({
      search: ['']
    });
  }

  ngOnInit(): void { }
  
  handleOpenDetailModal(data: any) {
    console.log('data', data)
    this.dialog.open(DetalleProductoModalComponent, {
      width: '500px',
      data: {
        hola: '1111111111'
      }
    })
  }

}
