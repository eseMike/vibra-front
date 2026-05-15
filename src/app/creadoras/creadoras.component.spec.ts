import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreadorasComponent } from './creadoras.component';

describe('CreadorasComponent', () => {
  let component: CreadorasComponent;
  let fixture: ComponentFixture<CreadorasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreadorasComponent]
    });
    fixture = TestBed.createComponent(CreadorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
