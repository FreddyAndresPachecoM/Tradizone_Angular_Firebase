import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-registro-restaurautes',
  templateUrl: './registro-restaurautes.component.html',
  styleUrls: ['./registro-restaurautes.component.scss']
})
export class RegistroRestaurautesComponent implements OnInit {

  restaurante: any = {};

  formularioRegistro = new FormGroup({
    nombre: new FormControl(''),
    descripcion: new FormControl(''),
    direccion: new FormControl(''),
    telefono: new FormControl(''),
    zona: new FormControl('')
  });

  constructor(private authService: AuthService, private storage: AngularFireStorage) { }

  ngOnInit(): void {
  }

  subirImagen(e){
    //console.log('Subir --> ',e);
    const id = Math.random().toString(36).substring(2);//id unico para esta imagen.
    const file = e.target.files[0];
    const filePath = 'upload/imagen.png';
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
  }


  registrarRestaurante() {
    const {nombre, descripcion, direccion, telefono, zona} = this.formularioRegistro.value;
    const usuarioLogueado = this.authService.getUsuarioLogeado();
    usuarioLogueado.then(
      data => {
        this.restaurante['restaurant_name'] = nombre;
        this.restaurante['restaurant_description'] = descripcion;
        this.restaurante['restaurant_location'] = direccion;
        this.restaurante['restaurant_phone'] = telefono;
        this.restaurante['restaurant_zone'] = zona;
        this.restaurante['user_id'] = data.uid;
      }
    );
  }

  restaurant_image : string;
}
