import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const premiumGuard: CanActivateFn = () => {
  const router = inject(Router);

  const hasPaid = localStorage.getItem('hasPaidVibra');

  if (hasPaid !== 'true') {
    router.navigate(['/checkout']);
    return false;
  }

  return true;
};
