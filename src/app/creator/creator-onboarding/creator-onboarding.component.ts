import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-creator-onboarding',
  templateUrl: './creator-onboarding.component.html',
  styleUrls: ['./creator-onboarding.component.scss'],
})
export class CreatorOnboardingComponent {
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  becomeCreator() {
    if (this.loading) return;

    this.loading = true;

    this.authService.becomeCreator().subscribe({
      next: (res) => {
        console.log('BECOME CREATOR OK:', res);
        this.loading = false;
        this.router.navigate(['/creator-dashboard']);
      },
      error: (err) => {
        console.error('BECOME CREATOR ERROR:', err);
        this.loading = false;
        alert('No se pudo completar el proceso. Intenta de nuevo.');
      },
    });
  }

  goBack() {
    this.router.navigate(['/discover']);
  }
}
