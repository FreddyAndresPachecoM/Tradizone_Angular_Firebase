import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';
import { EventoService } from 'src/app/service/evento.service';

@Component({
  selector: 'app-formulario-eventos',
  templateUrl: './formulario-eventos.component.html',
  styleUrls: ['./formulario-eventos.component.scss']
})
export class FormularioEventosComponent implements OnInit {

  private evento: any = {};

  private imagen: File = null;
  private imagenPath: string;

  fecha: Date;

  eventoRegistroForm = new FormGroup({
    titulo: new FormControl('',Validators.required),
    descripcion: new FormControl('', Validators.required),
    lugar: new FormControl('', Validators.required),
    fecha: new FormControl('', Validators.required),
    hora: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required)
  });

  constructor(private eventoService: EventoService ,private fbstore: AngularFirestore, private storage: AngularFireStorage,
    private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  registrarEvento(){
    const{titulo, descripcion, lugar, fecha, hora} = this.eventoRegistroForm.value;
    if(this.imagen != null && this.eventoRegistroForm.valid){
      const usuarioLoguedo = this.authService.getUsuarioLogeado();
      usuarioLoguedo.then(
        data => {
          this.evento['event_title'] = titulo;
          this.evento['event_descrition'] = descripcion;
          this.evento['event_location'] = lugar;
          this.evento['event_date'] = fecha + hora;

        },err => alert('problema al obtener el usuario autenticado')
      );
    }else alert('Debe llenar todos los campos!');
  }

  private crearEvento(evento: any, imagen: File){
    this.imagenPath = `imagenes_evento/${imagen.name}`;
    const fileRef = this.storage.ref(this.imagenPath);
    const task = this.storage.upload(this.imagenPath, imagen);
    task.snapshotChanges().pipe(finalize(() => {
      fileRef.getDownloadURL().subscribe(urlImagen => {
        evento['food_image'] = urlImagen;
        this.eventoService.crearEvento(evento);
        alert("¡Comida registrado correctamente!")
        this.router.navigate(['/home']);
      }, 
      err => alert("ocurrio un error al intentar obtener la url de la imagen!"))
    })).subscribe();
  }

  onChange(e){
    this.imagen = e.target.files[0];
  }

}
