import { Injectable, signal } from '@angular/core';
import { Usuario } from '../../core/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class SesionService {
  private usuarioSignal = signal<Usuario | null>(null);

  setUsuario(usuario: Usuario) {
    this.usuarioSignal.set(usuario);
  }

  getUsuario(): Usuario | null {
    return this.usuarioSignal();
  }

  limpiarSesion() {
    this.usuarioSignal.set(null);
  }
}
