import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ComidaService } from 'src/app/service/comida.service';
import { EventoService } from 'src/app/service/evento.service';
import { HistoriaService } from 'src/app/service/historia.service';
import { RestauranteService } from 'src/app/service/restaurante.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-configuracion-cuenta',
  templateUrl: './configuracion-cuenta.component.html',
  styleUrls: ['./configuracion-cuenta.component.scss']
})
export class ConfiguracionCuentaComponent implements OnInit {

  restaurante: any;
  usuario: any;
  listaPlatos = new  Array<any>();
  listaEventos = new Array<any>();
  listaHistorias= new Array<any>();

  constructor(private restaurantesService: RestauranteService, private authService: AuthService, private usuarioService: UsuarioService,
              private router:Router, private platoService:ComidaService, private eventoService: EventoService,
              private historiaService:HistoriaService) { 

                router.events.subscribe( event => {

                  if (event instanceof NavigationEnd){
                    if (event.url === '/blank'){
                      this.router.navigate(['/configuracion-cuenta']);
                    }
                  }
                }
                )
              }



  async ngOnInit(){
    await this.authService.getUsuarioLogeado().then(
      data => this.usuarioService.getUsuarioPorId(data.uid).get().
      then((querySnapshot) => querySnapshot.forEach(
        (doc) => {
          this.usuario = doc;
        }
      ))
       
    );

    await this.authService.getUsuarioLogeado().then(
      data => this.restaurantesService.getRestaurantePorUsuario(data.uid).get().
      then((querySnapshot) => querySnapshot.forEach(
          (doc) => {
            this.restaurante = doc;
            this.platoService.getAllPlatosPorRestaurante(doc.id).get().then(
              (querySnapshot) => querySnapshot.forEach(
                (doc) => this.listaPlatos.push(doc)
              )
            );
            this.eventoService.getAllEventoPorUsuario(doc.data().user_id).get().then(
              (querySnapshot) => querySnapshot.forEach(
                (doc) => this.listaEventos.push(doc)
              )
            );
            this.historiaService.getAllHistoriasPorUsuario(doc.data().user_id).get().then(
              (querySnapshot) => querySnapshot.forEach(
                (doc) => this.listaHistorias.push(doc)
              )
            );
          } 
      )));
  }

  editarUsuario(idData: string){
    this.router.navigate([`/usuario-edit/${idData}`]);
  }

  editarRestaurante(idData: string){
    this.router.navigate([`/restaurante-edit/${idData}`]);
  }


  editarDatos(idData: string, tipo: number): void {
    if(tipo == 1)
      this.router.navigate([`/plato-edit/${idData}`]);
    else if(tipo == 2)
      this.router.navigate([`/evento-edit/${idData}`]);
    else if(tipo == 3)
      this.router.navigate([`/historia-edit/${idData}`]);
  }

  eliminarDatos(objeto, tipo: number): void {
    if(tipo == 1){
      this.platoService.deleteComida(objeto);
    }else if(tipo == 2){
      this.eventoService.deleteEvento(objeto);
    }else if(tipo == 3){
      this.historiaService.deleteHistoria(objeto);
    }

    this.router.navigate(['blank']);
    
  }

}
