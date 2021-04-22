import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private firestore: AngularFirestore) { }

  agregarUsuario(users: any):Promise<any>{
    return this.firestore.collection('users').add(users);
  } 

}
