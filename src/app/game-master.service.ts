import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameMasterService {

  currentPosition: string = 'right';
  isSFXOn = true;

  carMoved = new EventEmitter<string>();
  enemyPassed = new EventEmitter<void>();     //increase score & increase goal
  enemyCollided = new EventEmitter<void>();   //decrease hp or lose if hp = 1
  gameWon = new EventEmitter<void>();
  gameLost = new EventEmitter<void>();

  carImage = [
    [false, true, false],
    [true, true, true],
    [false, true, false],
    [true, false, true]
  ]

  public enableDebugMode() {
    this.enemyCollided.subscribe(() => console.log('[D] Enemy collided.'));
    this.enemyPassed.subscribe(() => console.log('[D] Enemy passed.'));
    this.gameWon.subscribe(() => console.log('[D] Game won.'));
    this.gameLost.subscribe(() => console.log('[D] Game lost.'));
  }

  public handleKeyPressed(key: string) {
    switch (key) {
      case 'ArrowLeft':
      case 'a':
      case 'A':
      case 'ф':
      case 'Ф':
        this.carMoved.emit('left');
        break;

      case 'ArrowRight':
      case 'd':
      case 'D':
      case 'в':
      case 'В':
        this.carMoved.emit('right');
        break;

      case 'm':
      case 'M':
      case 'ь':
      case 'Ь':
        this.isSFXOn = !this.isSFXOn;
        console.log('Mute sfx');
        break;

      case 'x': 
        this.enemyCollided.emit();
        break;
    }
  }


  public applyCarImage(field: boolean[][], position: string) {
    for (let x = 0; x < 3; x++)
      for (let y = 0; y < 4; y++) {
        if (position === 'left' && this.currentPosition === 'right') {

          // Check for collision
          if (field[x + 2][y + 16] === true) {
            this.enemyCollided.emit();
            return;
          }
          field[x + 5][y + 16] = false;               // Clear previous position
          field[x + 2][y + 16] = this.carImage[y][x]; // Render car in new position

        } else if (position === 'right' && this.currentPosition === 'left') {

          // Check for collision
          if (field[x + 5][y + 16] === true) {
            this.enemyCollided.emit();
            return;
          }

          field[x + 2][y + 16] = false;               // Clear previous position
          field[x + 5][y + 16] = this.carImage[y][x]; // Render car in new position

        }
      }
      this.currentPosition = position;
  }

  constructor() { }

}
