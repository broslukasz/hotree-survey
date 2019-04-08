import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { NewEventFieldDescription } from '../new-event-form-fields';

@Component({
  selector: 'app-hotree-form-field',
  templateUrl: './hotree-form-field.component.html',
  styleUrls: ['./hotree-form-field.component.scss']
})
export class HotreeFormFieldComponent implements OnInit {
  public readonly newEventFieldDescription = NewEventFieldDescription;

  @Input()
  formField: AbstractControl;

  @Input()
  formFieldName: AbstractControl;

  constructor() { }

  ngOnInit() {
  }

}
