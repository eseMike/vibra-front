import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ConsentGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const privacyAccepted = localStorage.getItem('privacyAccepted') === 'true';

    // If privacy has been accepted we allow access
    if (privacyAccepted) {
      return true;
    }

    // Si no existe consentimiento completo -> redirigir al aviso de privacidad
    this.router.navigate(['/privacy-notice']);
    return false;
  }
}
