import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { HistoriaI } from '../model/historia_i';

@Injectable({
  providedIn: 'root'
})
export class HistoriaService {

  public coleccionHistoria: AngularFirestoreCollection;

  constructor(public angularFirestore: AngularFirestore) { 
    this.coleccionHistoria = angularFirestore.collection<HistoriaI>('histories');
  }


  crearHistoria(historia: HistoriaI){
    return this.coleccionHistoria.add(historia);
  }

  getAllHistoriasPorUsuario(idUsuario: string){
    return this.coleccionHistoria.ref.where("idUsuario", "==", idUsuario);
  }
}
