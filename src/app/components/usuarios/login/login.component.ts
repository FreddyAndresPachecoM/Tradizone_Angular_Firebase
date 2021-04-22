import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

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

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }


  async iniciarSesion() {
    const {correo, contrasena} = this.formularioLogin.value;
    try{
      const user = this.authService.iniciarSesion(correo, contrasena);
      if(user){
        this.router.navigate(['/home']);
      }
    }catch(error){

    }
  }
}
