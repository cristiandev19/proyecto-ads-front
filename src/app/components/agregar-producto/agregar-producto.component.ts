import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  productos: any[] = [];
  searchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private appSrv: AppService,
    private dialog: MatDialog
  ) {
    this.searchForm = this.fb.group({
      search: ['']
    });
  }

  ngOnInit(): void {
    // this.refreshTable();
  }

  refreshTable() {
      this.dataSource.data = [];
      this.productos = [];

    // this.appSrv.getProductos().subscribe(res => {
    //   this.dataSource.data = res.productos;
    //   // dataSource
    //   // productos
    // }, err => {
    // });
  }

  handleAgregarProducto() {
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
          dialogRef.close();
          this.refreshTable();
        }, err => {
          dialogRef.close();
        })
      } else {
        dialogRef.close();
      }
    })

  }

  handleSearch() {
    const { search : value } = this.searchForm.value;
    if(value) {
      // this.productos_vista = this.productos.filter(item => {
      //   return (item.desc_producto.toLowerCase()).includes(value.toLowerCase())
      // });
      this.appSrv.searchProduct(value).subscribe((res: any) => {
        // this.productos = res.productos;
        this.dataSource.data = res.productos;
        this.productos = res.productos;
      }, err => {
      })
    } else {
      this.dataSource.data = [];
      // this.productos_vista = this.productos; 
      this.productos = [];

      const dialogRef = this.dialog.open(FormMensajeComponent, {
        data: {
          message: 'Campo vacio',
          title: 'error',
          closeMessage: 'ok'
        }
      });
    }
  }

}
