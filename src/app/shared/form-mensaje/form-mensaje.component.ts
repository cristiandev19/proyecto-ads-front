import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IFormMensaje } from 'src/app/app.model';

@Component({
  selector: 'app-form-mensaje',
  templateUrl: './form-mensaje.component.html',
  styleUrls: ['./form-mensaje.component.scss']
})
export class FormMensajeComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IFormMensaje,
    public dialogRef: MatDialogRef<FormMensajeComponent>
  ) { }

  ngOnInit(): void { }
}
