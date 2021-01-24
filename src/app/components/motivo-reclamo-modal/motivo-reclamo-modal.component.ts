import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'cs-motivo-reclamo-modal',
  templateUrl: './motivo-reclamo-modal.component.html',
  styleUrls: ['./motivo-reclamo-modal.component.scss']
})
export class MotivoReclamoModalComponent implements OnInit {
  motivo:any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void { }
}
