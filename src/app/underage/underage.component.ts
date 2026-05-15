import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-underage',
  templateUrl: './underage.component.html',
  styleUrls: ['./underage.component.scss']
})
export class UnderageComponent {
  constructor(private router: Router) {}

  accept() {
    localStorage.setItem('isAdultAccepted', 'true');
    this.router.navigate(['/discover']);
  }

  openPrivacy() {
    this.router.navigate(['/privacy-notice']);
  }

  exit() {
    this.router.navigate(['/']);
  }
}
