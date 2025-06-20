// auth.component.ts
import { Component, signal, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from '../../../shared/services/autenticacion.service';
import { OnInit } from '@angular/core';
import { SesionService } from '../../../shared/services/sesion.service';

@Component({
  selector: 'auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
  changeDetection: ChangeDetectionStrategy.OnPush // Añade esto
})
export class AuthComponent implements OnInit {
  private fb = new FormBuilder();
  
  // Signals para el estado del componente
  isLoginMode = signal(true);
  showPassword = signal(false);
  isLoading = signal(false);
  errorMessage = signal('');
  
  authForm: FormGroup;
  constructor(
    private cd: ChangeDetectorRef, 
    private router: Router, 
    private authService: AutenticacionService,
    private sesionService: SesionService
  ) { 
    this.authForm = this.createForm();
    this.updateFormValidators();
  } 

  ngOnInit(): void {
  this.authForm.get('email')?.valueChanges.subscribe(() => {
    if (this.errorMessage()) {
      this.errorMessage.set('');
      this.cd.detectChanges();
    }
  });
}

  private createForm(): FormGroup {
    return this.fb.group({
      name: ['', []],
      email: ['', [Validators.required, Validators.email]],
      acceptTerms: [false, []]
    });
  }

  toggleMode(): void {
    this.isLoginMode.set(!this.isLoginMode());
    this.updateFormValidators();
    this.cd.detectChanges(); // Añade esto para forzar la detección de cambios
  }

  private updateFormValidators(): void {
    const nameControl = this.authForm.get('name');
    const acceptTermsControl = this.authForm.get('acceptTerms');

    if (this.isLoginMode()) {
      // Modo login: remover validadores de registro
      nameControl?.clearValidators();
      acceptTermsControl?.clearValidators();
    } else {
      // Modo registro: agregar validadores
      nameControl?.setValidators([Validators.required, Validators.minLength(2)]);
      acceptTermsControl?.setValidators([Validators.requiredTrue]);
    }

    // Actualizar validación
    nameControl?.updateValueAndValidity();
    acceptTermsControl?.updateValueAndValidity();
  }


  onSubmit(): void {
    if (this.authForm.valid) {
      this.isLoading.set(true);

      setTimeout(() => {
        const formData = this.authForm.value;

        if (this.isLoginMode()) {
          const email = formData.email;

          this.authService.obtenerUsuarioPorCorreo(email).then(usuario => {
            if (usuario) {
              // Guardamos el nombre en memoria (sesionService)
              this.sesionService.setNombre(usuario.nombre);

              this.router.navigate(['/user-home']);
            } else {
              this.errorMessage.set('Correo no registrado');
              this.cd.detectChanges();
              setTimeout(() => {
                this.errorMessage.set('');
                this.cd.detectChanges();
              }, 3000);
            }

            this.isLoading.set(false);
          }).catch(error => {
            this.errorMessage.set('Error al conectar con la API');
            this.isLoading.set(false);
            this.cd.detectChanges();
          });
        } else {
          console.log('Registrando:', formData);
          this.isLoading.set(false);
        }
      }, 2000);
    } else {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.authForm.controls).forEach(key => {
        this.authForm.get(key)?.markAsTouched();
      });
    }
  }
}