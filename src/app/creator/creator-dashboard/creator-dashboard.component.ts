import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-creator-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './creator-dashboard.component.html',
  styleUrls: ['./creator-dashboard.component.scss'],
})
export class CreatorDashboardComponent {
  showModal: boolean = false;
  modalMessage: string = '';
  constructor(private router: Router) {}

  goToUpload() {
    this.router.navigate(['/creator-upload']);
  }

  goToMyContent() {
    this.router.navigate(['/creator-content']);
  }

  goToSubscribers() {
    this.router.navigate(['/creator-subscribers']);
  }

  goToEarnings() {
    this.router.navigate(['/creator-earnings']);
  }

  comprarVibras(cantidad: number) {
    this.modalMessage = `Estás comprando ${cantidad} vibras (simulación)`;
    this.showModal = true;
  }

  seleccionarPlan(plan: string) {
    this.modalMessage = `Has seleccionado el plan ${plan} (simulación)`;
    this.showModal = true;
  }

  cerrarModal() {
    this.showModal = false;
  }

  goToEditProfile() {
    this.router.navigate(['/creator-edit-profile']);
  }
}
