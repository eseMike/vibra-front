import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorLoginComponent } from './creator-login.component';

describe('CreatorLoginComponent', () => {
  let component: CreatorLoginComponent;
  let fixture: ComponentFixture<CreatorLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatorLoginComponent]
    });
    fixture = TestBed.createComponent(CreatorLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
