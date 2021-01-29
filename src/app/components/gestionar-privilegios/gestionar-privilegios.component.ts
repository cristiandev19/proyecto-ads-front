import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateRolModalComponent } from '../create-rol-modal/create-rol-modal.component';
import { HandleAccionesModalComponent } from '../handle-acciones-modal/handle-acciones-modal.component';

@Component({
  selector: 'app-gestionar-privilegios',
  templateUrl: './gestionar-privilegios.component.html',
  styleUrls: ['./gestionar-privilegios.component.scss']
})
export class GestionarPrivilegiosComponent implements OnInit {
  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void { }

  handleNuevoRol() {
    const dialogRef = this.dialog.open(CreateRolModalComponent, {
      data: {

      }
    });

    dialogRef.componentInstance.eventEmit.subscribe((event: any) => {
      dialogRef.close();
    })
  }
  handleAcciones() {
    const dialogRef = this.dialog.open(HandleAccionesModalComponent, {
      data: {

      }
  });

    dialogRef.componentInstance.eventEmit.subscribe((event: any) => {
      dialogRef.close();
    })

  }
}
