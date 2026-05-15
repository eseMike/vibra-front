import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-privacy-notice',
  templateUrl: './privacy-notice.component.html',
  styleUrls: ['./privacy-notice.component.scss'],
})
export class PrivacyNoticeComponent {
  constructor(private router: Router) {}

  isAdult: boolean = false;
  privacyAccepted: boolean = false;

  continuar() {
    console.log('CLICK CONTINUAR');

    localStorage.setItem('privacyAccepted', 'true');
    localStorage.setItem('ageConfirmed', 'true');
    localStorage.setItem('isAdult', 'true');

    this.router.navigateByUrl('/discover').then((result) => {
      console.log('NAVEGACION RESULTADO:', result);
      console.log('URL ACTUAL:', this.router.url);
    });
  }

  soyMenor() {
    // Redirige a la pantalla de menor de edad
    this.router.navigate(['/underage']);
  }
}
