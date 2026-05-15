import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorRegisterComponent } from './creator-register.component';

describe('CreatorRegisterComponent', () => {
  let component: CreatorRegisterComponent;
  let fixture: ComponentFixture<CreatorRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatorRegisterComponent]
    });
    fixture = TestBed.createComponent(CreatorRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
