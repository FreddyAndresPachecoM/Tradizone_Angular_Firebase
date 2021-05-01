import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventos = [];

  constructor(private fbstore: AngularFirestore) { }

  ngOnInit(): void {
    this.getEventos();
  }

  async getEventos(){
    try {
      await this.fbstore.collection("events").snapshotChanges().subscribe(data => {
        this.eventos = data.map(
          result => {
            return{
              event_id : result.payload.doc.id,
              event_date : result.payload.doc.data()["event_date"],
              event_date_create : result.payload.doc.data()["event_date_create"],
              event_description : result.payload.doc.data()["event_description"],
              event_location : result.payload.doc.data()["event_location"],
              event_title : result.payload.doc.data()["event_title"],
              event_state : result.payload.doc.data()["event_state"],
              event_url_image : result.payload.doc.data()["event_url_image"] 
            }
          }
        );
      });
    } catch (error) {
      console.log(error);
    }
  }

}
