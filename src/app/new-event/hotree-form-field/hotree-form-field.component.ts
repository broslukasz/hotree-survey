import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { NewEventFieldDescription } from '../new-event-form-fields';

@Component({
  selector: 'app-hotree-form-field',
  templateUrl: './hotree-form-field.component.html',
  styleUrls: ['./hotree-form-field.component.scss']
})
export class HotreeFormFieldComponent {
  @Input()
  hotreeFormField: AbstractControl | null;

  @Input()
  hotreeFormFieldName: string;

  @Input()
  hotreeRequired = false;

  @Input()
  hotreeTooltipText: string;

  readonly newEventFieldDescription = NewEventFieldDescription;

}
