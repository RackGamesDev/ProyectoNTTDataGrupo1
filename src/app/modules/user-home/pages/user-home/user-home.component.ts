import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SesionService } from '../../../../shared/services/sesion.service';
import { Usuario } from '../../../../core/models/usuario';
import { AutenticacionService } from '../../../../shared/services/autenticacion.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
  imports: [CommonModule, FormsModule]
})
export class UserHomeComponent {
  constructor(private router: Router, private sesionService: SesionService, private authService: AutenticacionService) {}
  usuario: Usuario | null = null;
  usuarioEditable: Usuario | null = null;
  modoEdicion = false;

  ngOnInit(): void {
    this.usuario = this.sesionService.getUsuario();
  }

  cerrarSesion(): void {
    this.sesionService.limpiarSesion();
    this.router.navigate(['/']);
  }

  guardarCambios() {
    if (!this.usuarioEditable || !this.usuario) return;

    const url = `${this.authService.getApiUrl()}/${this.usuario!.id}`;
    const grupo = this.authService.getApiGrupo();

    fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Group-Id': grupo
      },
      body: JSON.stringify({
        name: this.usuarioEditable!.nombre,
        contactEmail: this.usuarioEditable!.email,
        revenue: 1.0, // Valor por defecto
        startDate: new Date().toISOString().split('.')[0] + '.000Z' // O conserva el original
      })
    }).then(res => {
      if (res.ok) {
        // ✅ Aplicamos los cambios localmente
        this.usuario!.nombre = this.usuarioEditable!.nombre;
        this.usuario!.email = this.usuarioEditable!.email;

        this.sesionService.setUsuario(this.usuario!);
        this.modoEdicion = false;
      } else {
        alert('Error al actualizar los datos');
      }
    });
  }

  eliminarCuenta() {
    if (!this.usuario) return;

    if (!confirm('¿Estás seguro de que quieres eliminar tu cuenta?')) return;

    const url = `${this.authService.getApiUrl()}/${this.usuario.id}`;
    const grupo = this.authService.getApiGrupo();

    fetch(url, {
      method: 'DELETE',
      headers: {
        'X-Group-Id': grupo
      }
    }).then(res => {
      if (res.ok) {
        alert('Cuenta eliminada');
        this.sesionService.limpiarSesion();
        this.router.navigate(['/']);
      } else {
        alert('Error al eliminar la cuenta');
      }
    });
  }

  activarEdicion() {
    // Clonamos el usuario en memoria para que no afecte al original
    this.usuarioEditable = this.usuario
      ? new Usuario(this.usuario.id, this.usuario.nombre, this.usuario.email)
      : null;

    this.modoEdicion = true;
  }

  cancelarEdicion() {
    this.modoEdicion = false;
  }

}