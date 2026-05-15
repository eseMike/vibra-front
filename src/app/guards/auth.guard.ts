import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLogged = authService.isLoggedIn();
  const user = authService.currentUserValue;

  if (!isLogged || !user) {
    router.navigate(['/auth/login']);
    return false;
  }

  const role = user?.role;

  // Restricciones por rol
  const url = state.url || '';

  if (url.startsWith('/creator') && role !== 'creator') {
    router.navigate(['/discover']);
    return false;
  }

  // Permitir que creators también accedan a discover
  if (url.startsWith('/discover') && role !== 'user' && role !== 'creator') {
    router.navigate(['/creator-dashboard']);
    return false;
  }

  // Para navegación interna del sitio solo verificamos que el usuario esté logueado
  // La verificación de edad y privacidad se maneja en la pantalla inicial

  return true;
};

export const creatorGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const isLogged = authService.isLoggedIn();
  const user = authService.currentUserValue;

  if (!isLogged || !user) {
    router.navigate(['/auth/login']);
    return false;
  }

  if (user.role !== 'creator') {
    router.navigate(['/discover']);
    return false;
  }

  return true;
};
