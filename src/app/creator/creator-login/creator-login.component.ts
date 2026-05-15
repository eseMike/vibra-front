import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-creator-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './creator-login.component.html',
  styleUrls: ['./creator-login.component.scss'],
})
export class CreatorLoginComponent {
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    const user = this.authService.currentUserValue;

    if (user?.role === 'creator') {
      this.router.navigate(['/creator-dashboard']);
    }
  }

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        const user = this.authService.currentUserValue;

        if (user?.role === 'creator') {
          this.router.navigate(['/creator-dashboard']);
        } else {
          // Flujo onboarding para convertir a creador
          this.router.navigate(['/creator-onboarding']);
        }
      },
      error: (err) => {
        console.error('Error en login creador', err);
        alert('Credenciales incorrectas');
      },
    });
  }
}
