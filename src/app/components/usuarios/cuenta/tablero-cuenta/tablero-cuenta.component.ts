import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ComidaService } from 'src/app/service/comida.service';
import { EventoService } from 'src/app/service/evento.service';
import { HistoriaService } from 'src/app/service/historia.service';
import { RestauranteService } from 'src/app/service/restaurante.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-tablero-cuenta',
  templateUrl: './tablero-cuenta.component.html',
  styleUrls: ['./tablero-cuenta.component.scss']
})
export class TableroCuentaComponent implements OnInit {

  restaurante: any;
  listaPlatos = new  Array<any>();
  listaEventos = new Array<any>();
  listaHistorias= new Array<any>();

  platoEdit: any = {};
  eventoEdit: any = {};
  historiaEdit: any = {};

  constructor(private restaurantesService: RestauranteService, private authService: AuthService, private usuarioService: UsuarioService,
              private router: Router, private platoService: ComidaService, private eventoService: EventoService,
              private historiaService:HistoriaService) { 

                router.events.subscribe( event => {

                  if (event instanceof NavigationEnd){
                    if (event.url === '/blank'){
                      this.router.navigate(['/tablero-cuenta']);
                    }
                  }
                }

                )

              }


  async ngOnInit(){
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

  agregarDatos(tipo: number): void {
    if(tipo == 1)
      this.router.navigate([`/plato-registro/${this.restaurante.id}`]);
    else if(tipo == 2)
      this.authService.getUsuarioLogeado().then(
        data => this.router.navigate([`/evento-registro/${data.uid}`])
      );
    else if(tipo == 3)
      this.authService.getUsuarioLogeado().then(
        data => this.router.navigate([`/historia-registro/${data.uid}`])
      );
  }

  editarDatos(idData: string, tipo: number): void {
    if(tipo == 1)
      this.router.navigate([`/plato-edit/${idData}`]);
    else if(tipo == 2)
      this.router.navigate([`/evento-edit/${idData}`]);
    else if(tipo == 3)
      this.router.navigate([`/historia-edit/${idData}`]);
  }

  eliminarDatos(objeto: any , tipo: number): void {
    if(tipo == 1){
      this.platoEdit['food_category']=objeto.data().food_category;
      this.platoEdit['food_cost']=objeto.data().food_cost;
      this.platoEdit['food_description']=objeto.data().food_description;
      this.platoEdit['food_image']=objeto.data().food_image;
      this.platoEdit['food_name']=objeto.data().food_name;
      this.platoEdit['food_state']=false;

      this.platoEdit['restaurantId']=objeto.data().restaurantId;

      this.platoService.editarPlatoPorId(objeto.id, this.platoEdit);
    }else if(tipo == 2){
      this.eventoEdit['event_date']=objeto.data().event_date;
      this.eventoEdit['event_date_create']=objeto.data().event_date_create;
      this.eventoEdit['event_description']=objeto.data().event_description;
      this.eventoEdit['event_location']=objeto.data().event_location;
      this.eventoEdit['event_title']=objeto.data().event_title;
      this.eventoEdit['event_url_image']=objeto.data().event_url_image;
      this.eventoEdit['event_state']=false;

      this.eventoEdit['idUsuario']=objeto.data().idUsuario;

      this.eventoService.editarEventoPorId(objeto.id, this.eventoEdit);
    }else if(tipo == 3){
      this.historiaEdit['history_description']=objeto.data().history_description;
      this.historiaEdit['history_title']=objeto.data().history_title;
      this.historiaEdit['history_url_image']=objeto.data().history_url_image;
      this.historiaEdit['history_state']=false;

      this.historiaEdit['idUsuario']=objeto.data().idUsuario;

      this.historiaService.actualizarHistoriaPorId(objeto.id, this.historiaEdit);
    }

    this.router.navigate(['blank']);
    
  }

}
