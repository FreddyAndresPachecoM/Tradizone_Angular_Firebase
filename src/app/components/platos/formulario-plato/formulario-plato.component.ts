import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CategoriaI } from 'src/app/model/categoria_i';

@Component({
  selector: 'app-formulario-plato',
  templateUrl: './formulario-plato.component.html',
  styleUrls: ['./formulario-plato.component.scss']
})
export class FormularioPlatoComponent implements OnInit {

  platoForm: FormGroup;
  categorias: Array<CategoriaI>;
  

  constructor() { }

  ngOnInit(): void {
  }

  crearPlato(){

  }
}
