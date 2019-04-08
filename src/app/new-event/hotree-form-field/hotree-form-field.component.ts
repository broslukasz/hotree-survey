import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { NewEventFieldDescription } from '../new-event-form-fields';

@Component({
  selector: 'app-hotree-form-field',
  templateUrl: './hotree-form-field.component.html',
  styleUrls: ['./hotree-form-field.component.scss']
})
export class HotreeFormFieldComponent implements OnInit {
  @Input()
  formField: AbstractControl | null;

  @Input()
  formFieldName: string;

  @Input()
  required = false;

  readonly newEventFieldDescription = NewEventFieldDescription;

  constructor() { }

  ngOnInit() {
  }

}
