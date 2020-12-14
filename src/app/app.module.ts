import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameFieldComponent } from './game-field/game-field.component';
import { BrickComponent } from './game-field/brick/brick.component';
import { ScorePanelComponent } from './score-panel/score-panel.component';
import { HpPanelComponent } from './hp-panel/hp-panel.component';
import { InfoPanelComponent } from './info-panel/info-panel.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    GameFieldComponent,
    BrickComponent,
    ScorePanelComponent,
    HpPanelComponent,
    InfoPanelComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
