import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-creator-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './creator-register.component.html',
  styleUrls: ['./creator-register.component.scss'],
})
export class CreatorRegisterComponent {
  publicName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  clabe: string = '';

  ineFront: File | null = null;
  ineBack: File | null = null;
  selfieWithIne: File | null = null;

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

  onFileChange(event: any, type: string) {
    const file = event.target.files[0];
    if (!file) return;

    if (type === 'ineFront') this.ineFront = file;
    if (type === 'ineBack') this.ineBack = file;
    if (type === 'selfie') this.selfieWithIne = file;
  }

  createCreatorAccount() {
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const formData = new FormData();
    formData.append('publicName', this.publicName);
    formData.append('email', this.email);
    formData.append('password', this.password);
    formData.append('clabe', this.clabe);
    formData.append('role', 'creator');

    if (this.ineFront) formData.append('ineFront', this.ineFront);
    if (this.ineBack) formData.append('ineBack', this.ineBack);
    if (this.selfieWithIne) formData.append('selfie', this.selfieWithIne);

    this.http
      .post('http://localhost:4000/api/auth/register', formData)
      .subscribe({
        next: (res: any) => {
          console.log('CREATOR REGISTER OK:', res);

          // Guardar nueva sesión como creator
          if (res.token) {
            localStorage.setItem('token', res.token);
          }

          if (res.user) {
            localStorage.setItem('auth_user', JSON.stringify(res.user));
          }

          window.location.href = '/creator-dashboard';
        },
        error: (err) => {
          console.error('CREATOR REGISTER ERROR:', err);
          alert('Error al crear cuenta de creador');
        },
      });
  }

  goToEditProfile() {
    this.router.navigate(['/creator-edit-profile']);
  }
}
