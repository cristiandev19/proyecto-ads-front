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
  productos_vista = PRODUCTOS;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog 
  ) {
    this.searchForm = this.fb.group({
      search: ['']
    });
    console.log('llegad?')

    this.searchForm.valueChanges.subscribe(form => {
      // console.log("🚀 ~ file: emitir-nota.component.ts ~ line 37 ~ EmitirNotaComponent ~ form", form)
      // if(form.search) {
      //   this.productos_vista = this.productos.filter(item => {
      //     return (item.name.toLowerCase()).includes(form.search.toLowerCase())
      //   });
      // } else {
      //   this.productos_vista = this.productos; 
      // }
    })
  }

  ngOnInit(): void { }

  handleSearch() {
    const { search : value } = this.searchForm.value;
    if(value) {
      this.productos_vista = this.productos.filter(item => {
        return (item.name.toLowerCase()).includes(value.toLowerCase())
      });
    } else {
      this.productos_vista = this.productos; 
    }
  }

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
