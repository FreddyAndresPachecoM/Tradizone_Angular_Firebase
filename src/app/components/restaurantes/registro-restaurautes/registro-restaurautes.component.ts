import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RestauranteService } from 'src/app/service/restaurante.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/util/data.service';

@Component({
  selector: 'app-registro-restaurautes',
  templateUrl: './registro-restaurautes.component.html',
  styleUrls: ['./registro-restaurautes.component.scss']
})
export class RegistroRestaurautesComponent implements OnInit {

  private restaurante: any = {};

  private imagen : File = null;
  private imagenPath: string;

  formularioRegistro = new FormGroup({
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    zona: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthService, private storage: AngularFireStorage, 
              private restauranteService: RestauranteService, private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
  }

  onChange(e){
    this.imagen = e.target.files[0];
  }


  registrarRestaurante(){
    const {nombre, descripcion, direccion, telefono, zona} = this.formularioRegistro.value;
    if(this.imagen != null && this.formularioRegistro.valid){
      const usuarioLogueado = this.authService.getUsuarioLogeado();
      usuarioLogueado.then(
        data => {
          this.restaurante['user_id'] = data.uid;
          this.restaurante['restaurant_name'] = nombre;
          this.restaurante['restaurant_description'] = descripcion;
          this.restaurante['restaurant_location'] = direccion;
          this.restaurante['restaurant_phone'] = telefono;
          this.restaurante['restaurant_zone'] = zona;
          this.crearRestaurante(this.restaurante, this.imagen);
        },
        err => alert('¡A ocurrido un problema al obtener el usuario autenticado!')
      );
    }else alert('¡Debe llenar todos los campos!');
  }
  

  private crearRestaurante(restaurante: any, imagen: File){
    this.imagenPath = `logos_restaurantes/${imagen.name}`;
    const fileRef = this.storage.ref(this.imagenPath);
    const task = this.storage.upload(this.imagenPath, imagen);
    task.snapshotChanges().pipe(finalize(() => {
      fileRef.getDownloadURL().subscribe(urlImagen => {
        restaurante['restaurant_image'] = urlImagen;
        this.restauranteService.crearRestaurante(restaurante);
        
        alert("¡Restaurante registrado correctamente!");
        this.router.navigate(['/home']);
      }, 
      err => alert("ocurrio un error al intentar obtener la url de la imagen!"))
    })).subscribe();
  }
}
