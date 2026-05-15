import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorSubscribersComponent } from './creator-subscribers.component';

describe('CreatorSubscribersComponent', () => {
  let component: CreatorSubscribersComponent;
  let fixture: ComponentFixture<CreatorSubscribersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatorSubscribersComponent]
    });
    fixture = TestBed.createComponent(CreatorSubscribersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
