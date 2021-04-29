import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { RestauranteI } from '../model/restaurante_i';

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  public coleccionRestaurante : AngularFirestoreCollection<RestauranteI>;

  constructor(public angularFirestore: AngularFirestore) {
    this.coleccionRestaurante = angularFirestore.collection<RestauranteI>('restaurants');
  }


  crearRestaurante(restaurante: RestauranteI){
    return this.coleccionRestaurante.add(restaurante);
  }

  getRestaurantePorUsuario(idUsuario: string){
    return this.coleccionRestaurante.ref.where("user_id", "==", idUsuario);
  }

  editarRestaurantePorId(idRestaurante: string, restaurante: RestauranteI){
    return this.coleccionRestaurante.doc(idRestaurante).set(restaurante);
  }

  getRestauranteById(idRestaurante: string){
    return this.coleccionRestaurante.doc(idRestaurante).ref.get();
  }

}
