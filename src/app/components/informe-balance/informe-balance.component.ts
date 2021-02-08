import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { PdfService } from 'src/app/service/pdf.service';



import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormMensajeComponent } from 'src/app/shared/form-mensaje/form-mensaje.component';



const DATA = [
  {
    fecha: '2020-02-01',
    hora: '12:00',
    nro_boleta: '0001',
    cliente: 'Cristian',
    total_venta: 50,
    mes: 'febrero'
  },  
  {
    fecha: '2020-02-01',
    hora: '12:00',
    nro_boleta: '0001',
    cliente: 'Fabrizio',
    total_venta: 50,
    mes: 'febrero'
  },  
  {
    fecha: '2020-02-01',
    hora: '12:00',
    nro_boleta: '0001',
    cliente: 'Raul',
    total_venta: 50,
    mes: 'febrero'
  }
]

@Component({
  selector: 'cs-informe-balance',
  templateUrl: './informe-balance.component.html',
  styleUrls: ['./informe-balance.component.scss']
})
export class InformeBalanceComponent implements OnInit {
  displayedColumns: string[] = ['fecha', 'hora', 'nro_boleta', 'cliente', 'total_venta', 'mes'];
  dataSource = new MatTableDataSource();
  boletas: any[] = [];
  fechasForm: FormGroup;


  title = 'jspdf-autotable-demo';

  head = [['Hora', 'nro boleta', 'cliente', 'total venta', 'mes']]

  // data = [
  //   [1, 'Finland', 7.632, 'Helsinki'],
  //   [2, 'Norway', 7.594, 'Oslo'],
  //   [3, 'Denmark', 7.555, 'Copenhagen'],
  //   [4, 'Iceland', 7.495, 'Reykjavík'],
  //   [5, 'Switzerland', 7.487, 'Bern'],
  //   [9, 'Sweden', 7.314, 'Stockholm'],
  //   [73, 'Belarus', 5.483, 'Minsk'],
  // ]

  constructor(
    private router: Router,
    private appSrv: AppService,
    private pdf: PdfService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.fechasForm = this.createForm();

  }

  createForm() {
    let obj = {
      fecha_ini: ['', Validators.required],
      fecha_fin: ['',  Validators.required],
    }
    return this.fb.group(obj);
  }

  ngOnInit(): void {
    this.appSrv.getBoletas().subscribe((res: any) => {
      console.log('res', res);
      this.dataSource.data = res.boletas;
      this.boletas = res.boletas;
    }, err => {
      console.log('err', err);
    });
  }


  handleGoHome() {
    this.router.navigate(['/admin/home'])
  }


  clicked() {
    // this.pdf.getPdfData(this.boletas);

    const doc : any = new jsPDF.jsPDF();

    doc.setFontSize(18);
    doc.text('Mi reporte', 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);

    const data = this.boletas.map((b: any) => {
      return [
        `${b.fecha_f}`, `${b.hora}`, `${b.nro_serie}-${b.nro_correlativo}`, 
        '-', `${b.total}`, `${b.mes}`
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

  visualizarVentas() {
    const { fecha_ini, fecha_fin } = this.fechasForm.value;


    if ((fecha_ini && fecha_fin) && fecha_ini.getTime() > fecha_fin.getTime()) {
      const dialogRef = this.dialog.open(FormMensajeComponent, {
        data: {
          message: 'Fecha inicial debe ser menor a la fecha final',
          title: 'error',
          closeMessage: 'ok'
        }
      });
      return ;
    }
    const fec_ini = fecha_ini ? this.convertDateToString(fecha_ini) : '';
    const fec_fin = fecha_fin ? this.convertDateToString(fecha_fin) : '';

    console.log('fec_ini fec_fin', fec_ini, fec_fin)

    if (!fec_ini || !fec_fin) {

      const dialogRef = this.dialog.open(FormMensajeComponent, {
        data: {
          message: 'El campo esta vacio',
          title: 'error',
          closeMessage: 'ok'
        }
      });
      return ;
    }

    this.appSrv.boletasFiltro(fec_ini, fec_fin).subscribe((res: any) => {
      console.log('res', res);
      this.dataSource.data = res.boletas;
      this.boletas = res.boletas;
    }, err => {
      console.log('err', err);
    })
  }

  convertDateToString(date: Date) {
    const dateString = JSON.stringify(date);
    return dateString.replace('"', '').replace('"', '');
  }

}
