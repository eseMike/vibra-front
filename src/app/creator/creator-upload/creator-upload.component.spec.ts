import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorUploadComponent } from './creator-upload.component';

describe('CreatorUploadComponent', () => {
  let component: CreatorUploadComponent;
  let fixture: ComponentFixture<CreatorUploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatorUploadComponent]
    });
    fixture = TestBed.createComponent(CreatorUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
