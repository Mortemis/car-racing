import { Component, OnInit } from '@angular/core';
import { GameMasterService } from '../game-master.service';

@Component({
  selector: 'app-hp-panel',
  templateUrl: './hp-panel.component.html',
  styleUrls: ['./hp-panel.component.scss']
})
export class HpPanelComponent implements OnInit {

  public hpBricks: boolean[][];

  currentHp: number = 4;

  constructor(private gm: GameMasterService) {
    this.hpBricks = [];

    for (let i = 0; i < 5; i++) {
      this.hpBricks[i] = [];
      for (let j = 0; j < 4; j++) {
        this.hpBricks[i][j] = false;
      }
    }
  }

  ngOnInit(): void {
    this.setHp(this.currentHp);

    this.gm.enemyCollided.subscribe(() => {
      this.currentHp--;
      this.setHp(this.currentHp);
      if (this.currentHp <= 0) {
        this.gm.gameLost.emit();
      }
    });
  }

  public setHp(hp: number) {
    if (hp >= 0 && hp <= 4) {
      for (let i = 0; i < 4; i++)
        this.hpBricks[i][3] = (i < hp) ? true : false;
    }
  }

}
