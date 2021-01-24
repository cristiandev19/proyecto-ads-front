import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';



const DATA = [
  {
    description: '1',
    date: '1',
    state: 'Por atender',
  },
  {
    description: '1asdsad',
    date: '1',
    state: 'Anulada',
  },
  {
    description: '152',
    date: '1',
    state: 'Por atender',
  },
  {
    description: 'y',
    date: '1',
    state: 'Atendida',
  },
  {
    description: '2',
    date: '1',
    state: 'No reclamada',
  }
] 

@Component({
  selector: 'cs-cambiar-boleta',
  templateUrl: './cambiar-boleta.component.html',
  styleUrls: ['./cambiar-boleta.component.scss']
})
export class CambiarBoletaComponent implements OnInit {
  displayedColumns: string[] = ['description','date','state', 'action'];
  dataSource = DATA;
  
  constructor(
    private dialog: MatDialog 
  ) {
  }
  
  ngOnInit(): void { }

  handleSearch() {
    // const { search : filterValue} = this.searchForm.value();
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleModify(data: any) {

  }
}
