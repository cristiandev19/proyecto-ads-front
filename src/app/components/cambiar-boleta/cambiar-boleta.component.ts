import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  fechaForm: FormGroup;
  boletas: any[] = [];
  constructor(
    private dialog: MatDialog,
    private appSrv: AppService,
    private fb: FormBuilder
  ) {
    this.fechaForm = this.fb.group({
      fecha: ['']
    });
  }

  ngOnInit(): void {
    this.refreshTable();
  }

  refreshTable() {
    this.dataSource.data = [];
    this.boletas = [];
    // this.appSrv.getBoletas().subscribe((res: any) => {
    // }, err => {
    // });
  }

  handleFecha() {
    const {fecha} = this.fechaForm.value;
    const fechaFormated = this.convertDateToString(fecha);

    this.appSrv.getBoletasFiltro(fechaFormated).subscribe((res: any) => {
      this.dataSource.data = res.boletas;
      this.boletas = res.boletas
    }, err => {
    });
  }

  handleSearch() {
    // const { search : filterValue} = this.searchForm.value();
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleModify(data: any) {
    if (data.estado == '0') {
      const dialogRef = this.dialog.open(ObservarBoletaModalComponent, {
        width: '500px',
        data: {
          id_boleta: data.id_boleta,
          nro_boleta: `${data.nro_serie}-${data.nro_correlativo}`,
          type: 'form-boleta'
        }
      })
      dialogRef.componentInstance.eventEmit.subscribe((event: any) => {
        dialogRef.close();
        this.refreshTable();
        this.fechaForm.controls.fecha.setValue('');
      })
    } else if (data.estado == '3') {
      const dialogRef = this.dialog.open(ObservarBoletaModalComponent, {
        width: '500px',
        data: {
          id_boleta: data.id_boleta,
          nro_boleta: `${data.nro_serie}-${data.nro_correlativo}`,
          type: 'form-reclamo'
        }
      })
      dialogRef.componentInstance.eventEmit.subscribe((event: any) => {
        dialogRef.close();
        this.refreshTable();
        this.fechaForm.controls.fecha.setValue('');
      })
    }
  }


  convertDateToString(date: Date) {
    const dateString = JSON.stringify(date);
    return dateString.replace('"', '').replace('"', '');
  }

}
