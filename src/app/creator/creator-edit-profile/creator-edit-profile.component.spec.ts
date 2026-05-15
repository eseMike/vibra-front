import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorEditProfileComponent } from './creator-edit-profile.component';

describe('CreatorEditProfileComponent', () => {
  let component: CreatorEditProfileComponent;
  let fixture: ComponentFixture<CreatorEditProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatorEditProfileComponent]
    });
    fixture = TestBed.createComponent(CreatorEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
