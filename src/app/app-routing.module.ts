import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './pages/history/history.component';
import { HomeComponent } from './pages/home/home.component';
import { FormularioPlatoComponent } from './components/platos/formulario-plato/formulario-plato.component';
import { RegistroRestaurautesComponent } from './components/restaurantes/registro-restaurautes/registro-restaurautes.component';
import { ConfiguracionCuentaComponent } from './components/usuarios/cuenta/configuracion-cuenta/configuracion-cuenta.component';
import { TableroCuentaComponent } from './components/usuarios/cuenta/tablero-cuenta/tablero-cuenta.component';
import { LoginComponent } from './components/usuarios/login/login.component';
import { RegistroUsuariosComponent } from './components/usuarios/registro-usuarios/registro-usuarios.component';
import { FormularioEventosComponent } from './components/eventos/formulario-eventos/formulario-eventos.component';
import { EventosComponent } from './pages/eventos/eventos.component';

const routes: Routes = [
  { path: 'home',  component: HomeComponent},
  { path: 'usuario-registro', component: RegistroUsuariosComponent},
  { path: 'login', component: LoginComponent},
  { path: 'restaurante-registro', component:  RegistroRestaurautesComponent},
  { path: 'historia', component: HistoryComponent},
  { path: 'plato-registro/:idRestaurante', component: FormularioPlatoComponent},
  { path: 'evento-registro', component: FormularioEventosComponent},
  { path: 'tablero-cuenta', component: TableroCuentaComponent},
  { path: 'configuracion-cuenta', component: ConfiguracionCuentaComponent},
  { path: 'eventos', component: EventosComponent},
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
