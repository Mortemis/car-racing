import { Component, OnInit } from '@angular/core';
import { GameMasterService } from '../game-master.service';

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.scss']
})
export class GameFieldComponent implements OnInit {

  public bricks: boolean[][];

  constructor(private gm: GameMasterService) {
    this.bricks = [];

    for (let i = 0; i < 10; i++) {
      this.bricks[i] = [];
      for (let j = 0; j < 20; j++) {
        this.bricks[i][j] = false;
      }
    }
   }

  ngOnInit(): void {
    this.gm.enableDebugMode();
    this.gm.field = this.bricks;
    this.gm.applyCarImage('left');
    this.gm.carMoved.subscribe((position: string) => {
      this.gm.applyCarImage(position);
    });

    this.gm.createEnemy();
  }

}
