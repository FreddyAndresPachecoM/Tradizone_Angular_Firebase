import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private fbstore: AngularFirestore) { }

  ngOnInit(): void {
  }

 /* async getCategories(){
    try{
      await this.fbstore.collection("categories").snapshotChanges()
      .subscribe(data => {
        this.categorieslist = data.map(result => {
          return {
            category_id: result.payload.doc.id,
            category_name: result.payload.doc.data()["category_name"],
            category_image: result.payload.doc.data()["category_image"]
          }
        });
      });
    }catch(error){
      alert("Ocurrio un error, es culpa del Angel")
    }
  }*/

}
