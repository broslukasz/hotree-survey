import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NewEvent } from './new-event';
import { Router } from '@angular/router';
import { NewEventService } from './new-event.service';
import { NewEventFormField } from './new-event-form-fields';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss'],
  providers: [NewEventService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewEventComponent {
  public readonly formField = NewEventFormField;
  newEventForm = this.fb.group({
    [NewEventFormField.title]: ['', Validators.required],
    [NewEventFormField.description]: ['', [Validators.required, Validators.maxLength(140)]],
    [NewEventFormField.category]: ['']
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private newEventService: NewEventService
  ) {
  }

  onSubmit(): void {
    if (this.newEventForm.invalid) {
      this.newEventService.checkFormValidation(this.newEventForm);
      return;
    }

    this.newEventService.logFormOutputToConsole(
      new NewEvent(
        this.newEventForm.get(NewEventFormField.title).value,
        this.newEventForm.get(NewEventFormField.description).value
      )
    );

    this.router.navigate(['summary']);
  }

  get title() { return this.newEventForm.get(NewEventFormField.title); }
  get description() { return this.newEventForm.get(NewEventFormField.description); }
  get category() { return this.newEventForm.get(NewEventFormField.description); }
}
