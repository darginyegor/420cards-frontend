import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersBarComponent } from './players-bar.component';

describe('PlayersBarComponent', () => {
  let component: PlayersBarComponent;
  let fixture: ComponentFixture<PlayersBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayersBarComponent]
    });
    fixture = TestBed.createComponent(PlayersBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
