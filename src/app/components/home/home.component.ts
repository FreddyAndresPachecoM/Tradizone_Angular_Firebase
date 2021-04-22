import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Categoria } from 'src/app/model/categoria';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  //categorieslist = Array;

  categorias : Array<Categoria>; 

  constructor(private fbstore: AngularFirestore) { }

  ngOnInit(): void {
   // this.getCategories();
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

  getCategories() {
    this.fbstore.collection("categories").snapshotChanges().subscribe(
      data => {
        this.categorias = data.map(
          result => {
            let categoria = new Categoria;
            categoria.category_id = result.payload.doc.id;
            categoria.category_name = result.payload.doc.data()["category_name"];
            categoria.category_image = result.payload.doc.data()["category_image"]

            return categoria; 
          }
        );
        
      }
    );
  }
}
