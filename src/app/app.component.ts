import { ThrowStmt } from '@angular/compiler';
import { Component, HostListener, OnInit } from '@angular/core';
import { GameMasterService } from './game-master.service';

enum Descriptions {
  Start = "Press Space to begin!",
  Win = "You win! Press space to continue...",
  Lose = "Game over! Press space to restart...",
  Empty = " "
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'car-racing';
  description: string;

  constructor (private gm: GameMasterService) {}

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    this.gm.handleKeyPressed(event.key);
  }

  ngOnInit(): void {
    this.description = Descriptions.Start;

    this.gm.gameWon.subscribe(() => {
      this.description = Descriptions.Win;
    });

    this.gm.gameLost.subscribe(() => {
      this.description = Descriptions.Lose;
    });

    this.gm.gameStarted.subscribe(() => {
      this.description = Descriptions.Empty;
    });
  }


}
