import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { RestauranteService } from 'src/app/service/restaurante.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-tablero-cuenta',
  templateUrl: './tablero-cuenta.component.html',
  styleUrls: ['./tablero-cuenta.component.scss']
})
export class TableroCuentaComponent implements OnInit {

  restaurante: any;

  constructor(private restaurantesService: RestauranteService, private authService: AuthService, private usuarioService: UsuarioService,
              private router: Router) { }


  async ngOnInit(){
    await this.authService.getUsuarioLogeado().then(
      data => {
        this.usuarioService.getUsuarioPorId(data.uid).get().then((querySnapshot) => querySnapshot.forEach(
          (doc) => this.restaurantesService.getRestaurantePorUsuario(doc.data().uid).get().then(
            (querySnapshot) => querySnapshot.forEach(
              (doc) => {
                this.restaurante = doc;
              }
            ))
        ));
      }
    );
  }


  agragarPlato(){
    this.router.navigate([`/plato-registro/${this.restaurante.id}`]);
  }

}
