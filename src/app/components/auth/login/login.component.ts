import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // Si el usuario ya tiene sesión, enviarlo a discover
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/discover']);
      return;
    }
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (res: any) => {
          console.log('Login exitoso:', res);

          if (res.token) {
            localStorage.setItem('token', res.token);

            // Obtener usuario autenticado
            this.authService.getCurrentUser().subscribe({
              next: (user: any) => {
                localStorage.setItem('user', JSON.stringify(user));
                this.isLoading = false;

                const userRole = user?.data?.role;

                if (userRole === 'creator') {
                  this.router.navigate(['/creator-dashboard']);
                } else {
                  const returnUrl =
                    this.route.snapshot.queryParams['returnUrl'] || '/discover';

                  this.router.navigate([returnUrl]);
                }
              },
              error: (err) => {
                this.isLoading = false;
                console.error('Error obteniendo usuario:', err);
              },
            });
          } else {
            this.isLoading = false;
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error en login:', err);
          alert('Credenciales inválidas');
        },
      });
    } else {
      this.isLoading = false;
      this.loginForm.markAllAsTouched();
    }
  }
}
