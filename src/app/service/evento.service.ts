import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { EventoI } from '../model/evento_i';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  public coleccionEvento: AngularFirestoreCollection<EventoI>;

  constructor(public angularFirestore: AngularFirestore) {
    this.coleccionEvento = angularFirestore.collection<EventoI>('events');
  }

  crearEvento(evento: EventoI){
    return this.coleccionEvento.add(evento);
  }

  getAllEventoPorUsuario(idUsuario: string){
    return this.coleccionEvento.ref.where("idUsuario", "==", idUsuario);
  }

  getEventoPorId(idEvento: string){
    return this.coleccionEvento.doc(idEvento).ref.get();
  }

  editarEventoPorId(idEvento: string, evento: EventoI){
    return this.coleccionEvento.doc(idEvento).set(evento);
  }

}
