import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCreatorComponent } from './register-creator.component';

describe('RegisterCreatorComponent', () => {
  let component: RegisterCreatorComponent;
  let fixture: ComponentFixture<RegisterCreatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterCreatorComponent]
    });
    fixture = TestBed.createComponent(RegisterCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
