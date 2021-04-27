import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { CategoriaI } from 'src/app/model/categoria_i';
import { AuthService } from 'src/app/service/auth.service';
import { EventoService } from 'src/app/service/evento.service';

@Component({
  selector: 'app-formulario-edit-evento',
  templateUrl: './formulario-edit-evento.component.html',
  styleUrls: ['./formulario-edit-evento.component.scss']
})
export class FormularioEditEventoComponent implements OnInit {

  @ViewChild('imagenInputFile', {static: false}) imagenFile: ElementRef;

  private idEvento: string;
  private eventoUpdate: any = {};

  private imagenPath: string;
  imagenMin: File;
  imagen : File = null;
  fechaHora: string[];

  evento: any;

  formularioEvento = new FormGroup({
    titulo: new FormControl('',Validators.required),
    descripcion: new FormControl('', Validators.required),
    lugar: new FormControl('', Validators.required),
    fecha: new FormControl('', Validators.required),
    hora: new FormControl('', Validators.required),
  });

  constructor(private fbstore: AngularFirestore, private activatedRoute: ActivatedRoute,
                      private eventoService: EventoService, private storage: AngularFireStorage,
                      private authService: AuthService, private router: Router) { }

  async ngOnInit() {
    await this.activatedRoute.paramMap.subscribe(params => this.idEvento = params.get('idEvento'));
    await this.eventoService.getEventoPorId(this.idEvento).then(
      (doc) => {
        this.evento = doc;
        let fecha = doc.data().event_date;
        this.fechaHora = fecha.split(' ');
      }
    );
  }

  editarEvento() {
    if(this.formularioEvento.valid){

      let fecha_actual = new Date();

      let fecha = this.formularioEvento.get('fecha').value;
      let hora = this.formularioEvento.get('hora').value;

      this.eventoUpdate['idUsuario'] = this.evento.data().idUsuario
      this.eventoUpdate['event_title'] = this.formularioEvento.get('titulo').value;
      this.eventoUpdate['event_description'] = this.formularioEvento.get('descripcion').value;
      this.eventoUpdate['event_location'] = this.formularioEvento.get('lugar').value;
      this.eventoUpdate['event_date'] = fecha +" "+ hora;
      this.eventoUpdate['event_date_create'] = this.authService.transformDate(fecha_actual);
      this.eventoUpdate['event_state'] = this.evento.data().event_state;

      if(this.imagen == null){
        this.eventoUpdate['event_url_image'] = this.evento.data().event_url_image;
        this.eventoService.editarEventoPorId(this.idEvento, this.eventoUpdate);
        alert("¡Evento actualizado correctamente!")
        this.router.navigate(['/tablero-cuenta']);
      }
      else{
        this.actualizarConImagen(this.eventoUpdate, this.imagen);
      }
    }else{
      alert('¡Debe llenar todos los campos!');
    }
  }

  private actualizarConImagen(evento: any, imagen: File){
    this.imagenPath = `imagenes_evento/${imagen.name}`;
    const fileRef = this.storage.ref(this.imagenPath);
    const task = this.storage.upload(this.imagenPath, imagen);
    task.snapshotChanges().pipe(finalize(() => {
      fileRef.getDownloadURL().subscribe(urlImagen => {
        evento['event_url_image'] = urlImagen;
        this.eventoService.editarEventoPorId(this.idEvento, evento);
        alert("¡Evento actualizado correctamente!")
        this.router.navigate(['/tablero-cuenta']);
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
