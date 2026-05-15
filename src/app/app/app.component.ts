import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'vibra';

  showHeader: boolean = true;
  showPrivacyModal: boolean = false;
  showAgeModal: boolean = false;
  isUnderagePage: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.initializeValidationFlow();
  }

  initializeValidationFlow() {
    const accepted = localStorage.getItem('privacyAccepted');
    const currentUrl = this.router.url;

    // No mostrar modal en página de menores
    if (currentUrl.includes('/underage')) {
      this.showPrivacyModal = false;
      return;
    }

    if (!accepted) {
      this.showPrivacyModal = true;
      this.showAgeModal = false;
    } else {
      this.showPrivacyModal = false;
    }
  }

  onPrivacyAccepted() {
    localStorage.setItem('privacyAccepted', 'true');
    this.showPrivacyModal = false;
    this.showAgeModal = false;
  }

  onPrivacyDenied() {
    this.router.navigate(['/underage']);
  }

  onAgeConfirmed() {
    localStorage.setItem('isAdult', 'true');
    this.showAgeModal = false;
  }

  onAgeDenied() {
    this.router.navigate(['/underage']);
  }
}
