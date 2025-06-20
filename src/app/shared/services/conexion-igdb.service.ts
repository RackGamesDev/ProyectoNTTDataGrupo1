import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Juego } from '../../core/models/juego';



@Injectable({
  providedIn: 'root'
})
export class ConexionIgdbService {
  private readonly API_CLIENTID = environment.igdbClientId;
  private readonly API_SECRET = environment.igdbClientSecret;
  private readonly API_TOKEN = environment.igdbToken;
  private readonly API_URL_JUEGOS = environment.igdbJuegosUrl;

  async buscarNombre(nombre: String): Promise<Juego[]> {
    const body = 'fields id,cover.image_id,name,release_dates,summary,url; search "' + nombre + '";';
    return this.buscar(body);
  }
  async buscarId(id: number): Promise<Juego[]> {
    const body = 'fields id,cover.image_id,name,release_dates,summary,url; where id = ' + id + ';';
    return this.buscar(body);
  }

  async buscar(body: any): Promise<Juego[]> {
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

  constructor() { }
}
