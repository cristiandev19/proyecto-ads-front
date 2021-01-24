import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestartPasswordComponent } from './components/restart-password/restart-password.component';
import { LoginComponent } from './components/login/login.component';
import { EmitirNotaComponent } from './components/emitir-nota/emitir-nota.component';
import { EmitirBoletaComponent } from './components/emitir-boleta/emitir-boleta.component';
import { InformeBalanceComponent } from './components/informe-balance/informe-balance.component';
import { RegistrarReclamoComponent } from './components/registrar-reclamo/registrar-reclamo.component';
import { CambiarBoletaComponent } from './components/cambiar-boleta/cambiar-boleta.component';
import { GestionarUsuarioComponent } from './components/gestionar-usuario/gestionar-usuario.component';
import { ReporteInventarioComponent } from './components/reporte-inventario/reporte-inventario.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'restart-password', component: RestartPasswordComponent },
  { path: 'emitir-nota', component: EmitirNotaComponent },
  { path: 'emitir-boleta', component: EmitirBoletaComponent },
  { path: 'informe-balance', component: InformeBalanceComponent },
  { path: 'registrar-reclamo', component: RegistrarReclamoComponent },
  { path: 'cambiar-boleta', component: CambiarBoletaComponent },
  { path: 'gestionar-usuario', component: GestionarUsuarioComponent },
  { path: 'reporte-inventario', component: ReporteInventarioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
