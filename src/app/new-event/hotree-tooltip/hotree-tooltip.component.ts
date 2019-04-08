import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hotree-tooltip',
  templateUrl: './hotree-tooltip.component.html',
  styleUrls: ['./hotree-tooltip.component.scss']
})
export class HotreeTooltipComponent implements OnInit {
  @Input()
  tooltipText: string;

  constructor() { }

  ngOnInit() {
  }

}
