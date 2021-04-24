import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RestauranteService } from 'src/app/service/restaurante.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-restaurautes',
  templateUrl: './registro-restaurautes.component.html',
  styleUrls: ['./registro-restaurautes.component.scss']
})
export class RegistroRestaurautesComponent implements OnInit {

  restaurante: any = {};

  imagen : File = null;

  //urlImagen: Observable<string>;

  formularioRegistro = new FormGroup({
    nombre: new FormControl(''),
    descripcion: new FormControl(''),
    direccion: new FormControl(''),
    telefono: new FormControl(''),
    zona: new FormControl('')
  });

  constructor(private authService: AuthService, private storage: AngularFireStorage, 
              private restauranteService: RestauranteService, private router: Router) { }

  ngOnInit(): void {
  }

  onChange(e){
    this.imagen = e.target.files[0];
  }

  async subirImagen(){
      const id = Math.random().toString(36).substring(2);//id unico para esta imagen.
      const filePath = `logos_restaurante/logo_${id}`;
      const ref = this.storage.ref(filePath);
      return this.storage.upload(filePath, this.imagen);
      //const task = this.storage.upload(filePath, this.imagen);
      //await task.snapshotChanges().pipe(finalize(() => this.urlImagen = ref.getDownloadURL())).subscribe();
  }

  async registrarRestaurante() {
    this.subirImagen().then(
      data => console.log(data),
      err => console.log('error al subir la imagen')
    );
    
    /*const {nombre, descripcion, direccion, telefono, zona, urlLogo} = this.formularioRegistro.value;
    const usuarioLogueado = this.authService.getUsuarioLogeado();*/

   /* usuarioLogueado.then(
      data => {
        this.restaurante['user_id'] = data.uid;
      }
    );

    this.restaurante['restaurant_name'] = nombre;
    this.restaurante['restaurant_description'] = descripcion;
    this.restaurante['restaurant_location'] = direccion;
    this.restaurante['restaurant_phone'] = telefono;
    this.restaurante['restaurant_zone'] = zona;
    this.subirImagen();
    if(this.urlImagen){
      this.restaurante['restaurant_image'] = this.urlImagen;
      this.restauranteService.crearRestaurante(this.restaurante);
      alert('¡Restaurante registrado con exito!');
      this.router.navigate(['/home']);
    }*/

  }



}
