import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { RestauranteService } from 'src/app/service/restaurante.service';
import { DataService } from 'src/app/util/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formularioLogin = new FormGroup({
    correo: new FormControl(''),
    contrasena: new FormControl('')
  });

  constructor(private authService: AuthService, private router: Router, 
              private restauranteService: RestauranteService, private dataService: DataService) { }

  

  ngOnInit(): void {
  }

  async iniciarSesion() {
    const {correo, contrasena} = this.formularioLogin.value;
    try{
      const user = this.authService.iniciarSesion(correo, contrasena);
      if(user){
        if((await user).user.email != null){
          this.restauranteService.getRestaurantePorUsuario((await user).user.uid).get().then(
            (querySnapshot) => querySnapshot.forEach(
              (doc) => this.dataService.existeRestaurante$.emit(true)
            )
          );
          this.router.navigate(['/home']);
        }
      }else{
        alert("Correo o contraseña mal ingresados! >:v");
      }
    }catch(error){

    }
  }
}
