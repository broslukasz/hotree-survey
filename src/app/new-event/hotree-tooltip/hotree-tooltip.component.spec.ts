import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotreeTooltipComponent } from './hotree-tooltip.component';

describe('HotreeTooltipComponent', () => {
  let component: HotreeTooltipComponent;
  let fixture: ComponentFixture<HotreeTooltipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotreeTooltipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotreeTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
