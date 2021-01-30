import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProducto } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-producto-edicion-modal',
  templateUrl: './producto-edicion-modal.component.html',
  styleUrls: ['./producto-edicion-modal.component.scss']
})
export class ProductoEdicionModalComponent implements OnInit {
  productoForm : FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appSrv: AppService,
    public dialogRef: MatDialogRef<ProductoEdicionModalComponent>,
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

  handleCreate() {}

  handleEdit() {}
}
