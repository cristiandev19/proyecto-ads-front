import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from 'src/app/app.service';
import { ObservarBoletaModalComponent } from '../observar-boleta-modal/observar-boleta-modal.component';



@Component({
  selector: 'cs-cambiar-boleta',
  templateUrl: './cambiar-boleta.component.html',
  styleUrls: ['./cambiar-boleta.component.scss']
})
export class CambiarBoletaComponent implements OnInit {
  displayedColumns: string[] = ['description','date','state', 'action'];
  // dataSource = DATA;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  constructor(
    private dialog: MatDialog,
    private appSrv: AppService
  ) {
  }

  ngOnInit(): void {
    this.refreshTable();
  }

  refreshTable() {
    this.appSrv.getBoletas().subscribe((res: any) => {
      console.log('res', res);
      this.dataSource.data = res.boletas;
    }, err => {
      console.log('err', err);
    });
  }

  handleSearch() {
    // const { search : filterValue} = this.searchForm.value();
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleModify(data: any) {
    console.log('data', data);
    if (data.estado == '1') {
      const dialogRef = this.dialog.open(ObservarBoletaModalComponent, {
        width: '500px',
        data: {
          id_boleta: data.id_boleta,
          nro_boleta: `${data.nro_serie}-${data.nro_correlativo}`
        }
      })
      dialogRef.componentInstance.eventEmit.subscribe((event: any) => {
        dialogRef.close();
        this.refreshTable();
      })
    } else if (data.estado == '3') {
      
    }
  }
}
