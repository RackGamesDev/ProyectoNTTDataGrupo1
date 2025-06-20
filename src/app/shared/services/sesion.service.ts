import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SesionService {
  private nombreUsuarioSignal = signal<string>(''); // Signal reactiva

  setNombre(nombre: string) {
    this.nombreUsuarioSignal.set(nombre);
  }

  getNombre(): string {
    return this.nombreUsuarioSignal();
  }

  limpiarSesion() {
    this.nombreUsuarioSignal.set('');
  }
}
