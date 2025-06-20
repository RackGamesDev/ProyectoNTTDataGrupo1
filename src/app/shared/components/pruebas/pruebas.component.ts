import { Component } from '@angular/core';
import { ConexionIgdbService } from '../../services/conexion-igdb.service';
import { Juego } from '../../../core/models/juego';

@Component({
  selector: 'app-pruebas',
  imports: [],
  templateUrl: './pruebas.component.html',
  styleUrl: './pruebas.component.css'
})
export class PruebasComponent {
  constructor(private conexionIgdbService:ConexionIgdbService) {}
  ngOnInit() {
    this.prueba();
  }
  prueba(){
    this.conexionIgdbService.buscarId(11452).then((result: Juego[]) => {
      result.forEach(e => {console.log(e.nombre)})
    });
  }
}
