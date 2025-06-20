import { Component } from '@angular/core';
import { ConexionIgdbService } from '../../services/conexion-igdb.service';
import { Juego } from '../../../core/models/juego';
import { AutenticacionService } from '../../services/autenticacion.service';
import { Usuario } from '../../../core/models/usuario';

@Component({
  selector: 'app-pruebas',
  imports: [],
  templateUrl: './pruebas.component.html',
  styleUrl: './pruebas.component.css'
})
export class PruebasComponent {
  constructor(private conexionIgdbService:ConexionIgdbService, private autenticacionService:AutenticacionService) {}
  ngOnInit() {
    this.prueba();
  }
  prueba(){
    this.autenticacionService.crearUsuario("pruebas4@gmail.com", "prueba4").then(() => {console.log("YAYAYAYAYAY");});
    /*this.autenticacionService.leerUsuarios().then((result: Usuario[]) => {
      result.forEach(e => {console.log(e.nombre)})
    });
    this.autenticacionService.correoExiste("Sabrinad89@gmail.com").then((resultado:boolean) => {
      if (resultado) {
        console.log("SI");
      } else {
        console.log("NO");
      }
    })*/
  }
}
