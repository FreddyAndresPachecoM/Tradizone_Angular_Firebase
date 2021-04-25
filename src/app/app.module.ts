import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/** ----------------------------- FORMULARIOS REACTIVOS ----------------------------- */
import { ReactiveFormsModule } from '@angular/forms';

/** ----------------------------- FIREBASE ----------------------------- */
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from 'src/environments/environment';

/** ----------------------------- COMPONENTES ----------------------------- */
import { HomeComponent } from './components/home/home.component';
import { RegistroUsuariosComponent } from './components/usuarios/registro-usuarios/registro-usuarios.component';
import { RegistroRestaurautesComponent } from './components/restaurantes/registro-restaurautes/registro-restaurautes.component';
import { CatalogoRestaurautesComponent } from './components/restaurantes/catalogo-restaurautes/catalogo-restaurautes.component';
import { LoginComponent } from './components/usuarios/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HistoryComponent } from './components/history/history.component';
import { FormularioPlatoComponent } from './components/platos/formulario-plato/formulario-plato.component';

/** -------- STORAGE: servicio de Firebase para almacenar archivos -------- */
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ConfiguracionCuentaComponent } from './components/usuarios/cuenta/configuracion-cuenta/configuracion-cuenta.component';
import { TableroCuentaComponent } from './components/usuarios/cuenta/tablero-cuenta/tablero-cuenta.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistroUsuariosComponent,
    RegistroRestaurautesComponent,
    CatalogoRestaurautesComponent,
    LoginComponent,
    NavbarComponent,
    HistoryComponent,
    FormularioPlatoComponent,
    ConfiguracionCuentaComponent,
    TableroCuentaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
