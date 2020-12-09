import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.scss']
})
export class GameFieldComponent implements OnInit {

  public bricks: boolean[][];

  constructor() {
    this.bricks = [];

    for (let i = 0; i < 10; i++) {
      this.bricks[i] = [];
      for (let j = 0; j < 20; j++) {
        this.bricks[i][j] = true;
      }
    }
   }

  ngOnInit(): void {
  }

}
