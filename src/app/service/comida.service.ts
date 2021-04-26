import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { PlatoI} from '../model/plato_i';

@Injectable({
  providedIn: 'root'
})
export class ComidaService {

  public coleccionComida : AngularFirestoreCollection<PlatoI>;

  constructor(public angularFirestore: AngularFirestore) { 
    this.coleccionComida = angularFirestore.collection<PlatoI>('food');
  }

  crearComida(comida: PlatoI){
    return this.coleccionComida.add(comida);
  }

  getAllPlatosPorRestaurante(idRestaurante: string){
    return this.coleccionComida.ref.where("restaurantId", "==", idRestaurante);
  }
}
