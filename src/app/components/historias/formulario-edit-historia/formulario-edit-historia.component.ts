import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { HistoriaService } from 'src/app/service/historia.service';

@Component({
  selector: 'app-formulario-edit-historia',
  templateUrl: './formulario-edit-historia.component.html',
  styleUrls: ['./formulario-edit-historia.component.scss']
})
export class FormularioEditHistoriaComponent implements OnInit {

  @ViewChild('imagenInputFile', {static: false}) imagenFile: ElementRef;

  private idHistoria: string;
  private HistoriaUpdate: any = {};

  private imagenPath: string;
  imagenMin: File;
  imagen : File = null;

  historia: any;

  formularioHistorias = new FormGroup({
    titulo: new FormControl('',Validators.required),
    descripcion: new FormControl('', Validators.required),
  });

  constructor(private fbstore: AngularFirestore, private activatedRoute: ActivatedRoute,
              private historiaService: HistoriaService, private storage: AngularFireStorage,
              private router: Router) { }

  async ngOnInit() {
    await this.activatedRoute.paramMap.subscribe(params => this.idHistoria = params.get('idHistoria'));
    await this.historiaService.getHistoriaPorId(this.idHistoria).then(
      (doc) => this.historia = doc
    );
  }

  editarHistoria() {
    if(this.formularioHistorias.valid){

      this.HistoriaUpdate['history_description'] = this.formularioHistorias.get('descripcion').value;
      this.HistoriaUpdate['history_title'] = this.formularioHistorias.get('titulo').value;
      this.HistoriaUpdate['history_state'] = this.historia.data().history_state;
      this.HistoriaUpdate['idUsuario'] = this.historia.data().idUsuario;

      if(this.imagen == null){
        this.HistoriaUpdate['history_url_image'] = this.historia.data().history_url_image;
        this.historiaService.actualizarHistoriaPorId(this.idHistoria, this.HistoriaUpdate);
        alert("¡Histroia actualizada correctamente!")
        this.router.navigate(['/tablero-cuenta']);
      }
      else{
        this.actualizarConImagen(this.HistoriaUpdate, this.imagen);
      }
    }else{
      alert('¡Debe llenar todos los campos!');
    }
  }

  private actualizarConImagen(historia: any, imagen: File){
    this.imagenPath = `imagenes_historias/${imagen.name}`;
    const fileRef = this.storage.ref(this.imagenPath);
    const task = this.storage.upload(this.imagenPath, imagen);
    task.snapshotChanges().pipe(finalize(() => {
      fileRef.getDownloadURL().subscribe(urlImagen => {
        historia['history_url_image'] = urlImagen;
        this.historiaService.actualizarHistoriaPorId(this.idHistoria, historia);
        alert("¡Histroia actualizada correctamente!")
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
