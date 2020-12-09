import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-brick',
  templateUrl: './brick.component.html',
  styleUrls: ['./brick.component.scss']
})
export class BrickComponent implements OnInit {
  @Input()
  active: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
