import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { HistoriaI } from '../model/historia_i';

@Injectable({
  providedIn: 'root'
})
export class HistoriaService {

  public coleccionHistoria: AngularFirestoreCollection<HistoriaI>;

  constructor(public angularFirestore: AngularFirestore) { 
    this.coleccionHistoria = angularFirestore.collection<HistoriaI>('histories');
  }


  crearHistoria(historia: HistoriaI){
    return this.coleccionHistoria.add(historia);
  }

  getAllHistoriasPorUsuario(idUsuario: string){
    return this.coleccionHistoria.ref.where("idUsuario", "==", idUsuario);
  }

  getHistoriaPorId(idHistoria: string){
    return this.coleccionHistoria.doc(idHistoria).ref.get();
  }

  actualizarHistoriaPorId(idHistoria: string, historia: HistoriaI){
    return this.coleccionHistoria.doc(idHistoria).set(historia);
  }
}
