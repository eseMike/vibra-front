import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-creator-content',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './creator-content.component.html',
  styleUrls: ['./creator-content.component.scss'],
})
export class CreatorContentComponent implements OnInit {
  contents: any[] = [];
  loading = false;
  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadMyContent();
  }

  loadMyContent(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const creatorId =
      user?._id || user?.id || user?.data?._id || user?.data?.id;

    if (!creatorId) {
      this.error = 'No se encontró el usuario creador.';
      return;
    }

    this.loading = true;
    this.error = '';

    this.http
      .get<any>(`http://localhost:4000/api/content/user/${creatorId}`)
      .subscribe({
        next: (res) => {
          this.contents = res.data || [];
          this.loading = false;
        },
        error: (err) => {
          console.error('ERROR CONTENT:', err);
          this.error = 'No se pudo cargar el contenido.';
          this.loading = false;
        },
      });
  }
}
