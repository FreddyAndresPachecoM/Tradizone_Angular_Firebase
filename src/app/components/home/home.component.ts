import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CategoriaI } from 'src/app/model/categoria_i';
import { Comida } from 'src/app/model/comida';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  //categorieslist = Array;

  categorias : Array<CategoriaI>; 
  comidas: Array<Comida>;

  constructor(private fbstore: AngularFirestore) { }

  ngOnInit(): void {
    this.getCategories();
    this.getFoods();
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

  getFoods(){
    this.fbstore.collection("food").snapshotChanges().subscribe(data=>{
      this.comidas = data.map(
        result => {
          let comida = new Comida;
          comida.food_id = result.payload.doc.id;
          comida.food_category = result.payload.doc.data()["food_category"];
          comida.food_cost = result.payload.doc.data()["food_cost"];
          comida.food_description = result.payload.doc.data()["food_description"];
          comida.food_image = result.payload.doc.data()["food_image"];
          comida.food_name = result.payload.doc.data()["food_name"];
          comida.food_restaurant = result.payload.doc.data()["food_restaurant"];

          return comida;
        }
      )
    })
  }


  getCategories() {
    this.fbstore.collection("categories").snapshotChanges().subscribe(
      data => {
        this.categorias = data.map(
          result => {
            let categoria = new CategoriaI;
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
