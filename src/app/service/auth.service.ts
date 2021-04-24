import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) { }

  async iniciarSesion(correo: string, contrasena: string){
    try {
      const resultado = await this. afAuth.signInWithEmailAndPassword(correo, contrasena);
      return resultado;
    } catch (error) {
      alert('Correo o contrasena mal escritos!');
    }
  }

  async registrarUsuario(correo: string, contrasena: string){
    try {
      const resultado = await this. afAuth.createUserWithEmailAndPassword(correo, contrasena);
      this.iniciarSesion(correo, contrasena);
      return resultado;
    } catch (error) {
      console.log("Error al registrar usuario");
    }
  }

  async cerrarSesion(){
    try{
      await this.afAuth.signOut();
    }catch(error){
      console.log("Error al cerrar sesion");
    }
  }

  getUsuarioLogeado(){
    return this.afAuth.authState.pipe(first()).toPromise();
  }
}
