import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

  pagar() {
    localStorage.setItem('hasPaidVibra', 'true');
    this.router.navigate(['/videochat']);
  }

  activarDemo() {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http
      .post('http://localhost:4000/api/auth/activate-premium', {}, { headers })
      .subscribe({
        next: (res: any) => {
          localStorage.setItem('hasPaidVibra', 'true');
          this.router.navigate(['/discover']);
        },
        error: (err) => {
          console.error('Error activando premium', err);
        },
      });
  }
}
