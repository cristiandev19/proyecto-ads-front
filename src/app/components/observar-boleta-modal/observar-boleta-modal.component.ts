import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-observar-boleta-modal',
  templateUrl: './observar-boleta-modal.component.html',
  styleUrls: ['./observar-boleta-modal.component.scss']
})
export class ObservarBoletaModalComponent implements OnInit {
  @Output() eventEmit = new EventEmitter  ();
  displayedColumns: string[] = ['descripcion', 'cantidad', 'total'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ObservarBoletaModalComponent>,
    private appSrv: AppService
  ) {
  }

  ngOnInit(): void {
    // this.dataSource.data = this.data.nota_ventas;
    this.appSrv.detalleBoleta(this.data.id_boleta).subscribe((res: any) => {
      this.dataSource.data = res.detalle_boleta;
    }, err => {
    })
  }

  handleAnular() {
    const obj = {
      id_boleta: this.data.id_boleta,
      estado: '2'
    }
    this.appSrv.updateBoleta(obj).subscribe(res => {
      // this.dialogRef.close();
      this.eventEmit.emit(res);

    }, err => {
    })
  }

  handleFinalizar() {
    const obj = {
      id_boleta: this.data.id_boleta,
      estado: '1'
    }
    this.appSrv.updateBoleta(obj).subscribe(res => {
      this.eventEmit.emit(res);
      // this.dialogRef.close();
    }, err => {
    })
  }

  handleAnularReclamo() {
    const obj = {
      id_boleta: this.data.id_boleta,
      estado: '1'
    }
    this.appSrv.updateBoleta(obj).subscribe(res => {
      // this.dialogRef.close();
      this.eventEmit.emit(res);

    }, err => {
    })
  }
  handleFinRecllamo() {
    const obj = {
      id_boleta: this.data.id_boleta,
      estado: '4'
    }
    this.appSrv.updateBoleta(obj).subscribe(res => {
      // this.dialogRef.close();
      this.eventEmit.emit(res);

    }, err => {
    })
  }
}
