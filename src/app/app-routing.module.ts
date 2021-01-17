import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestartPasswordComponent } from './components/restart-password/restart-password.component';
import { LoginComponent } from './components/login/login.component';
import { EmitirNotaComponent } from './components/emitir-nota/emitir-nota.component';
import { EmitirBoletaComponent } from './components/emitir-boleta/emitir-boleta.component';
import { InformeBalanceComponent } from './components/informe-balance/informe-balance.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'restart-password', component: RestartPasswordComponent },
  { path: 'emitir-nota', component: EmitirNotaComponent },
  { path: 'emitir-boleta', component: EmitirBoletaComponent },
  { path: 'informe-balance', component: InformeBalanceComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
