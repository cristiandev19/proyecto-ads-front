import { Component, OnInit } from '@angular/core';

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
  dataSource = DATA;
  

  constructor() { }

  ngOnInit(): void { }
}
