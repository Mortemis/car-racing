import { Component, OnInit } from '@angular/core';
import { GameMasterService } from '../game-master.service';

@Component({
  selector: 'app-score-panel',
  templateUrl: './score-panel.component.html',
  styleUrls: ['./score-panel.component.scss']
})
export class ScorePanelComponent implements OnInit {

  score: number = 0;
  highScore: number = 0; 

  constructor(private gm: GameMasterService) { }

  ngOnInit(): void {
    this.gm.enemyPassed.subscribe(() => {
      this.score += 100;
      if (this.score > this.highScore) this.highScore = this.score;
    });
  }

}
