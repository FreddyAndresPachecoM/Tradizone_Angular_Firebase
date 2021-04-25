import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  //public existeRestaurante: boolean = false;
  existeRestaurante$ = new EventEmitter<boolean>();

  constructor() { }
}
