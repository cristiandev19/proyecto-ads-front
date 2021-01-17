import { Component, OnInit } from '@angular/core';


export interface BoletaElement {
  description: string;
  quantity: number;
  price: number;
}

const ELEMENT_DATA: BoletaElement[] = [
  {description: 'dasdsadsa', quantity: 1, price: 1.0079},
  {description: 'dasdsadsa', quantity: 4, price: 4.0026},
  {description: 'dasdsadsa', quantity: 1, price: 6.941},
  {description: 'dasdsadsa', quantity: 2, price: 9.0122},
  {description: 'dasdsadsa', quantity: 1, price: 10.811},
];

@Component({
  selector: 'cs-emitir-boleta',
  templateUrl: './emitir-boleta.component.html',
  styleUrls: ['./emitir-boleta.component.scss']
})
export class EmitirBoletaComponent implements OnInit {
  displayedColumns: string[] = ['description', 'quantity', 'price'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void { }
}
