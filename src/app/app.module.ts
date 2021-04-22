import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/** ----------------------------- FIREBASE ----------------------------- */
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from 'src/environments/environment';
import { HomeComponent } from './components/home/home.component';
import { RegistroUsuariosComponent } from './components/usuarios/registro-usuarios/registro-usuarios.component';
import { RegistroRestaurautesComponent } from './components/restaurantes/registro-restaurautes/registro-restaurautes.component';
import { CatalogoRestaurautesComponent } from './components/restaurantes/catalogo-restaurautes/catalogo-restaurautes.component';
import { LoginComponent } from './components/usuarios/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistroUsuariosComponent,
    RegistroRestaurautesComponent,
    CatalogoRestaurautesComponent,
    LoginComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
