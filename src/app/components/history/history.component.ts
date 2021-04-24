import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Historia } from 'src/app/model/historia';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  historias: Array<Historia>;

  constructor(private fbstore: AngularFirestore) { }

  ngOnInit(): void {
    this.getHistorias();
  }

  getHistorias(){
    this.fbstore.collection("histories").snapshotChanges().subscribe(data=>{
      this.historias = data.map(
        result =>{
          let historia = new Historia;
          historia.history_id = result.payload.doc.id;
          historia.history_description = result.payload.doc.data()["history_description"];
          historia.history_food_name = result.payload.doc.data()["history_food_name"];
          historia.history_title = result.payload.doc.data()["history_title"];
          historia.history_user_name = result.payload.doc.data()["history_user_name"];
          historia.history_url_image = result.payload.doc.data()["history_url_image"];
          return historia;
        }
      )
    })
  }

}
