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

  crearComida(plato: PlatoI){
    return this.coleccionComida.add(plato);
  }

  getAllPlatosPorRestaurante(idRestaurante: string){
    return this.coleccionComida.ref.where("restaurantId", "==", idRestaurante);
  }

  getPlatoPorId(idPlato : string){
    return this.coleccionComida.doc(idPlato).ref.get();
  }

  editarPlatoPorId(idPlato: string, plato: PlatoI){
    return this.coleccionComida.doc(idPlato).set(plato);
  }
}
