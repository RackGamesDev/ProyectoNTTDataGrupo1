import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SesionService } from '../../../../shared/services/sesion.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
  imports: [CommonModule, FormsModule]
})
export class UserHomeComponent {
  constructor(private router: Router, private sesionService: SesionService) {}

  nombreUsuario = '';

  ngOnInit(): void {
    this.nombreUsuario = this.sesionService.getNombre();
  }
  
  cerrarSesion(): void {
    this.sesionService.limpiarSesion();
    this.router.navigate(['/']);
  }
}