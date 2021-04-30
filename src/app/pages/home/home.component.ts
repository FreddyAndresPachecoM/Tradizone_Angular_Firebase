import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CategoriaI } from 'src/app/model/categoria_i';
import { PlatoI } from 'src/app/model/plato_i';
import { RestauranteService } from 'src/app/service/restaurante.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  categorias : Array<CategoriaI>; 
  public comidas= [];
  public restaurantes = [];
  public recetas = [];

  restaurante: any;
  nombre_restaurante: string;

  filterPost = '';

  constructor(private fbstore: AngularFirestore, private restauranteService: RestauranteService) { }

  ngOnInit(): void {
    this.getCategories();
    this.getFoods();
  }

  async getFoods(){

    try {
      await this.fbstore.collection("food").snapshotChanges().subscribe(data=>{
        this.comidas = data.map(
          result => {
            this.restauranteService.getRestauranteById(result.payload.doc.data()["restaurantId"]).then(
              (doc) => {
                this.nombre_restaurante = doc.data().restaurant_name
              }
            )
            return{
            
            food_id : result.payload.doc.id,
            food_category : result.payload.doc.data()["food_category"],
            food_cost : result.payload.doc.data()["food_cost"],
            food_description : result.payload.doc.data()["food_description"],
            food_image : result.payload.doc.data()["food_image"],
            food_name : result.payload.doc.data()["food_name"],
            food_state: result.payload.doc.data()["food_state"],
            food_restaurant : this.nombre_restaurante
            //food_restaurant : result.payload.doc.data()["food_restaurant"]
            }
            
          }
        );
      });  
    } catch (error) {
      console.log(error)
    }
    
  }

  /*async getRestaurante(idRestaurante: string): string{
    await this.restauranteService.getRestauranteById(idRestaurante).then(
      (doc) => {
        
        this.nombre_restaurante = doc.data().restaurant_name;
      }
    )
    return this.nombre_restaurante;
  }*/


  getRestaurantes(){
    try {
      this.fbstore.collection("restaurants").snapshotChanges().subscribe(data =>{
        this.restaurantes = data.map(
          result => {
            return{
              restaurant_id : result.payload.doc.id,
              restaurant_description: result.payload.doc.data()["restaurant_description"],
              restaurant_image: result.payload.doc.data()["restaurant_image"],
              restaurant_location: result.payload.doc.data()["restaurant_location"],
              restaurant_name: result.payload.doc.data()["restaurant_name"],
              restaurant_phone: result.payload.doc.data()["restaurant_phone"],
              restaurant_zone: result.payload.doc.data()["restaurant_zone"],
              user_id: result.payload.doc.data()["user_id"]          
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


  seleccionOpcion(tipo: string){
    this.filterPost = tipo;
    
    if(this.filterPost == "Restaurantes"){
      this.getRestaurantes();
      this.recetas = [];
    }else if(this.filterPost == "Recetas"){
      this.llenarRecetas();
      this.restaurantes = [];
    }else{
      this.recetas = [];
      this.restaurantes = [];
    }

  }


  llenarRecetas(){
    this.recetas = [
      {
        "receta_titulo": "Tamal Cuencano",
        "receta_ingredientes":"1 libra de maíz seco marca Akí"+
                              "2 cucharadas de mantequilla"+
                              "1 cebolla paiteña cortada en cuatro pedazos"+
                              "3 cebollas blancas picadas finamente"+
                              "1 cucharadita de achiote"+
                              "1 cubito de concentrado de caldo de pollo"+
                              "½ libra de carne de chancho"+
                              "½ taza de pasas"+
                              "½ taza de arvejas cocinadas"+
                              "2 huevos duros"+
                              "1 pizca de azúcar"+
                              "1 paquete de hojas de achira para envolver"+
                              "Sal, pimienta y ajo al gusto",
        "receta_preparacion":"Remoja el maíz en agua fría durante dos días, cambiando el agua diariamente. Una vez remojado, escurre y muele el maíz fino."+
                            "Aparte, en una olla con agua, cocina la carne de cerdo con cebolla paiteña, ajo, sal, pimienta y cubo de concentrado de pollo, hasta que la carne esté suave y se pueda desmechar."+
                            "Cierne el caldo sobrante, añade el maíz molido a la olla y cocina a fuego lento, revolviendo constantemente hasta que el maíz esté listo. Añade la pizca de azúcar para quitar el amargor del maíz. Retira del fuego y deja enfriar."+
                            "Para preparar el condumio, sofríe la mantequilla y achiote. Una vez caliente, añade la cebolla blanca y cocina por un minuto. Agrega la carne de cerdo mechada, arvejas y pasas. Sazona con sal y pimienta."+
                            "Lava y seca las hojas de achira. Una vez secas, arma los tamales, colocando un cucharón de masa de maíz y encima la carne de cerdo y una o dos rodajas de huevo duro. Cierra el tamal y cocínalo en una olla tamalera por 20 minutos, aproximadamente.",
        "receta_url_imagen":"https://i0.wp.com/akiestamosparati.aki.com.ec/wp-content/uploads/2020/10/tamal.jpg?resize=1024%2C649&amp;ssl=1",
        "receta_autor":"Angel Lucero",
        "receta_fecha":"2021-04-20 10:32"
      },
      {
        "receta_titulo": "Sancocho Cuencano",
        "receta_ingredientes":"3 cucharaditas de ajo picado listo en aceite de girasol Nutrialimentos"+
                              "2 libras de carne de cerdo cortada en trozos pequeños"+
                              "1 cebolla paiteña en mitades"+
                              "2 cebollas blancas en mitades"+
                              "1 ½ tazas de agua"+
                              "1 taza de zumo de naranja"+
                              "1 cucharada de sal"+
                              "½ cucharadita de comino"+
                              "Pimienta al gusto"+
                              "Para acompañar"+
                              "Llapingachos"+
                              "Mote cocinado"+
                              "Maíz tostado"+
                              "Encurtido de tomate, cebolla y culantro",
        "receta_preparacion":"En una olla a fuego bajo cocina la carne con cebolla paiteña, cebollas blancas, ajo picado listo en aceite de girasol Nutrialimentos, agua, zumo de naranja, sal, comino y pimienta, hasta que se haya secado todo el líquido y la carne esté suave. En una bandeja dispón la carne, llapingachos, mote, maíz tostado y encurtido. Sirve. ",
        "receta_url_imagen":"https://i0.wp.com/akiestamosparati.aki.com.ec/wp-content/uploads/2020/10/sancocho-cuencano.jpg?resize=1024%2C546&amp;ssl=1",
        "receta_autor":"Chirss Eduu",
        "receta_fecha":"2021-04-25 14:31"
      },
      {
        "receta_titulo": "Mote pillo con carne asada",
        "receta_ingredientes":"2 tazas de mote cocinado"+
                              "½ taza de leche"+
                              "½ taza de queso fresco picado"+
                              "3 ramas de cebolla blanca picada"+
                              "2 huevos"+
                              "2 cucharadas de aceite con achiote"+
                              "1 aguacate maduro"+
                              "Sal, pimienta y culantro picado al gusto"+
                              "Para la carne"+
                              "1 cucharadita de comino marca Akí"+
                              "4 filetes de carne de cerdo"+
                              "2 cucharadas de aceite de achiote"+
                              "3 dientes de ajo picados"+
                              "Sal y pimienta al gusto",
        "receta_preparacion":"Para preparar el mote pillo, en una sartén, a fuego medio, vierte el aceite con achiote y cuando esté caliente, agrega la cebolla blanca picada y sofríe por dos minutos. Añade el mote cocinado y mezcla bien."+
        "Aparte, en un tazón, bate la leche con los huevos y agrega al mote. Mezcla constantemente hasta que se seque. Agrega el queso picado y finalmente, el culantro."+
        "Para preparar la carne, aliña los filetes con todos los ingredientes y deja reposar por 20 minutos. Asa los filetes a la parrilla o en una sartén. Sirve con el mote pillo y aguacate.",
        "receta_url_imagen":"https://i2.wp.com/akiestamosparati.aki.com.ec/wp-content/uploads/2020/10/mote-pillo.jpg?resize=1024%2C649&amp;ssl=1",
        "receta_autor":"Chriss Eddu",
        "receta_fecha":"2021-04-27 10:26"
      }
    ]; 
  }

}
