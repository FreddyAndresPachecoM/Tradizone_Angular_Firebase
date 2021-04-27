import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { CategoriaI } from 'src/app/model/categoria_i';
import { ComidaService } from 'src/app/service/comida.service';

@Component({
  selector: 'app-formulario-edit-plato',
  templateUrl: './formulario-edit-plato.component.html',
  styleUrls: ['./formulario-edit-plato.component.scss']
})
export class FormularioEditPlatoComponent implements OnInit {

  @ViewChild('imagenInputFile', {static: false}) imagenFile: ElementRef;

  private idPlato: string;
  private platoUpdate: any = {};
  private foodCategory: string;

  private imagenPath: string;
  imagenMin: File;
  imagen : File = null;

  categorias: Array<CategoriaI>;
  plato: any;

  formularioPlatos = new FormGroup({
    nombre: new FormControl('', Validators.required),
    categoria: new FormControl(''),
    descripcion: new FormControl('', Validators.required),
    costo: new FormControl('', Validators.required)
  });

  constructor(private fbstore: AngularFirestore, private activatedRoute: ActivatedRoute,
              private platoService: ComidaService, private storage: AngularFireStorage,
              private router: Router) { }

  async ngOnInit(){
    await this.activatedRoute.paramMap.subscribe(params => this.idPlato = params.get('idPlato'));
    await this.getCategories();
    await this.platoService.getPlatoPorId(this.idPlato).then(
      (doc) => {
        this.plato = doc;
        this.foodCategory = doc.data().food_category;
      }
    );
  }

  editarPlato() {
    if(this.formularioPlatos.valid){

      let categoria = this.formularioPlatos.get('categoria').value;

      if(categoria == '') {
        this.platoUpdate['food_category'] = this.foodCategory;
        
      }else{
        this.platoUpdate['food_category'] = this.formularioPlatos.get('categoria').value;
      }
      this.platoUpdate['food_cost'] = this.formularioPlatos.get('costo').value;
      this.platoUpdate['food_description'] = this.formularioPlatos.get('descripcion').value;
      this.platoUpdate['food_name'] = this.formularioPlatos.get('nombre').value;
      this.platoUpdate['food_state'] = this.plato.data().food_state;
      this.platoUpdate['restaurantId'] = this.plato.data().restaurantId;
      if(this.imagen == null){
        this.platoUpdate['food_image'] = this.plato.data().food_image;
        this.platoService.editarPlatoPorId(this.idPlato, this.platoUpdate);
        alert("¡Plato actualizado correctamente!")
        this.router.navigate(['/tablero-cuenta']);
      }
      else{
        this.actualizarConImagen(this.platoUpdate, this.imagen);
      }
    }else{
      alert('¡Debe llenar todos los campos!');
    }
  }

  private actualizarConImagen(comida: any, imagen: File){
    this.imagenPath = `imagenes_comida/${imagen.name}`;
    const fileRef = this.storage.ref(this.imagenPath);
    const task = this.storage.upload(this.imagenPath, imagen);
    task.snapshotChanges().pipe(finalize(() => {
      fileRef.getDownloadURL().subscribe(urlImagen => {
        comida['food_image'] = urlImagen;
        this.platoService.editarPlatoPorId(this.idPlato, comida);
        alert("¡Plato actualizado correctamente!")
        this.router.navigate(['/tablero-cuenta']);
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


  onChange(e){
    this.imagen = e.target.files[0];
    this.imagen = e.target.files[0];
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.imagenMin = evento.target.result;
    };
    fr.readAsDataURL(this.imagen);
  }

}
