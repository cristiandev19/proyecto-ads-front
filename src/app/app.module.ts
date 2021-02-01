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
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar'; 
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
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ReporteInventarioComponent } from './components/reporte-inventario/reporte-inventario.component';
import { CreateRolModalComponent } from './components/create-rol-modal/create-rol-modal.component';
import { GestionarPrivilegiosComponent } from './components/gestionar-privilegios/gestionar-privilegios.component';
import { HandleAccionesModalComponent } from './components/handle-acciones-modal/handle-acciones-modal.component';
import { CrearAccionModalComponent } from './components/crear-accion-modal/crear-accion-modal.component';
import { AsignarAccionModalComponent } from './components/asignar-accion-modal/asignar-accion-modal.component';
import { AgregarProductoComponent } from './components/agregar-producto/agregar-producto.component';
import { ProductoEdicionModalComponent } from './components/producto-edicion-modal/producto-edicion-modal.component';
import { GestionarUsuarioComponent } from './components/gestionar-usuario/gestionar-usuario.component';
import { UsuarioEdicionModalComponent } from './components/usuario-edicion-modal/usuario-edicion-modal.component';
import { NotaVentaModalComponent } from './components/nota-venta-modal/nota-venta-modal.component';
import { EmitirBoletaModalComponent } from './components/emitir-boleta-modal/emitir-boleta-modal.component';

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
    AuthComponent,
    HomeComponent,
    ReporteInventarioComponent,
    CreateRolModalComponent,
    GestionarPrivilegiosComponent,
    CreateRolModalComponent,
    HandleAccionesModalComponent,
    CrearAccionModalComponent,
    AsignarAccionModalComponent,
    AgregarProductoComponent,
    ProductoEdicionModalComponent,
    GestionarUsuarioComponent,
    UsuarioEdicionModalComponent,
    NotaVentaModalComponent,
    EmitirBoletaModalComponent
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
    MatGridListModule,
    MatSelectModule,
    MatSnackBarModule,
    SharedModule,
    MatRadioModule,
    HttpClientModule
  ],
  exports: [
    AppRoutingModule
  ],
  entryComponents: [
    DetalleProductoModalComponent,
    MotivoReclamoModalComponent,
    CreateRolModalComponent,
    HandleAccionesModalComponent,
    CrearAccionModalComponent,
    AsignarAccionModalComponent,
    ProductoEdicionModalComponent,
    UsuarioEdicionModalComponent,
    NotaVentaModalComponent,
    EmitirBoletaModalComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
