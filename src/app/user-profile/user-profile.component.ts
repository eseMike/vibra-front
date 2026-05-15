import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: any = null;
  wallet: number = 0;
  isLoading: boolean = true;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/auth/login']);
      return;
    }

    this.http
      .get<any>('http://127.0.0.1:4000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .subscribe({
        next: (res) => {
          console.log('USER PROFILE DATA:', res);
          this.user = res.data;
          this.wallet = res.data?.wallet || 0;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('ERROR USER PROFILE:', err);
          this.isLoading = false;
          this.router.navigate(['/auth/login']);
        },
      });
  }

  comprarVibras(cantidad: number): void {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/auth/login']);
      return;
    }

    this.http
      .post<any>(
        'http://127.0.0.1:4000/api/auth/wallet/add',
        { amount: cantidad },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .subscribe({
        next: (res) => {
          console.log('VIBRAS AGREGADAS:', res);
          this.wallet = res.wallet;

          if (this.user) {
            this.user.wallet = res.wallet;
          }
        },
        error: (err) => {
          console.error('ERROR ADD VIBRAS:', err);
          alert(err?.error?.message || 'Error al comprar vibras');
        },
      });
  }
}
