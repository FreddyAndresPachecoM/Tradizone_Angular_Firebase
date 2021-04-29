import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';
import { RestauranteService } from 'src/app/service/restaurante.service';

@Component({
  selector: 'app-form-edit-restaurantes',
  templateUrl: './form-edit-restaurantes.component.html',
  styleUrls: ['./form-edit-restaurantes.component.scss']
})
export class FormEditRestaurantesComponent implements OnInit {

  @ViewChild('imagenInputFile', {static: false}) imagenFile: ElementRef;

  private idRestaurante: string;
  private restauranteUpdate: any = {};
  
  private imagenPath: string;
  imagenMin: File;
  imagen: File= null;

  restaurante: any;

  formularioRestaurante = new FormGroup({
    nombre: new FormControl('',Validators.required),
    descripcion: new FormControl('',Validators.required),
    direccion: new FormControl('',Validators.required),
    telefono: new FormControl('',Validators.required),
    zona: new FormControl('',Validators.required)
  })

  constructor(private fbstore: AngularFirestore, private activatedRoute: ActivatedRoute, 
              private restauranteService: RestauranteService, private storage: AngularFireStorage,
              private router: Router, private authService: AuthService) { }

  async ngOnInit() {
    
    await this.activatedRoute.paramMap.subscribe(params => this.idRestaurante = params.get('idRestaurante'));

    await this.restauranteService.getRestauranteById(this.idRestaurante).
      then(
        (doc) => {
          this.restaurante = doc;
          
        }
      
    ); 
  }

  actualizarRestaurante(){
    if (this.formularioRestaurante.valid){
      this.restauranteUpdate['restaurant_description'] = this.formularioRestaurante.get('descripcion').value;
      this.restauranteUpdate['restaurant_location'] = this.formularioRestaurante.get('direccion').value;
      this.restauranteUpdate['restaurant_name'] = this.formularioRestaurante.get('nombre').value;
      this.restauranteUpdate['restaurant_phone'] = this.formularioRestaurante.get('telefono').value;
      this.restauranteUpdate['restaurant_zone'] = this.formularioRestaurante.get('zona').value;
      this.restauranteUpdate['user_id'] = this.restaurante.data().user_id;
      
      if(this.imagen==null){
        this.restauranteUpdate['restaurant_image'] = this.restaurante.data().restaurant_image;
        this.restauranteService.editarRestaurantePorId(this.idRestaurante, this.restauranteUpdate);
        alert("Restaurante actualizado correctamente!");
        this.router.navigate(['/configuracion-cuenta']);
      }else{
        this.actualizarConImagen(this.restauranteUpdate, this.imagen);
      }
    }else{
      alert('¡Debe llenar todos los campos!');
    }
  }

  private actualizarConImagen(restaurante: any, imagen: File){
    this.imagenPath = `logos_restaurates/${imagen.name}`;
    const fileRef = this.storage.ref(this.imagenPath);
    const task = this.storage.upload(this.imagenPath, imagen);
    task.snapshotChanges().pipe(finalize(() => {
      fileRef.getDownloadURL().subscribe(urlImagen => {
        restaurante['restaurant_image'] = urlImagen;
        this.restauranteService.editarRestaurantePorId(this.idRestaurante, restaurante);
        alert("¡Restaurante actualizado correctamente!")
        this.router.navigate(['/configuracion-cuenta']);
      }, 
      err => alert("ocurrio un error al intentar obtener la url de la imagen!"))
    })).subscribe();
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
