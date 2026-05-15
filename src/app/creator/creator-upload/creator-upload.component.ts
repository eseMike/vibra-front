import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-creator-upload',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './creator-upload.component.html',
  styleUrls: ['./creator-upload.component.scss'],
})
export class CreatorUploadComponent {
  // Form fields
  title: string = '';
  description: string = '';
  contentType: string = 'image';

  // Files
  images: File[] = [];
  imagePreviews: string[] = [];

  video: File | null = null;
  videoPreview: string | null = null;

  loading = false;

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

  // Handle images
  onImagesSelected(event: any) {
    const files: FileList = event.target.files;

    this.images = [];
    this.imagePreviews = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.images.push(file);

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviews.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  // Handle video
  onVideoSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.video = file;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.videoPreview = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  publishContent() {
    if (this.loading) return;

    if (!this.title || !this.description) {
      alert('Completa título y descripción');
      return;
    }

    if (!this.images.length && !this.video) {
      alert('Selecciona al menos una imagen o un video');
      return;
    }

    this.loading = true;

    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('description', this.description);

    const finalType = this.video ? 'video' : 'image';
    formData.append('type', finalType);

    const accessType =
      this.contentType.toLowerCase() === 'premium' ? 'premium' : 'free';

    formData.append('accessType', accessType);

    this.images.forEach((img) => {
      formData.append('images', img);
    });

    if (this.video) {
      formData.append('video', this.video);
    }

    console.log('FORM DATA READY:', {
      title: this.title,
      description: this.description,
      type: this.video ? 'video' : 'image',
      accessType,
      images: this.images,
      video: this.video,
    });

    this.http
      .post('http://localhost:4000/api/content/upload', formData)
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/creator-dashboard']);
        },
        error: (err) => {
          console.error('UPLOAD ERROR:', err);
          this.loading = false;
          alert('Error al subir contenido');
        },
      });
  }
}
