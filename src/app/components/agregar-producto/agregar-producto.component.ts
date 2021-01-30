import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { IProducto } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';
import { ProductoEdicionModalComponent } from '../producto-edicion-modal/producto-edicion-modal.component';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.scss']
})
export class AgregarProductoComponent implements OnInit {
  displayedColumns: string[] = ['descripcion', 'stock', 'acciones'];
  dataSource: MatTableDataSource<IProducto> = new MatTableDataSource();

  constructor(
    private appSrv: AppService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.appSrv.getProductos().subscribe(res => {
      console.log('res', res);
      this.dataSource.data = res.productos;
    }, err => {
      console.log('err', err);
    });
  }

  handleAgregarProducto() {
    console.log('handleAgregarProducto')
    const producto : IProducto = {
      desc_producto: '',
      id_producto: 0,
      precio: '',
      stock: 0
    }
    const dialogRef = this.dialog.open(ProductoEdicionModalComponent, {
      data: {
        producto,
        type: 'crear'
      }
    })


  }

  handleActualizarProducto(producto: IProducto) {
    const dialogRef = this.dialog.open(ProductoEdicionModalComponent, {
      data: {
        producto,
        type: 'editar'
      }
    })

  }

  handleEliminarProducto(producto: IProducto) {

  }

}
