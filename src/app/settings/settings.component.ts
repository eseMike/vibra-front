import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  constructor(private router: Router) {}

  goToEditProfile() {
    this.router.navigate(['/creator-edit-profile']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  showDeleteConfirm = false;

  toggleDeleteConfirm() {
    this.showDeleteConfirm = !this.showDeleteConfirm;
  }

  confirmDelete() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
