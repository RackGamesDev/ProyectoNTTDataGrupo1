import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import { HttpClient } from '@angular/common/http';

import { Juego } from '../../core/models/juego';



@Injectable({
  providedIn: 'root'
})
export class ConexionIgdbService {
  private readonly API_CLIENTID = environment.igdbClientId;
  private readonly API_SECRET = environment.igdbClientSecret;
  private readonly API_TOKEN = environment.igdbToken;


  constructor(private httpClient:HttpClient) { }
  private readonly API_URL_JUEGOS = environment.igdbJuegosUrl;

  //Busca todos los juegos que coincidan con un nombre
  async buscarNombre(nombre: String): Promise<Juego[]> {
    if (!nombre) {
      console.log("Falta el nombre");
      return [];
    }
    const body = 'fields id,cover.image_id,name,release_dates,summary,url; search "' + nombre + '";';
    return this.buscar(body);
  }

  //Busca un juego con ese id
  async buscarId(id: number): Promise<Juego[]> {
    if (!id) {
      console.log("Falta el id");
      return [];
    }
    const body = 'fields id,cover.image_id,name,release_dates,summary,url; where id = ' + id + ';';
    return this.buscar(body);
  }

  //Funcion interna para buscar en la API
  private async buscar(body: any): Promise<Juego[]> {
    const respuesta = await fetch(this.API_URL_JUEGOS, {
      method: 'POST',
      headers: {
        'Client-ID': this.API_CLIENTID,
        'Authorization': "Bearer " + this.API_TOKEN,
        'Accept': 'application/json',
        'Content-Type': 'text/plain'
      }, body
    });
    const juegos: Juego[] = [];
    if (respuesta.ok) {
      const cuerpo = await respuesta.json();
      cuerpo.forEach((e: { id: number; name: string; release_dates: number[]; summary: string; url: string; cover: string; }) => {

        juegos.push(new Juego(e.id, e.name, e.release_dates?.[0], e.summary, e.url, "https://images.igdb.com/igdb/image/upload/t_cover_big" + e.cover + ".jpg"));
      });
    } else {
      console.log("ERROR");
    }
    return juegos;
  }

}
