import { EventEmitter, Injectable } from '@angular/core';
import { EnemyCar } from './enemy-car.model';
import { Sounds, SoundService } from './sound.service';

@Injectable({
  providedIn: 'root'
})
export class GameMasterService {

  public field: boolean[][];

  currentPosition: string = 'right';
  private enemies: EnemyCar[] = [];

  private enemySpawnInterval = 10;
  private enemySpawnCounter = 0;

  private tickSpeed = 0;
  private roadPosition = 3;
  private gamePaused = false;
  private gameStopped = true;

  public gameStarted = new EventEmitter<void>();
  public carMoved = new EventEmitter<string>();
  public enemyPassed = new EventEmitter<void>();     //increase score & increase goal
  public enemyCollided = new EventEmitter<void>();   //decrease hp or lose if hp = 1
  public gameWon = new EventEmitter<void>();
  public gameLost = new EventEmitter<void>();
  public sfxToggled = new EventEmitter<void>();

  private carImage = [
    [false, true, false],
    [true, true, true],
    [false, true, false],
    [true, false, true]
  ];

  public enableDebugMode() {
    this.gameStarted.subscribe(() => console.log('[D] Game started.'));
    this.enemyCollided.subscribe(() => console.log('[D] Enemy collided.'));
    this.enemyPassed.subscribe(() => console.log('[D] Enemy passed.'));
    this.gameWon.subscribe(() => console.log('[D] Game won.'));
    this.gameLost.subscribe(() => console.log('[D] Game lost.'));
    this.sfxToggled.subscribe(() => console.log('[D] SFX toggled.'));
  }

  public handleKeyPressed(key: string) {
    switch (key) {
      case 'ArrowLeft':
      case 'a':
      case 'A':
      case 'ф':
      case 'Ф':
        if (!this.gameStopped && !this.gamePaused) this.carMoved.emit('left');
        break;

      case 'ArrowRight':
      case 'd':
      case 'D':
      case 'в':
      case 'В':
        if (!this.gameStopped && !this.gamePaused) this.carMoved.emit('right');
        break;

      case 'm':
      case 'M':
      case 'ь':
      case 'Ь':
        this.sfxToggled.emit();
        break;

      case ' ':
        if (this.gameStopped) {
          this.gameStopped = false;
          this.gameStarted.emit();
          this.tick();
        }
        break;
    }
  }

  public applyCarImage(position: string) {
    for (let x = 0; x < 3; x++)
      for (let y = 0; y < 4; y++) {
        if (position === 'left' && this.currentPosition === 'right') {

          // Check for collision
          if (this.field[x + 2][y + 16] === true) {
            this.enemyCollided.emit();
            return;
          }
          this.field[x + 5][y + 16] = false;               // Clear previous position
          this.field[x + 2][y + 16] = this.carImage[y][x]; // Render car in new position

        } else if (position === 'right' && this.currentPosition === 'left') {

          // Check for collision
          if (this.field[x + 5][y + 16] === true) {
            this.enemyCollided.emit();
            return;
          }

          this.field[x + 2][y + 16] = false;               // Clear previous position
          this.field[x + 5][y + 16] = this.carImage[y][x]; // Render car in new position

        }
      }
    this.currentPosition = position;
  }

  public applyEnemyImage(enemy: EnemyCar) {
    if (this.field[enemy.xPosition + 1][enemy.yPosition + 4]) this.enemyCollided.emit();
    else
      for (let x = 0; x < 3; x++)
        for (let y = 0; y < 5; y++) {
          if (enemy.yPosition + y >= 0 && enemy.yPosition + y < 20) {
            if (y === 0) this.field[enemy.xPosition + x][enemy.yPosition + y] = false;
            else this.field[enemy.xPosition + x][enemy.yPosition + y] = EnemyCar.image[y - 1][x];
          }
        }
  }

  public applyRoadImage() {
    for (let y = 0; y < 20; y++) {
      if ((y + this.roadPosition) % 4 === 0) {
        this.field[0][y] = false;
        this.field[9][y] = false;
      } else {
        this.field[0][y] = true;
        this.field[9][y] = true;
      }
    }
    this.roadPosition--;
    if (this.roadPosition < 0) this.roadPosition = 3;
  }

  public createEnemy() {
    if (Math.random() > 0.5) this.enemies.push(new EnemyCar(0));
    else this.enemies.push(new EnemyCar(1));
  }

  /**
   * 
   * @param progress (goal)
   * @returns speed for component
   */
  public setTickSpeed(progress: number) {
    this.tickSpeed = Math.floor(progress / 10) * 10;
    return Math.floor(progress / 10) + 1;
  }

  /**
   * Recursive function
   * @param y start with value of 19
   */
  private clearFieldAnimation(y: number) {
    for (let x = 0; x < 10; x++) {
      this.field[x][y] = true;
    }
    if (y <= 0) {
      setTimeout(this.clearFieldAnimationEnd.bind(this), 50, [y]); 
      this.enemies = [];
    }
    else setTimeout(this.clearFieldAnimation.bind(this), 50, [y - 1]);
  }

  private clearFieldAnimationEnd(y: number) {
    for (let x = 0; x < 10; x++) {
      this.field[x][y] = false;
    }
    
    if (y < 19) setTimeout(this.clearFieldAnimationEnd.bind(this), 50, [+y + 1]);
    else this.onAnimationEnd();
  }

  private onAnimationEnd() {
    this.gamePaused = false;
    this.currentPosition = 'right';
    this.applyCarImage('left');
    this.applyRoadImage();
  }

  public tick() {
    if (this.gameStopped) return;
    if (!this.gamePaused) {
      this.applyRoadImage();

      for (let i = 0; i < this.enemies.length; i++) {
        this.applyEnemyImage(this.enemies[i]);
        this.enemies[i].move();
        if (this.enemies[i].yPosition >= 20) {
          this.enemies.splice(i, 1);
          this.enemyPassed.emit();
          i--;
        }
      }
      this.enemySpawnCounter++;
      if (this.enemySpawnCounter >= this.enemySpawnInterval) {
        this.enemies.push(new EnemyCar((Math.random() > 0.5) ? 1 : 0));
        this.enemySpawnCounter = 0;
      }
    }
    setTimeout(this.tick.bind(this), 100 - this.tickSpeed);
  }

  constructor(private soundService: SoundService) {
    this.enemyPassed.subscribe(() => {
      soundService.playSound(Sounds.Pass);
    });

    this.enemyCollided.subscribe(() => {
      this.gamePaused = true;
      this.clearFieldAnimation(19);
      soundService.playSound(Sounds.Collide);
    });

    this.gameLost.subscribe(() => {
      this.tickSpeed = 0;
      this.gameStopped = true;
      soundService.playSound(Sounds.Lose)
    });

    this.gameWon.subscribe(() => {
      this.gamePaused = true;
      this.clearFieldAnimation(19);
      this.tickSpeed = 0;
      this.gameStopped = true;
      soundService.playSound(Sounds.Win);
    });

    this.sfxToggled.subscribe(() => {
      this.soundService.toggleSound();
    });

    this.gameStarted.subscribe(() => {
      this.soundService.playSound(Sounds.Start);
    });
   }
}
