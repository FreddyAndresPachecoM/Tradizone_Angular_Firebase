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
import { FormularioHistoriasComponent } from './components/historias/formulario-historias/formulario-historias.component';
import { FormularioEditPlatoComponent } from './components/platos/formulario-edit-plato/formulario-edit-plato.component';
import { FormularioEditEventoComponent } from './components/eventos/formulario-edit-evento/formulario-edit-evento.component';
import { FormularioEditHistoriaComponent } from './components/historias/formulario-edit-historia/formulario-edit-historia.component';
import { FormEditUsuariosComponent } from './components/usuarios/form-edit-usuarios/form-edit-usuarios.component';
import { FormEditRestaurantesComponent } from './components/restaurantes/form-edit-restaurantes/form-edit-restaurantes.component';

const routes: Routes = [
  { path: 'home',  component: HomeComponent},
  { path: 'usuario-registro', component: RegistroUsuariosComponent},
  { path: 'login', component: LoginComponent},
  { path: 'restaurante-registro', component:  RegistroRestaurautesComponent},
  { path: 'historia', component: HistoryComponent},
  { path: 'plato-registro/:idRestaurante', component: FormularioPlatoComponent},
  { path: 'evento-registro/:idUsuario', component: FormularioEventosComponent},
  { path: 'historia-registro/:idUsuario', component: FormularioHistoriasComponent},
  { path: 'plato-edit/:idPlato', component: FormularioEditPlatoComponent},
  { path: 'evento-edit/:idEvento', component: FormularioEditEventoComponent},
  { path: 'historia-edit/:idHistoria', component: FormularioEditHistoriaComponent},
  { path: 'usuario-edit/:uid', component: FormEditUsuariosComponent},
  { path: 'restaurante-edit/:idRestaurante', component:FormEditRestaurantesComponent},
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
