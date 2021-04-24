import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { CategoriaI } from 'src/app/model/categoria_i';
import { RestauranteI } from 'src/app/model/restaurante_i';

@Component({
  selector: 'app-formulario-plato',
  templateUrl: './formulario-plato.component.html',
  styleUrls: ['./formulario-plato.component.scss']
})
export class FormularioPlatoComponent implements OnInit {

  platoForm: FormGroup;
  categorias: Array<CategoriaI>;
  restaurantes = [];

  constructor(private fbstore: AngularFirestore) { }

  ngOnInit(): void {
    this.getCategories();
    this.getRestaurantes();
  }

  crearPlato(){

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

  async getRestaurantes(){
    
    try{
      await this.fbstore.collection("restaurants").snapshotChanges().subscribe(data=>{
        this.restaurantes = data.map(
          result=>{
            return{
            uid : result.payload.doc.id,
            restaurant_name : result.payload.doc.data()["restaurant_name"]/*,
            restaurant_description : result.payload.doc.data()["restaurant_description"],
            restaurant_image : result.payload.doc.data()["restaurant_image"],
            restaurant_location : result.payload.doc.data()["restaurant_location"],
            restaurant_phone : result.payload.doc.data()["restaurant_phone"],
            restaurant_zone : result.payload.doc.data()["restaurant_zone"]*/
          }
          }
        );
      });
    }catch(error){
      console.log(error)
    }
  }
}
