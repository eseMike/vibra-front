import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private tokenKey = 'token';
  private userKey = 'auth_user';

  private authState$ = new BehaviorSubject<boolean>(this.hasToken());
  private userState$ = new BehaviorSubject<any>(this.getStoredUser());

  constructor(private http: HttpClient) {}

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  private getStoredUser(): any {
    const u = localStorage.getItem(this.userKey);
    return u ? JSON.parse(u) : null;
  }

  private setSession(token: string, user: any) {
    localStorage.setItem(this.tokenKey, token);
    if (user) {
      localStorage.setItem(this.userKey, JSON.stringify(user));
    }
    this.authState$.next(true);
    this.userState$.next(user || null);
  }

  private clearSession() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.authState$.next(false);
    this.userState$.next(null);
  }

  logout(): void {
    this.clearSession();
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }

  get authChanges$() {
    return this.authState$.asObservable();
  }

  get userChanges$() {
    return this.userState$.asObservable();
  }

  get currentUserValue() {
    return this.userState$.value;
  }

  isCreator(): boolean {
    return this.currentUserValue?.role === 'creator';
  }

  getCurrentUser() {
    const token = localStorage.getItem(this.tokenKey);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(`${this.apiUrl}/auth/me`, {
      headers,
    });
  }

  login(email: string, password: string) {
    const body = { email, password };
    return this.http.post<any>(`${this.apiUrl}/auth/login`, body).pipe(
      tap((res) => {
        if (res.token) {
          this.setSession(res.token, res.user);
        }
      }),
    );
  }

  register(userData: any) {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, userData).pipe(
      tap((res) => {
        if (res.token) {
          this.setSession(res.token, res.user);
        }
      }),
    );
  }

  getCreatorTest() {
    return this.http.get<any>(`${this.apiUrl}/auth/creator-only`);
  }

  becomeCreator() {
    return this.http.post<any>(`${this.apiUrl}/auth/become-creator`, {}).pipe(
      tap((res) => {
        if (res.token) {
          this.setSession(res.token, res.user);
        }
      }),
    );
  }
}
