import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpClient,
  ) {}

  currentRoute: string = '';

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get currentUser() {
    return this.authService.currentUserValue;
  }

  get userInitial(): string {
    const name =
      this.currentUser?.name ||
      this.currentUser?.publicName ||
      this.currentUser?.email;

    if (!name) return 'V';

    return name.charAt(0).toUpperCase();
  }

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });

    // Cargar avatar actualizado del usuario
    const userId = this.currentUser?._id;
    if (userId) {
      this.http
        .get<any>(`http://localhost:4000/api/auth/user/${userId}`)
        .subscribe({
          next: (res) => {
            if (res?.data?.avatar) {
              this.currentUser.avatar = res.data.avatar;
            }
          },
          error: () => {},
        });
    }
  }

  isMenuOpen = false;
  isUserMenuOpen = false;
  isScrolled = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  navigateTo(path: string) {
    // Allow access to auth routes even if NOT logged in
    if (path.startsWith('/auth')) {
      this.router.navigate([path]);
      this.isMenuOpen = false;
      document.body.classList.remove('no-scroll');
      return;
    }

    // If user is NOT logged in, force redirect to login
    if (!this.isLoggedIn) {
      this.router.navigate(['/auth/login']);
      this.isMenuOpen = false;
      document.body.classList.remove('no-scroll');
      return;
    }

    // Otherwise, allow normal navigation
    this.router.navigate([path]);
    this.isMenuOpen = false;
    document.body.classList.remove('no-scroll');
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 10;
  }

  isHome(): boolean {
    return this.currentRoute === '/' || this.currentRoute === '/home';
  }

  logout() {
    this.authService.logout();
    this.isUserMenuOpen = false;
    this.router.navigate(['/auth/login']);
  }
}
