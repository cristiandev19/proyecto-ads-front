import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProducto } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';
import { FormMensajeComponent } from 'src/app/shared/form-mensaje/form-mensaje.component';

@Component({
  selector: 'app-producto-edicion-modal',
  templateUrl: './producto-edicion-modal.component.html',
  styleUrls: ['./producto-edicion-modal.component.scss']
})
export class ProductoEdicionModalComponent implements OnInit {
  @Output() eventEmit = new EventEmitter()
  productoForm : FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appSrv: AppService,
    public dialogRef: MatDialogRef<ProductoEdicionModalComponent>,
    private dialog: MatDialog
  ) {
    this.productoForm = this.createForm(data.producto);
  }

  createForm({ desc_producto, stock, precio }: IProducto) {
    let obj = {
      desc_producto : [desc_producto, Validators.required],
      stock         : [stock, Validators.required],
      precio        : [precio, Validators.required],
    }
    return this.fb.group(obj);
  }

  ngOnInit(): void { }

  handleCreate() {
    const { desc_producto, stock, precio } = this.productoForm.value;

    if (!desc_producto || !stock || !precio){
      const dialogRef2 = this.dialog.open(FormMensajeComponent, {
        data: {
          message: 'Verifica los campos vacios',
          title: 'Mensaje',
          closeMessage: 'Volver'
        }
      });
      return ;
    }

    const obj = {
      desc_producto, stock, precio
    }
    this.appSrv.insertProducto(obj).subscribe(res => {
      this.eventEmit.emit(res);
    }, err => {
    });
    // insertProducto
  }

  handleEdit() {
    const { desc_producto, stock, precio } = this.productoForm.value;

    if (!desc_producto || !stock || !precio){
      const dialogRef2 = this.dialog.open(FormMensajeComponent, {
        data: {
          message: 'Verifica los campos vacios',
          title: 'Mensaje',
          closeMessage: 'Volver'
        }
      });
      return ;
    }
    const obj = {
      id_producto: this.data.producto.id_producto,
      desc_producto, stock, precio
    }
    this.appSrv.updateProducto(obj).subscribe(res => {
      this.eventEmit.emit(res);
    }, err => {
    })
    // updateProducto
  }
}
