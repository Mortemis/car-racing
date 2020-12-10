import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.scss']
})
export class InfoPanelComponent implements OnInit {

  speed: number = 0;
  goal: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
