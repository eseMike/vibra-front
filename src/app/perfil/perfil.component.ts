import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  creadora: any = null;
  avatarUrl: string = '';
  previewModalUrl: string | null = null;
  hasPaidVibra = false;
  previewExpirado = false;
  previewUsado = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    // 🔐 Detectar usuario actual y acceso real
    const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
    const currentUser = savedUser?.data ? savedUser.data : savedUser;
    const currentUserId = currentUser?._id || currentUser?.id;
    const paidCreators = currentUser?.paidCreators || [];
    const isOwnProfile = currentUserId === id;

    if (isOwnProfile) {
      console.log('ES TU PERFIL');
    }

    if (id) {
      // 🚫 Si es su propio perfil o ya desbloqueó, evitar lógica de compra
      this.hasPaidVibra = isOwnProfile || paidCreators.includes(id);
      this.http
        .get<any>(`http://localhost:4000/api/content/user/${id}`)
        .subscribe({
          next: (res) => {
            const contents = res.data || [];

            if (contents.length) {
              // Guardar TODOS los contenidos como posts
              this.creadora = {
                contenidos: contents,
              };

              this.cargarImagenesProtegidas(contents);
            }
          },
          error: (err) => {
            console.error('ERROR PERFIL:', err);
          },
        });

      // Obtener avatar real del usuario
      this.http
        .get<any>(`http://localhost:4000/api/auth/user/${id}`)
        .subscribe({
          next: (res) => {
            const user = res.data;

            if (user && user.avatar) {
              this.avatarUrl = 'http://localhost:4000/' + user.avatar;
            }
          },
          error: (err) => {
            console.error('ERROR USER:', err);
          },
        });
    }
  }

  abrirPreview(src: string) {
    // Si ya usó preview y no ha pagado, bloquear directamente
    if (this.previewUsado && !this.hasPaidVibra) {
      this.previewExpirado = true;
      this.previewModalUrl = src;
      return;
    }

    this.previewModalUrl = src;
    this.previewExpirado = false;

    if (!this.hasPaidVibra) {
      this.previewUsado = true;

      setTimeout(() => {
        this.previewExpirado = true;
      }, 10000);
    }
  }

  cerrarPreview() {
    const modal = document.querySelector('.preview-modal');
    const content = document.querySelector('.preview-content');

    modal?.classList.add('closing');
    content?.classList.add('closing');

    setTimeout(() => {
      this.previewModalUrl = null;
      this.previewExpirado = false;
    }, 300); // Tiempo sincronizado con la animación SCSS
  }

  comprarVibra() {
    const token = localStorage.getItem('token');
    const creatorId = this.route.snapshot.paramMap.get('id');

    if (!token || !creatorId) {
      this.router.navigate(['/auth/login']);
      return;
    }

    this.http
      .post<any>(
        `http://localhost:4000/api/content/unlock/${creatorId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .subscribe({
        next: (res) => {
          console.log('PAGO OK:', res);

          const savedUser = JSON.parse(localStorage.getItem('user') || '{}');

          const currentUser = savedUser?.data ? savedUser.data : savedUser;

          const currentPaidCreators = currentUser?.paidCreators || [];

          const updatedUser = {
            ...currentUser,
            wallet: res.wallet,
            paidCreators: currentPaidCreators.includes(creatorId)
              ? currentPaidCreators
              : [...currentPaidCreators, creatorId],
          };

          localStorage.setItem('user', JSON.stringify(updatedUser));

          this.hasPaidVibra = true;

          this.previewExpirado = false;
          // Recargar contenido desbloqueado
          this.http
            .get<any>(`http://localhost:4000/api/content/user/${creatorId}`)
            .subscribe({
              next: (contentRes) => {
                const contents = contentRes.data || [];

                this.creadora = {
                  contenidos: contents,
                };

                this.cargarImagenesProtegidas(contents);
                this.hasPaidVibra = true;
                this.previewModalUrl = null;
                this.previewExpirado = false;
                this.previewUsado = false;
              },
            });
        },
        error: (err) => {
          console.error('ERROR PAGO:', err);
          alert(err.error?.message || 'No se pudo completar la compra');
        },
      });
  }

  cargarImagenesProtegidas(contents: any[]) {
    const token = localStorage.getItem('token');

    if (!token) {
      return;
    }

    contents.forEach((item: any) => {
      if (item.images && item.images.length) {
        const filename = item.images[0].split('/').pop();

        if (!filename) {
          return;
        }

        this.http
          .get(`http://localhost:4000/api/content/image/${filename}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            responseType: 'blob',
          })
          .subscribe({
            next: (blob) => {
              const objectUrl = URL.createObjectURL(blob);
              item.protectedImageUrl = objectUrl;
            },
            error: (err) => {
              console.error('ERROR IMAGE:', err);
            },
          });
      }
    });
  }

  conectar() {
    const demoFlag = localStorage.getItem('hasPaidVibra');
    const hasPaid = demoFlag === 'true';

    if (!hasPaid) {
      this.router.navigate(['/checkout']);
      return;
    }

    this.router.navigate(['/videochat']);
  }
}
