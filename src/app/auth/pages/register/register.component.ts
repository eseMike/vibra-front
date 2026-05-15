import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.registerForm = this.fb.group({
      publicName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: ['user', Validators.required], // nuevo campo de rol
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Completa todos los campos correctamente';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const { publicName, email, password, role } = this.registerForm.value;

    this.authService.register({ publicName, email, password, role }).subscribe({
      next: (resp) => {
        console.log('Usuario registrado', resp);
        this.loading = false;

        // guardamos usuario en local
        const userWithRole = {
          publicName,
          email,
          role,
        };
        localStorage.setItem('auth_user', JSON.stringify(userWithRole));

        // simulamos acceso premium
        localStorage.setItem('hasPaidVibra', 'true');

        // redirigimos a contenido
        if (role === 'creator') {
          this.router.navigate(['/creator-dashboard']);
        } else {
          this.router.navigate(['/discover']);
        }
      },
      error: (err) => {
        console.log('Error en registro', err);
        this.errorMessage = err.error?.message || 'Error al registrar';
        this.loading = false;
      },
    });
  }
}
