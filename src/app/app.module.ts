import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

// Material
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatRadioModule} from '@angular/material/radio';
// My components
import { LoginComponent } from './components/login/login.component';
import { RestartPasswordComponent } from './components/restart-password/restart-password.component';
import { EmitirNotaComponent } from './components/emitir-nota/emitir-nota.component';
import { EmitirBoletaComponent } from './components/emitir-boleta/emitir-boleta.component';
import { DetalleProductoModalComponent } from './components/detalle-producto-modal/detalle-producto-modal.component';
import { InformeBalanceComponent } from './components/informe-balance/informe-balance.component';
import { RegistrarReclamoComponent } from './components/registrar-reclamo/registrar-reclamo.component';
import { SharedModule } from './shared/shared.module';
import { MotivoReclamoModalComponent } from './components/motivo-reclamo-modal/motivo-reclamo-modal.component';
import { CambiarBoletaComponent } from './components/cambiar-boleta/cambiar-boleta.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthComponent } from './components/auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RestartPasswordComponent,
    EmitirNotaComponent,
    EmitirBoletaComponent,
    DetalleProductoModalComponent,
    InformeBalanceComponent,
    RegistrarReclamoComponent,
    MotivoReclamoModalComponent,
    CambiarBoletaComponent,
    AdminComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
    SharedModule,
    MatRadioModule
  ],
  exports: [
    AppRoutingModule
  ],
  entryComponents: [
    DetalleProductoModalComponent,
    MotivoReclamoModalComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
