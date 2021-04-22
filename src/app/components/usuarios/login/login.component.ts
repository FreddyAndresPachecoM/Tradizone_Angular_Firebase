import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {
  }


  iniciarSesion(): void {
    //email: angel.lucero.est@tecazuay.edu.ec
    //contraseña: tradizone20@
    console.log('Form -->', this.formularioLogin.value); 
  }
}
