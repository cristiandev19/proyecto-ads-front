import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

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

  constructor(
    private router: Router,
    private appSrv: AppService
  ) { }

  ngOnInit(): void {
    this.appSrv.getBoletas().subscribe((res: any) => {
      console.log('res', res);
      this.dataSource.data = res.boletas;
    }, err => {
      console.log('err', err);
    });
  }


  handleGoHome() {
    this.router.navigate(['/admin/home'])
  }
}
