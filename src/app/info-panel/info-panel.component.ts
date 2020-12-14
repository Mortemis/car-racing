import { Component, OnInit } from '@angular/core';
import { GameMasterService } from '../game-master.service';

@Component({
  selector: 'app-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.scss']
})
export class InfoPanelComponent implements OnInit {

  speed: number = 1;
  goal: number = 0;

  constructor(private gm: GameMasterService) { }

  ngOnInit(): void {
    this.gm.enemyPassed.subscribe(() => {
      this.goal += 1;
      if (this.goal >= 50) this.gm.gameWon.emit();
      this.speed = this.gm.setTickSpeed(this.goal); 
    });

    this.gm.gameLost.subscribe(() => {
      this.goal = 0;
      this.speed = 1;
    });

    this.gm.gameLost.subscribe(() => {
      this.goal = 0;
      this.speed = 1;
    });
  }
}