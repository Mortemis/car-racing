import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HpPanelComponent } from './hp-panel.component';

describe('HpPanelComponent', () => {
  let component: HpPanelComponent;
  let fixture: ComponentFixture<HpPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HpPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HpPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
