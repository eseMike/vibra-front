import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-age-modal',
  templateUrl: './age-modal.component.html',
  styleUrls: ['./age-modal.component.scss']
})
export class AgeModalComponent {
  @Output() ageConfirmed = new EventEmitter<void>();
  @Output() ageDenied = new EventEmitter<void>();

  confirm() {
    localStorage.setItem('ageConfirmed', 'true');
    this.ageConfirmed.emit();
  }

  deny() {
    localStorage.setItem('ageConfirmed', 'false');
    this.ageDenied.emit();
  }
}
