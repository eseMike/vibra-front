import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss'],
})
export class DiscoverComponent {
  creadores: any[] = [];
  unlockedCreators: Set<string> = new Set();
  loadingCreators: Set<string> = new Set();

  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpClient,
  ) {}

  isLogged: boolean = false;
  role: string | null = null;
  contents: any[] = [];

  ngOnInit() {
    const token = localStorage.getItem('token');
    this.isLogged = !!token;
    // Allow 12 seconds of preview for non‑logged users, then redirect to login
    if (!this.isLogged) {
      setTimeout(() => {
        this.router.navigate(['/auth/login']);
      }, 12000);
    }

    // 🚫 bloquear discover para creators
    this.role = localStorage.getItem('role');

    if (this.role === 'creator') {
      this.router.navigate(['/creator-dashboard']);
      return;
    }
    // Obtener contenido real desde backend
    this.http.get<any>('http://localhost:4000/api/content').subscribe({
      next: (res) => {
        console.log('CONTENTS:', res);
        this.contents = res.data;
      },
      error: (err) => console.error('ERROR GET CONTENT:', err),
    });

    // Obtener creadores reales desde backend
    this.http.get<any>('http://localhost:4000/api/auth/creators').subscribe({
      next: (res) => {
        console.log('CREADORES:', res);
        this.creadores = res.data;
      },
      error: (err) => console.error('ERROR GET CREADORES:', err),
    });

    // Obtener creators desbloqueados del usuario (persistencia)
    if (token) {
      this.http
        .get<any>('http://127.0.0.1:4000/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .subscribe({
          next: (res) => {
            console.log('USER DATA:', res);

            // ✅ guardar role correctamente para usarlo en toda la app
            if (res.data?.role) {
              localStorage.setItem('role', res.data.role);
            }

            const paid = res.data?.paidCreators || [];
            this.unlockedCreators = new Set(paid.map((id: any) => String(id)));
          },
          error: (err) => console.error('ERROR GET USER:', err),
        });
    }
  }

  goToPerfil(id: string) {
    // Validar ObjectId antes de navegar
    if (!id || id.length !== 24) {
      console.warn('ID inválido:', id);
      return;
    }

    this.router.navigate(['/perfil', id]);
  }

  verPerfil(i: number) {
    const creator = this.creadores[i];
    if (!creator || !creator._id) {
      console.warn('Creator inválido');
      return;
    }

    this.goToPerfil(creator._id);
  }
  irACreador() {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/auth/login']);
      return;
    }

    this.router.navigate(['/creator-login']);
  }

  goToHome() {
    this.router.navigate(['/landing']);
  }

  goToDiscover() {
    this.router.navigate(['/discover']);
  }

  goToProfile() {
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = currentUser?.data?._id || currentUser?._id;

    if (!userId) {
      this.router.navigate(['/auth/login']);
      return;
    }
    this.router.navigate(['/user-profile']);
  }

  goToSettings() {
    this.router.navigate(['/settings']);
  }

  becomeCreator() {
    this.authService.becomeCreator().subscribe({
      next: (res) => {
        console.log('BECOME CREATOR OK:', res);
        // Redirige al panel de creador con el nuevo rol
        this.router.navigate(['/creator-dashboard']);
      },
      error: (err) => {
        console.log('BECOME CREATOR ERROR:', err);
      },
    });
  }

  unlockCreator(creatorId: string) {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/auth/login']);
      return;
    }

    // 🚫 evitar doble click
    if (this.loadingCreators.has(creatorId)) {
      return;
    }

    // activar loading
    this.loadingCreators.add(creatorId);

    this.http
      .post(
        `http://127.0.0.1:4000/api/content/unlock/${creatorId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .subscribe({
        next: (res: any) => {
          console.log('UNLOCK OK:', res);

          const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
          const currentUser = savedUser?.data ? savedUser.data : savedUser;

          const updatedUser = {
            ...currentUser,
            wallet: res.wallet,
            paidCreators: [...(currentUser?.paidCreators || []), creatorId],
          };

          localStorage.setItem('user', JSON.stringify(updatedUser));

          // simular pequeña transición UX
          setTimeout(() => {
            this.unlockedCreators.add(creatorId);
            this.loadingCreators.delete(creatorId);
            alert(res.message);
          }, 600);
        },
        error: (err) => {
          console.error('UNLOCK ERROR:', err);
          this.loadingCreators.delete(creatorId);
          alert(err?.error?.message || 'Error al desbloquear');
        },
      });
  }

  isUnlocked(creatorId: string): boolean {
    return this.unlockedCreators.has(creatorId);
  }

  isLoading(creatorId: string): boolean {
    return this.loadingCreators.has(creatorId);
  }
}
