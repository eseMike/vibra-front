import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorOnboardingComponent } from './creator-onboarding.component';

describe('CreatorOnboardingComponent', () => {
  let component: CreatorOnboardingComponent;
  let fixture: ComponentFixture<CreatorOnboardingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatorOnboardingComponent]
    });
    fixture = TestBed.createComponent(CreatorOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
