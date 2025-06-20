import { Injectable } from '@angular/core';
import { Usuario } from '../../core/models/usuario';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private readonly API_URL = environment.clientesUrl;
  private readonly API_NUMERO = environment.clientesApiGrupo;

  //Crea un usuario en la API en base a un nombre y un correo no repetido y válido
  async crearUsuario(correo: string, nombre: string) {
    if (!nombre || nombre.trim() === "") {
      console.log("Falta el nombre");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correo || !emailRegex.test(correo)) {
      console.log("El correo no es válido");
      return;
    }

    
    this.correoExiste(correo).then(async existe => {
      if (!existe) {
        const respuesta = await fetch(this.API_URL, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Group-Id': this.API_NUMERO
          },
          body: JSON.stringify({
            name: nombre,
            contactEmail: correo,
            revenue: 1.00,
            startDate: new Date().toISOString().split('.')[0] + '.000Z'
          })
        });
        if (respuesta.ok) {
          console.log("BIEN");
        } else {
          console.log("MAL " + respuesta.status);
        }
      } else {
        console.log("Correo ya existente");
      }
    });
  }

  //Devuelve todos los usuarios de la API
  async leerUsuarios(): Promise<Usuario[]> {
    const respuesta = await fetch(this.API_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'text/plain',
        'X-Group-Id': this.API_NUMERO
      },
    });
    let usuarios: Usuario[] = []
    if (respuesta.ok) {
      const cuerpo = await respuesta.json();
      cuerpo.forEach((e: { id: number, name: string, contactEmail: string }) => {
        usuarios.push(new Usuario(e.id, e.name, e.contactEmail));
      });
    } else {
      console.log("ERROR");
    }
    return usuarios;
  }

  //Comprueba si el correo ya se encuentra en la API
  async correoExiste(correo: String): Promise<boolean> {
    const usuarios = await this.leerUsuarios();
    return usuarios.some(e => e.email === correo);
  }

  constructor() { }
}
