import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IProducto } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';
import { DetalleProductoModalComponent } from '../detalle-producto-modal/detalle-producto-modal.component';



@Component({
  selector: 'cs-emitir-nota',
  templateUrl: './emitir-nota.component.html',
  styleUrls: ['./emitir-nota.component.scss']
})
export class EmitirNotaComponent implements OnInit {
  searchForm: FormGroup;
  productos : IProducto[] = [];
  productos_vista : IProducto[] = [];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private appSrv: AppService
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

  ngOnInit(): void {
    this.appSrv.getProductos().subscribe(res => {
      console.log('res', res)
      this.productos = res.productos;
      this.productos_vista = res.productos;
    }, err => {
      console.log('err', err)
    })
  }

  handleSearch() {
    const { search : value } = this.searchForm.value;
    if(value) {
      this.productos_vista = this.productos.filter(item => {
        return (item.desc_producto.toLowerCase()).includes(value.toLowerCase())
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
        producto: data
      }
    })
  }

}
