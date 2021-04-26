import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriaI } from 'src/app/model/categoria_i';

@Component({
  selector: 'app-formulario-edit-plato',
  templateUrl: './formulario-edit-plato.component.html',
  styleUrls: ['./formulario-edit-plato.component.scss']
})
export class FormularioEditPlatoComponent implements OnInit {

  private idPlato: string;

  categorias: Array<CategoriaI>;

  formularioPlatos = new FormGroup({
    nombre: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    costo: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required)
  });

  constructor(private fbstore: AngularFirestore, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => this.idPlato = params.get('idPlato'));
    this.getCategories();
  }

  editarPlato() {

  }


  onChange($event){

  }

  getCategories() {
    this.fbstore.collection("categories").snapshotChanges().subscribe(
      data => {
        this.categorias = data.map(
          result => {
            let categoria = new CategoriaI;
            categoria.category_id = result.payload.doc.id;
            categoria.category_name = result.payload.doc.data()["category_name"];
            categoria.category_image = result.payload.doc.data()["category_image"]
            return categoria; 
          }
        );
      }
    );
  }

}
