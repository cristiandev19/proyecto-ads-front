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
import { AuthComponent } from './components/auth/auth.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { GestionarPrivilegiosComponent } from './components/gestionar-privilegios/gestionar-privilegios.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'restart-password', component: RestartPasswordComponent }
    ]
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'emitir-nota', component: EmitirNotaComponent, canActivate: [AuthGuard] },
      { path: 'emitir-boleta', component: EmitirBoletaComponent, canActivate: [AuthGuard] },
      { path: 'informe-balance', component: InformeBalanceComponent, canActivate: [AuthGuard] },
      { path: 'registrar-reclamo', component: RegistrarReclamoComponent, canActivate: [AuthGuard] },
      { path: 'cambiar-boleta', component: CambiarBoletaComponent, canActivate: [AuthGuard] },
      { path: 'gestionar-usuario', component: GestionarUsuarioComponent, canActivate: [AuthGuard] },
      { path: 'reporte-inventario', component: ReporteInventarioComponent, canActivate: [AuthGuard] },
      { path: 'gestionar-privilegios', component: GestionarPrivilegiosComponent, canActivate: [AuthGuard] }
    ],
    canActivate: [AuthGuard]
  },
  { path: '**', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
