import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { CategoriaI } from 'src/app/model/categoria_i';
import { RestauranteI } from 'src/app/model/restaurante_i';
import { AuthService } from 'src/app/service/auth.service';
import { ComidaService } from 'src/app/service/comida.service';
import { RestauranteService } from 'src/app/service/restaurante.service';

@Component({
  selector: 'app-formulario-plato',
  templateUrl: './formulario-plato.component.html',
  styleUrls: ['./formulario-plato.component.scss']
})
export class FormularioPlatoComponent implements OnInit {

  @ViewChild('imagenInputFile', {static: false}) imagenFile: ElementRef;
  imagenMin: File;

  categorias: Array<CategoriaI>;
  restaurantes = [];
  food_restaurant: string;

  private comida: any = {};

  private imagen : File = null;
  private imagenPath: string;
  private idRestaurante: string;

  constructor(private fbstore: AngularFirestore, private comidaService: ComidaService, private storage: AngularFireStorage, 
              private authService: AuthService, private activatedRoute: ActivatedRoute, private restauranteService: RestauranteService) { }

  platoRegistroForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    costo: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => this.idRestaurante = params.get('idRestaurante'));
    this.getRestaurante();
    this.getCategories();
  }

  onChange(e){
    this.imagen = e.target.files[0];
    this.imagen = e.target.files[0];
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.imagenMin = evento.target.result;
    };
    fr.readAsDataURL(this.imagen);
  }

  registrarPlato(){
    const {nombre, categoria, descripcion, costo, restaurante} = this.platoRegistroForm.value;
    if(this.imagen != null && this.platoRegistroForm.valid){
      const usuarioLoguedo = this.authService.getUsuarioLogeado();
      usuarioLoguedo.then(
        data=> {
          this.comida['food_name'] = nombre;
          this.comida['food_category'] = categoria;
          this.comida['food_description'] = descripcion;
          this.comida['food_cost'] = costo;
          this.comida['restaurantId'] = this.idRestaurante;
          this.comida['food_state'] = true;
          this.comida['food_restaurant'] = this.food_restaurant
          this.crearPlato(this.comida, this.imagen)
        },
        err => alert('¡A ocurrido un problema al obtener el usuario autenticado!')
      );
    }else alert('¡Debe llenar todos los campos!');
  }

  private crearPlato(comida: any, imagen: File){
    this.imagenPath = `imagenes_comida/${imagen.name}`;
    const fileRef = this.storage.ref(this.imagenPath);
    const task = this.storage.upload(this.imagenPath, imagen);
    task.snapshotChanges().pipe(finalize(() => {
      fileRef.getDownloadURL().subscribe(urlImagen => {
        comida['food_image'] = urlImagen;
        this.comidaService.crearComida(comida);
        alert("¡Comida registrado correctamente!")
        this.platoRegistroForm.reset();
      }, 
      err => alert("ocurrio un error al intentar obtener la url de la imagen!"))
    })).subscribe();
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

  getRestaurante(){
    this.restauranteService.getRestauranteById(this.idRestaurante).then(
      doc => this.food_restaurant = doc.data().restaurant_name
    );
  }
}
