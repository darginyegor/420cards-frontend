import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PunchLineButtonComponent } from './punch-line-button.component';

describe('PunchLineButtonComponent', () => {
  let component: PunchLineButtonComponent;
  let fixture: ComponentFixture<PunchLineButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PunchLineButtonComponent]
    });
    fixture = TestBed.createComponent(PunchLineButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
