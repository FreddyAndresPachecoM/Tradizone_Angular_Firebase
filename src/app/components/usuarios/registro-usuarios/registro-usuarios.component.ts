import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioI } from 'src/app/model/usuario_i';
import { AuthService } from 'src/app/service/auth.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registro-usuarios.component.html',
  styleUrls: ['./registro-usuarios.component.scss']
})
export class RegistroUsuariosComponent implements OnInit {

  usuario: any = {};

  formularioRegistro = new FormGroup({
    nombre: new FormControl(''),
    correo: new FormControl(''),
    contrasena: new FormControl('')
  });

  constructor(private fbstore: AngularFirestore, private router:Router,
              private authService: AuthService, private usuarioService: UsuarioService) { 
  }

  ngOnInit(): void {
  }

  resetFormulario(){
    this.formularioRegistro.reset();
  }

  async registrarUsuario(){
    const {nombre, correo, contrasena} = this.formularioRegistro.value;
    
    try {
      const user = await this.authService.registrarUsuario(correo, contrasena);
      if(user){
        this.usuario['displayName'] = nombre;
        this.usuario['email'] = correo;
        this.usuario['emailVerified'] = true;
        this.usuarioService.crearUsuario(this.usuario);
        alert('¡Registrado correctamente!');
        this.router.navigate(['/home']);
      }
    } catch (error) {
      alert('¡Lo siento tenemos problemas :C!');
    }

  }
}
