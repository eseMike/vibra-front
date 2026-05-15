import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorContentComponent } from './creator-content.component';

describe('CreatorContentComponent', () => {
  let component: CreatorContentComponent;
  let fixture: ComponentFixture<CreatorContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatorContentComponent]
    });
    fixture = TestBed.createComponent(CreatorContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
