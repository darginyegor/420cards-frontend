import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerSlotComponent } from './answer-slot.component';

describe('AnswerSlotComponent', () => {
  let component: AnswerSlotComponent;
  let fixture: ComponentFixture<AnswerSlotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnswerSlotComponent]
    });
    fixture = TestBed.createComponent(AnswerSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
