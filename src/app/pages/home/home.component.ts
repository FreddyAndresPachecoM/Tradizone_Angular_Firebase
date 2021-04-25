import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CategoriaI } from 'src/app/model/categoria_i';
import { ComidaI } from 'src/app/model/comida_i';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  //categorieslist = Array;

  categorias : Array<CategoriaI>; 
  public comidas= [];

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

  async getFoods(){

    try {
      await this.fbstore.collection("food").snapshotChanges().subscribe(data=>{
        this.comidas = data.map(
          result => {
            return{
            
            food_id : result.payload.doc.id,
            food_category : result.payload.doc.data()["food_category"],
            food_cost : result.payload.doc.data()["food_cost"],
            food_description : result.payload.doc.data()["food_description"],
            food_image : result.payload.doc.data()["food_image"],
            food_name : result.payload.doc.data()["food_name"],
            food_restaurant : result.payload.doc.data()["food_restaurant"]
            }
            
          }
        );
      });  
    } catch (error) {
      console.log(error)
    }
    
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
