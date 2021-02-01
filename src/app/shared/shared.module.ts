import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

// Material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
// My components
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { FormMensajeComponent } from './form-mensaje/form-mensaje.component';

@NgModule({
  declarations: [
    ConfirmModalComponent,
    FormMensajeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatSidenavModule,
    
  ],
  exports: [
    ConfirmModalComponent,
    FormMensajeComponent
  ],
  entryComponents: [
    ConfirmModalComponent,
    FormMensajeComponent
  ],
  providers: [],
  bootstrap: []
})
export class SharedModule { }
