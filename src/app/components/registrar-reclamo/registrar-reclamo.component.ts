import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from 'src/app/shared/confirm-modal/confirm-modal.component';
import { MotivoReclamoModalComponent } from '../motivo-reclamo-modal/motivo-reclamo-modal.component';


const DATA = [
  {
    description: '1',
    date: '1',
    state: '1',
  },
  {
    description: '1asdsad',
    date: '1',
    state: '1',
  },
  {
    description: '152',
    date: '1',
    state: '1',
  },
  {
    description: 'y',
    date: '1',
    state: '1',
  },
  {
    description: '2',
    date: '1',
    state: '1',
  }
] 
@Component({
  selector: 'cs-registrar-reclamo',
  templateUrl: './registrar-reclamo.component.html',
  styleUrls: ['./registrar-reclamo.component.scss']
})
export class RegistrarReclamoComponent implements OnInit {
  displayedColumns: string[] = ['description','date','state', 'action'];
  dataSource = DATA;
  searchForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog 
  ) {
    this.searchForm = this.fb.group({
      search: ['']
    });
  }
  
  ngOnInit(): void { }

  handleSearch() {
    const { search : filterValue} = this.searchForm.value();
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleModify(data: any) {
    const dialog1 = this.dialog.open(ConfirmModalComponent, {
      width: '500px',
      data: {
        title: 'Estas seguro?',
        msj: 'Estado de boleta de modificara etc etc etc'
      }
    });


    const dialog2 = this.dialog.open(MotivoReclamoModalComponent, {
      width: '500px',
      data: {
      }
    });

  }
}


