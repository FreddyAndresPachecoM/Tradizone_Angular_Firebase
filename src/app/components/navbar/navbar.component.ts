import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent{

  /** ------- Actualiza el navbar cada que el AuthService sufre un cambio ------- */
  public user$: Observable<any> = this.authService.afAuth.user;

  constructor(private authService: AuthService, private router: Router) { 
  }

  async cerrarSesion(){
    try{
      await this.authService.cerrarSesion();
      this.router.navigate(['/home']);
    }catch(error){
        
    }
  }

}
