import { Injectable } from '@angular/core';
import { Usuario } from '../../core/models/usuario';
import { Juego } from '../../core/models/juego';
import { AutenticacionService } from './autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class ManejoListasService {

  public listas: Map<String, Juego[]> = new Map<string, Juego[]>(); //correo, lista de juegos

  //Devuelve los juegos que tenga un usuario si existe
  async verJuegosUsuario(correo: String): Promise<Juego[] | null> {
    const existe = await this.autenticacionService.correoExiste(correo);
    if (existe) {
      if (this.listas.has(correo)) {
        return this.listas.get(correo) || [];
      } else {
        this.listas.set(correo, []);
        return [];
      }
    } else {
      console.log("Correo no existe");
      return null;
    }
  }

  //Agrega un nuevo juego al usuario
  async agregarJuegoUsuario(correo: String, juego: Juego) {
    const existe = await this.autenticacionService.correoExiste(correo);
    if (existe) {
      if (this.listas.has(correo)) {
        if(this.listas.get(correo)?.length == 0) {
          this.listas.set(correo, [juego]);
        } else {
          this.listas.get(correo)?.push(juego);
        }
      } else {
        this.listas.set(correo, [juego]);
      }
    } else {
      console.log("Correo no existe");
    }
  }

  //Elimina el juego en el indice especificado al usuario
  async eliminarJuegoUsuario(correo: String, id: number) {
    const existe = await this.autenticacionService.correoExiste(correo);
    if (existe) {
      if (this.listas.has(correo)) {
        if(this.listas.get(correo)?.length == 0) {
          this.listas.set(correo, []);
        } else {
            this.listas.get(correo)?.splice(id, 1);
        }
      } else {
        this.listas.set(correo, []);
      }
    } else {
      console.log("Correo no existe");
    }
  }

  //Edita/alterna si x juego de ese usuario es su favorito
  /*async alternarFavoritoJuegoUsuario(correo: String, id: number) {
    const existe = await this.autenticacionService.correoExiste(correo);
    if (existe) {
      if (this.listas.has(correo)) {
        if(this.listas.get(correo)?.length == 0) {
          this.listas.set(correo, []);
        } else {
            this.listas.get(correo)?.splice(id, 1);
        }
      } else {
        this.listas.set(correo, []);
      }
    } else {
      console.log("Correo no existe");
    }
  }*/


  constructor(private autenticacionService: AutenticacionService) { }
}
