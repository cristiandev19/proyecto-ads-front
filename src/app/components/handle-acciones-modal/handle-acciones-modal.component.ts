import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { AsignarAccionModalComponent } from '../asignar-accion-modal/asignar-accion-modal.component';
import { CrearAccionModalComponent } from '../crear-accion-modal/crear-accion-modal.component';

@Component({
  selector: 'app-handle-acciones-modal',
  templateUrl: './handle-acciones-modal.component.html',
  styleUrls: ['./handle-acciones-modal.component.scss']
})
export class HandleAccionesModalComponent implements OnInit {
  @Output() eventEmit = new EventEmitter<any>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appSrv: AppService,
    public dialogRef: MatDialogRef<HandleAccionesModalComponent>,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void { }


  handleNuevaAccion() {
    const dialogRef = this.dialog.open(CrearAccionModalComponent, {
      data: {}
    })
  }
  handleAsignarAccion() {
    const dialogRef = this.dialog.open(AsignarAccionModalComponent, {
      data: {}
    })
  }
}
