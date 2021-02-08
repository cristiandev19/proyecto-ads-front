import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { INotaVenta, IProducto } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';
import { FormMensajeComponent } from 'src/app/shared/form-mensaje/form-mensaje.component';
import { DetalleProductoModalComponent } from '../detalle-producto-modal/detalle-producto-modal.component';
import { NotaVentaModalComponent } from '../nota-venta-modal/nota-venta-modal.component';



@Component({
  selector: 'cs-emitir-nota',
  templateUrl: './emitir-nota.component.html',
  styleUrls: ['./emitir-nota.component.scss']
})
export class EmitirNotaComponent implements OnInit {
  searchForm: FormGroup;
  productos : IProducto[] = [];
  productos_vista : IProducto[] = [];

  lista_producto: INotaVenta[] = [];

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
    })
  }

  ngOnInit(): void {
  }
  refreshTable() {
  }

  handleSearch() {
    const { search : value } = this.searchForm.value;
    if(value) {
      // this.productos_vista = this.productos.filter(item => {
      //   return (item.desc_producto.toLowerCase()).includes(value.toLowerCase())
      // });
      this.appSrv.searchProduct(value).subscribe((res: any) => {
        console.log('res', res);
        this.productos = res.productos;
      }, err => {
        console.log('hola');
      })
    } else {
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

  handleOpenDetailModal(data: any) {
    console.log('data', data)
    const dialogRef = this.dialog.open(DetalleProductoModalComponent, {
      width: '500px',
      data: {
        producto: data
      }
    })
    dialogRef.componentInstance.eventEmit.subscribe((event: INotaVenta) => {
      console.log('event', event)
      const [itemListaProducto] : INotaVenta[] = this.lista_producto
        .filter(lp => lp.id_producto == event.id_producto);

      console.log('itemListaProducto', itemListaProducto)
      if (itemListaProducto) {
        this.lista_producto = this.lista_producto.map(lp => {
          if (lp.id_producto == event.id_producto) {
            return {
              ...lp,
              cantidad: +lp.cantidad + +event.cantidad
            }
          } else {
            return {
              ...lp
            }
          }
        })
        // this.lista_producto = [...this.lista_producto, {
        //   ...itemListaProducto,
        //   cantidad: itemListaProducto.cantidad + event.cantidad
        // }];
      } else {
        this.lista_producto = [...this.lista_producto, event];
      }

      dialogRef.close();
      console.log('this.lista_producto', this.lista_producto);

      this.openNotaVentaModal();

      const newProductos = this.productos.map(p => {
        if (p.id_producto == event.id_producto) {
          return {
            ...p,
            stock: +p.stock - +event.cantidad
          }
        } else {
          return {
            ...p
          }
        }
      })
      this.productos = [...newProductos];
      this.productos_vista = [...newProductos];


    })
  }

  openNotaVentaModal() {
    // this.moda NotaVentaModalComponent
    console.log('nota venta modal')
    const dialogRef = this.dialog.open(NotaVentaModalComponent, {
      width: '600px',
      disableClose: false,
      data: {
        nota_ventas: this.lista_producto
      }
    })

    dialogRef.componentInstance.eventEmit.subscribe((event: any) => {
      if (event.event == 'delete') {
        this.lista_producto = [...event.nota_ventas];
        // dialogRef.close();
        this.refreshTable();
      } else if (event.event == 'agregar') {
        dialogRef.close();
      } else if (event.event == 'emitir') {
        this.lista_producto = [];
        this.refreshTable()
      }
    });
  }
}
