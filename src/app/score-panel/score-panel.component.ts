import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { GameMasterService } from '../game-master.service';

@Component({
  selector: 'app-score-panel',
  templateUrl: './score-panel.component.html',
  styleUrls: ['./score-panel.component.scss']
})
export class ScorePanelComponent implements OnInit {

  score: number = 0;
  highScore: number = 0; 

  constructor(private gm: GameMasterService, private cookieService: CookieService) { }

  ngOnInit(): void {
    let score = this.cookieService.get('HighScore');

    if (score) {
      this.highScore = +score;
    }

    this.gm.enemyPassed.subscribe(() => {
      this.score += 100;
      if (this.score > this.highScore) {
        this.highScore = this.score; 
        this.cookieService.set('HighScore', this.highScore + '', 500000);
      }
    });

    this.gm.gameLost.subscribe(() => {
      this.score = 0;
    });
  }

}
