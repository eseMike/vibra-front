import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyNoticeComponent } from './privacy-notice.component';

describe('PrivacyNoticeComponent', () => {
  let component: PrivacyNoticeComponent;
  let fixture: ComponentFixture<PrivacyNoticeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrivacyNoticeComponent]
    });
    fixture = TestBed.createComponent(PrivacyNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
