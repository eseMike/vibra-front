import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-creator-edit-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './creator-edit-profile.component.html',
  styleUrls: ['./creator-edit-profile.component.scss'],
})
export class CreatorEditProfileComponent {
  avatarFile: File | null = null;
  avatarPreview: string | null = null;

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

  onAvatarSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.avatarFile = file;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.avatarPreview = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  saveProfile() {
    if (!this.avatarFile) {
      alert('Selecciona una imagen');
      return;
    }

    const formData = new FormData();
    formData.append('avatar', this.avatarFile);

    this.http
      .put('http://localhost:4000/api/auth/update-avatar', formData)
      .subscribe({
        next: () => {
          alert('Avatar actualizado');
          this.router.navigate(['/creator-dashboard']);
        },
        error: (err) => {
          console.error('ERROR AVATAR:', err);
          alert('Error al actualizar avatar');
        },
      });
  }
}
