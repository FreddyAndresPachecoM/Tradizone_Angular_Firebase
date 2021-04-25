import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ComidaI } from '../model/comida_i';

@Injectable({
  providedIn: 'root'
})
export class ComidaService {

  public coleccionComida : AngularFirestoreCollection<ComidaI>;

  constructor(public angularFirestore: AngularFirestore) { 
    this.coleccionComida = angularFirestore.collection<ComidaI>('food');
  }

  crearComida(comida: ComidaI){
    return this.coleccionComida.add(comida);
  }
}
