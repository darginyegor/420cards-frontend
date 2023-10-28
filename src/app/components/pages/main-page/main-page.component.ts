import { trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PLAYERS_MOCK, PROFILE_AVATARS } from 'src/app/mocks';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  private currentIndex =
    Number(localStorage.getItem('currentPlayerAvatar')) || 0;
  public readonly colorPostfix = ''; // '66';
  public hasToken = false;
  public name = localStorage.getItem('currentPlayerName') || '';

  constructor(private readonly activatedRoute: ActivatedRoute) {}

  public get currentAvatar() {
    return PROFILE_AVATARS[this.currentIndex];
  }

  ngOnInit(): void {
    const token = this.activatedRoute.snapshot.queryParams['l'];
    this.hasToken = !!token;
    this.save();
    this.saveName(this.name);
  }

  next() {
    this.currentIndex++;
    if (this.currentIndex >= PROFILE_AVATARS.length) {
      this.currentIndex = 0;
    }
    localStorage.setItem('currentPlayerAvatar', String(this.currentIndex));
    this.save();
  }

  prev() {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = PROFILE_AVATARS.length - 1;
    }
    localStorage.setItem('currentPlayerAvatar', String(this.currentIndex));
    this.save();
  }

  save() {
    const selected = PROFILE_AVATARS[this.currentIndex];
    PLAYERS_MOCK[0].emoji = selected.emoji;
    PLAYERS_MOCK[0].backgroundColor = selected.color;
  }

  saveName(name: string) {
    localStorage.setItem('currentPlayerName', name);
    PLAYERS_MOCK[0].name = name;
  }
}
