import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CONFIRM_ACTIONS } from 'src/app/app.model';

@Component({
  selector: 'cs-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  CONFIRM_ACTIONS = CONFIRM_ACTIONS;
  @Output() eventEmit = new EventEmitter();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void { }

  handleEmit(action: number) {
    this.eventEmit.emit({action})
  }
}
