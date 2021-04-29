import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { UsuarioI } from '../model/usuario_i';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private coleccionUsuario : AngularFirestoreCollection<UsuarioI>;

  constructor(private angularFirestore: AngularFirestore) { 
    this.coleccionUsuario = angularFirestore.collection<UsuarioI>('users');
  }

  
  crearUsuario(usuario: UsuarioI){
    return this.coleccionUsuario.add(usuario);
  }


  getUsuarioPorId(idUsuario: string){
    return this.coleccionUsuario.ref.where("uid", "==", idUsuario);
  }

  editarUsuario(idUsuario: string, usuario: UsuarioI){
    return this.coleccionUsuario.doc(idUsuario).set(usuario)
  }
}
