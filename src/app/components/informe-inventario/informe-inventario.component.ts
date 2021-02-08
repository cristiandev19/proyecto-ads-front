import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-informe-inventario',
  templateUrl: './informe-inventario.component.html',
  styleUrls: ['./informe-inventario.component.scss']
})
export class InformeInventarioComponent implements OnInit {
  productos: any[] = [];

  dataSource = new MatTableDataSource([]);
  displayedColumns = ['id', 'producto', 'stock', 'precio']

  title = 'jspdf-autotable-demo';

  head = [['id', 'producto', 'stock', 'precio']]



  constructor(
    private router: Router,
    private appSrv: AppService
  ) { }

  ngOnInit(): void { }

  refreshTable() {
    this.appSrv.getProductos().subscribe(res => {
      this.productos = res.productos;
      this.dataSource.data = res.productos;
    }, err => {
    })

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
      }
    })

    // Open PDF document in new tab
    doc.output('dataurlnewwindow')

    // Download PDF document
    doc.save('table.pdf');
  }

}
