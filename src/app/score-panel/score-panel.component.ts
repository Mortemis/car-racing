import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-score-panel',
  templateUrl: './score-panel.component.html',
  styleUrls: ['./score-panel.component.scss']
})
export class ScorePanelComponent implements OnInit {

  score: number = 0;
  highScore: number = 0; 

  constructor() { }

  ngOnInit(): void {
  }

}
