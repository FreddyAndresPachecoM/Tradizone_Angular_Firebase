import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registro-usuarios.component.html',
  styleUrls: ['./registro-usuarios.component.scss']
})
export class RegistroUsuariosComponent implements OnInit {

  formularioRegistro = new FormGroup({
    correo: new FormControl(''),
    contrasena: new FormControl('')
  });

  constructor(private fbstore: AngularFirestore, private router:Router,
                      private authService: AuthService) { 
  }

  ngOnInit(): void {
  }

  resetFormulario(){
    this.formularioRegistro.reset();
  }

  async registrarUsuario(){
    const {correo, contrasena} = this.formularioRegistro.value;
    try {
      const user = await this.authService.registrarUsuario(correo, contrasena);
      if(user){
        this.router.navigate(['/home']);
      }
    } catch (error) {
      
    }
  }
}
