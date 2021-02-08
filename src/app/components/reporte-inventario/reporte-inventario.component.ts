import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormMensajeComponent } from 'src/app/shared/form-mensaje/form-mensaje.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-reporte-inventario',
  templateUrl: './reporte-inventario.component.html',
  styleUrls: ['./reporte-inventario.component.scss']
})
export class ReporteInventarioComponent implements OnInit {
  productos: any[] = [];

  dataSource = new MatTableDataSource([]);
  searchForm : FormGroup;

  displayedColumns = ['id', 'producto', 'stock', 'precio']
  title = 'jspdf-autotable-demo';

  head = [['id', 'producto', 'stock', 'precio']]



  constructor(
    private fb: FormBuilder,
    private router: Router,
    private appSrv: AppService,
    private dialog: MatDialog
  ) {
    this.searchForm = this.fb.group({
      search: ['']
    });
  }

  ngOnInit(): void {
    this.appSrv.getProductos().subscribe(res => {
      console.log('res', res)
      this.dataSource.data = res.productos;
      this.productos = res.productos;
    }, err => {
      console.log('err', err);
    })
  }

  // refreshTable() {
  //   this.appSrv.getProductos().subscribe(res => {
  //     console.log('res', res)
  //     this.productos = res.productos;
  //     this.dataSource.data = res.productos;
  //   }, err => {
  //     console.log('err', err)
  //   })

  // }


  handleSearch() {
    const { search : value } = this.searchForm.value;
    if(value) {
      // this.productos_vista = this.productos.filter(item => {
      //   return (item.desc_producto.toLowerCase()).includes(value.toLowerCase())
      // });
      this.appSrv.searchProduct(value).subscribe((res: any) => {
        console.log('res', res);
        // this.productos = res.productos;
        this.productos = res.productos;
        this.dataSource.data = res.productos;
  
      }, err => {
        console.log('hola');
      })
    } else {
      // this.productos_vista = this.productos; 
      // this.productos = [];
      this.productos = [];
      this.dataSource.data = [];


      const dialogRef = this.dialog.open(FormMensajeComponent, {
        data: {
          message: 'Campo vacio',
          title: 'error',
          closeMessage: 'ok'
        }
      });
    }
  }

  handleGoHome() {
    this.router.navigate(['/admin/home'])
  }

  clicked() {
    const doc : any = new jsPDF.jsPDF();

    doc.setFontSize(18);
    doc.text('Mi reporte', 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);

    const data = this.productos.map((b: any) => {
      return [
        `${b.id_producto}`, `${b.desc_producto}`, `${b.stock}`, `${b.precio}`
      ]
    });

    (doc as any).autoTable({
      head: this.head,
      body: data,
      theme: 'plain',
      didDrawCell: (data: any) => {
        console.log(data.column.index)
      }
    })

    // Open PDF document in new tab
    doc.output('dataurlnewwindow')

    // Download PDF document
    doc.save('table.pdf');
  }
}
