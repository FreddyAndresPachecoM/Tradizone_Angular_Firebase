import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario2'
import { UsuarioService } from 'src/app/servicio/usuario.service'

@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registro-usuarios.component.html',
  styleUrls: ['./registro-usuarios.component.scss']
})
export class RegistroUsuariosComponent implements OnInit {

  createUserForm: FormGroup;
  user: Usuario;

  constructor(private fbstore: AngularFirestore, private router:Router, private userService: UsuarioService) { 
    this.createUserForm = this.createFormGroup(); 
  }

  ngOnInit(): void {
  }

  createFormGroup(): FormGroup{
    return new FormGroup({
      name: new FormControl('',Validators.required),
      email: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required)
    });
  }

  resetFormulario(){
    this.createUserForm.reset();
  }

  agregarEditarUsuario(){
    this.user= new Usuario;
    this.user.name = this.createUserForm.get("name").value;
    this.user.email = this.createUserForm.get("email").value;
    this.user.password = this.createUserForm.get("password").value;
    
    this.userService.agregarUsuario(this.user).then(() =>{
      console.log("El usuario fue egistrado")
    }).catch(error => {
      console.log(error)
    });
  }

  get nombre(){return this.createUserForm.get('name')};
  get email(){return this.createUserForm.get('email')};
  get password(){return this.createUserForm.get('password')};
}
