import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegistroRestaurautesComponent } from './components/restaurantes/registro-restaurautes/registro-restaurautes.component';
import { LoginComponent } from './components/usuarios/login/login.component';
import { RegistroUsuariosComponent } from './components/usuarios/registro-usuarios/registro-usuarios.component';

const routes: Routes = [
  { path: 'home',  component: HomeComponent},
  { path: 'usuario-registro', component: RegistroUsuariosComponent},
  { path: 'login', component: LoginComponent},
  { path: 'restaurante-registro', component:  RegistroRestaurautesComponent},
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
