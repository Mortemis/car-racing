import { Injectable } from '@angular/core';

export enum Sounds {
  Collide = '../assets/collide.wav',
  Lose = '../assets/lose.wav',
  Win = '../assets/win.wav',
  Pass = '../assets/pass.wav',
  Start = '../assets/start.wav'
}

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  private audio = new Audio();
  public enabled = true;

  public playSound(sound: Sounds) {
    if (this.enabled) {
      this.audio.src = sound;
      this.audio.load();
      this.audio.play();
    }
  }

  public toggleSound() {
    if (this.enabled) this.enabled = false;
    else this.enabled = true;
  }

  constructor() { 
    this.audio.volume = 0.15;
  }
}
