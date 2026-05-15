import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

export interface Subscriber {
  id: number;
  name: string;
  username: string;
  since: string;
  avatar: string;
  status: 'activo' | 'premium' | 'nuevo';
  vibras: number;
  reward: string;
}

@Component({
  selector: 'app-creator-subscribers',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './creator-subscribers.component.html',
  styleUrls: ['./creator-subscribers.component.scss'],
})
export class CreatorSubscribersComponent {
  subscribers: Subscriber[] = [
    {
      id: 1,
      name: 'Juan Pérez',
      username: '@juanp',
      since: 'Enero 2026',
      avatar: 'https://i.pravatar.cc/100?img=1',
      status: 'premium',
      vibras: 120,
      reward: 'Acceso VIP + Chat desbloqueado',
    },
    {
      id: 2,
      name: 'Ana López',
      username: '@anal',
      since: 'Febrero 2026',
      avatar: 'https://i.pravatar.cc/100?img=2',
      status: 'activo',
      vibras: 75,
      reward: 'Contenido exclusivo',
    },
    {
      id: 3,
      name: 'Carlos Ruiz',
      username: '@carlosr',
      since: 'Marzo 2026',
      avatar: 'https://i.pravatar.cc/100?img=3',
      status: 'nuevo',
      vibras: 30,
      reward: 'Sin beneficios aún',
    },
  ];

  topFanId: number = this.getTopFanId();

  getTopFanId(): number {
    return this.subscribers.reduce((max, sub) =>
      sub.vibras > max.vibras ? sub : max,
    ).id;
  }

  constructor(private router: Router) {
    this.subscribers.sort((a, b) => b.vibras - a.vibras);
  }

  goToSubscriberProfile(id: number) {
    this.router.navigate(['/perfil', id]);
  }
}
