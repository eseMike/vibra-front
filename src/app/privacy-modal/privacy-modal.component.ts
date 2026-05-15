import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-privacy-modal',
  templateUrl: './privacy-modal.component.html',
  styleUrls: ['./privacy-modal.component.scss'],
})
export class PrivacyModalComponent {
  @Output() privacyAccepted = new EventEmitter<void>();
  @Output() privacyDenied = new EventEmitter<void>();

  constructor(private router: Router) {}

  accept() {
    // Notify parent to close the modal and reveal the login/register form
    this.privacyAccepted.emit();
  }

  deny() {
    this.privacyDenied.emit();
  }

  viewPrivacy() {
    this.router.navigate(['/auth/login']);
  }

  underAge() {
    // Emit event and redirect to underage screen
    this.privacyDenied.emit();
    this.router.navigate(['/underage']);
  }
}
