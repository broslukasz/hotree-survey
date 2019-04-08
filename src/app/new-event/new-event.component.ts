import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NewEvent } from './new-event';
import { Router } from '@angular/router';
import { NewEventService } from './new-event.service';
import { NewEventFormFields } from './new-event-form-fields';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss'],
  providers: [NewEventService]
})
export class NewEventComponent {
  newEventForm = this.fb.group({
    title: ['', Validators.required]
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
        this.newEventForm.get('title').value
      )
    );

    this.router.navigate(['summary']);
  }

  get title() { return this.newEventForm.get('title'); }
}
