import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';
import { HistoriaService } from 'src/app/service/historia.service';

@Component({
  selector: 'app-formulario-historias',
  templateUrl: './formulario-historias.component.html',
  styleUrls: ['./formulario-historias.component.scss']
})
export class FormularioHistoriasComponent implements OnInit {

  private historia: any = {};

  private imagen: File = null;
  private imagenPath: string;
  private idUsuario: string;

  formularioHistorias = new FormGroup({
    titulo: new FormControl('',Validators.required),
    descripcion: new FormControl('', Validators.required),
  });

  constructor(private historiaService: HistoriaService , private storage: AngularFireStorage,
              private authService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => this.idUsuario = params.get('idUsuario'));
  }

  registrarHistoria(){
    const{titulo, descripcion} = this.formularioHistorias.value;
    if(this.imagen != null && this.formularioHistorias.valid){
      const usuarioLoguedo = this.authService.getUsuarioLogeado();
      usuarioLoguedo.then(
        data => {
          this.historia['idUsuario'] = this.idUsuario;
          this.historia['history_title'] = titulo;
          this.historia['history_description'] = descripcion;
          this.historia['history_state'] = true;
          this.crearHistoria(this.historia, this.imagen);
        },err => alert('problema al obtener el usuario autenticado')
      );
    }else alert('Debe llenar todos los campos!');
  }

  private crearHistoria(historia: any, imagen: File){
    this.imagenPath = `imagenes_historias/${imagen.name}`;
    const fileRef = this.storage.ref(this.imagenPath);
    const task = this.storage.upload(this.imagenPath, imagen);
    task.snapshotChanges().pipe(finalize(() => {
      fileRef.getDownloadURL().subscribe(urlImagen => {
        historia['history_url_image'] = urlImagen;
        this.historiaService.crearHistoria(historia);
        alert("¡Historia registrado correctamente!")
        this.formularioHistorias.reset();
      }, 
      err => alert("ocurrio un error al intentar obtener la url de la imagen!"))
    })).subscribe();
  }

  onChange(e){
    this.imagen = e.target.files[0];
  }

}
