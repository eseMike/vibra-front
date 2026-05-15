import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderageComponent } from './underage.component';

describe('UnderageComponent', () => {
  let component: UnderageComponent;
  let fixture: ComponentFixture<UnderageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnderageComponent]
    });
    fixture = TestBed.createComponent(UnderageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
