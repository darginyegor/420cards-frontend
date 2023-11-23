import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugPageComponent } from './debug-page.component';

describe('DebugPageComponent', () => {
  let component: DebugPageComponent;
  let fixture: ComponentFixture<DebugPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DebugPageComponent]
    });
    fixture = TestBed.createComponent(DebugPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
