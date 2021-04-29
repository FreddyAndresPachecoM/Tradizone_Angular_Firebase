import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-form-edit-usuarios',
  templateUrl: './form-edit-usuarios.component.html',
  styleUrls: ['./form-edit-usuarios.component.scss']
})
export class FormEditUsuariosComponent implements OnInit {

  private idUsuario: string;
  private usuarioUpdate: any = {};
  
  usuario: any;
  
  formularioUsuario = new FormGroup({
    nombre: new FormControl('', Validators.required),
    correo: new FormControl('', Validators.required),
    contrasena: new FormControl('', Validators.required)
  })
  
  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private usuarioService: UsuarioService, private authService: AuthService) { }

  actualizarUsuario(){
    if (this.formularioUsuario.valid){
      this.usuarioUpdate['uid'] = this.usuario.data().idUsuario;
      this.usuarioUpdate['email'] = this.formularioUsuario.get('correo').value;
      this.usuarioUpdate['displayName'] = this.formularioUsuario.get('nombre').value;
      this.usuarioUpdate['password'] = this.formularioUsuario.get('contrasena').value;
      
      this.usuarioService.editarUsuario(this.idUsuario, this.usuarioUpdate);
      alert("Usuario actualizado!");
      this.router.navigate(['/configuracion-cuenta']);

    }else{
      alert("¡Debe llenar todos los campos!");
    }
  }

  async ngOnInit() {
    await this.activatedRoute.paramMap.subscribe(params => this.idUsuario = params.get('idUsuario'));
    await (await this.usuarioService.getUsuarioPorId(this.idUsuario).get().
    then((querySnapshot) => querySnapshot.forEach(
      (doc) => {
        this.usuario = doc;
      }
    ))
    );
  }

}
