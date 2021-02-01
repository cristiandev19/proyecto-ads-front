import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CONFIRM_ACTIONS, IProducto } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';
import { ConfirmModalComponent } from 'src/app/shared/confirm-modal/confirm-modal.component';
import { FormMensajeComponent } from 'src/app/shared/form-mensaje/form-mensaje.component';
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
    this.refreshTable();
  }

  refreshTable() {
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
    dialogRef.componentInstance.eventEmit.subscribe((emit: any) => {
      const dialogRef2 = this.dialog.open(FormMensajeComponent, {
        data: {
          message: 'Nuevo producto agregado con exito',
          title: 'Mensaje',
          closeMessage: 'Volver'
        }
      });
      dialogRef.close();
      this.refreshTable();
    })

  }

  handleActualizarProducto(producto: IProducto) {
    const dialogRef = this.dialog.open(ProductoEdicionModalComponent, {
      data: {
        producto,
        type: 'editar'
      }
    })

    dialogRef.componentInstance.eventEmit.subscribe((emit: any) => {
      const dialogRef2 = this.dialog.open(FormMensajeComponent, {
        data: {
          message: 'Nuevo producto actualizado con exito',
          title: 'Mensaje',
          closeMessage: 'Volver'
        }
      });
      dialogRef.close();
      this.refreshTable();
    })
  }

  handleEliminarProducto(producto: IProducto) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        title: 'Eliminar producto',
        msj: 'Estas segudo de eliminar este producto? '
      }
    })
    dialogRef.componentInstance.eventEmit.subscribe((emit: any)=> {
      if (emit.action == CONFIRM_ACTIONS.YES) {
        const obj = {
          id_producto: producto.id_producto
        }
        this.appSrv.deleteProducto(obj).subscribe(res => {
          console.log('res', res);
          dialogRef.close();
          this.refreshTable();
        }, err => {
          dialogRef.close();
          console.log('err', err);
        })
      } else {
        dialogRef.close();
      }
    })

  }

}
