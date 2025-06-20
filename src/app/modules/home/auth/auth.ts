// auth.component.ts
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class authComponent {
  private fb = new FormBuilder();
  
  // Signals para el estado del componente
  isLoginMode = signal(true);
  showPassword = signal(false);
  isLoading = signal(false);
  
  authForm: FormGroup;

  constructor() {
    this.authForm = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: ['', []],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', []],
      acceptTerms: [false, []]
    });
  }

  toggleMode(): void {
    this.isLoginMode.set(!this.isLoginMode());
    this.updateFormValidators();
  }

  private updateFormValidators(): void {
    const nameControl = this.authForm.get('name');
    const confirmPasswordControl = this.authForm.get('confirmPassword');
    const acceptTermsControl = this.authForm.get('acceptTerms');

    if (this.isLoginMode()) {
      // Modo login: remover validadores de registro
      nameControl?.clearValidators();
      confirmPasswordControl?.clearValidators();
      acceptTermsControl?.clearValidators();
    } else {
      // Modo registro: agregar validadores
      nameControl?.setValidators([Validators.required, Validators.minLength(2)]);
      confirmPasswordControl?.setValidators([Validators.required, this.passwordMatchValidator.bind(this)]);
      acceptTermsControl?.setValidators([Validators.requiredTrue]);
    }

    // Actualizar validación
    nameControl?.updateValueAndValidity();
    confirmPasswordControl?.updateValueAndValidity();
    acceptTermsControl?.updateValueAndValidity();
  }

  private passwordMatchValidator(control: any) {
    const password = this.authForm?.get('password')?.value;
    const confirmPassword = control.value;
    
    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  togglePassword(): void {
    this.showPassword.set(!this.showPassword());
  }

  onSubmit(): void {
    if (this.authForm.valid) {
      this.isLoading.set(true);
      
      
      setTimeout(() => {
        const formData = this.authForm.value;
        
        if (this.isLoginMode()) {
          //Comprobar en api
        } else {
          //Registrar en la api
        }
        
        this.isLoading.set(false);
      }, 2000);
    } else {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.authForm.controls).forEach(key => {
        this.authForm.get(key)?.markAsTouched();
      });
    }
  }
}