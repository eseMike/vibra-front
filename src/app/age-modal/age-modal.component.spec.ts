import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeModalComponent } from './age-modal.component';

describe('AgeModalComponent', () => {
  let component: AgeModalComponent;
  let fixture: ComponentFixture<AgeModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgeModalComponent]
    });
    fixture = TestBed.createComponent(AgeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
