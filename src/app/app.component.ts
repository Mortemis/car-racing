import { Component, HostListener } from '@angular/core';
import { GameMasterService } from './game-master.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'car-racing';

  constructor (private gm: GameMasterService) {}

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    this.gm.handleKeyPressed(event.key);
  }
}
