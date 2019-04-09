import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NewEvent } from './models/new-event';
import { Router } from '@angular/router';
import { NewEventService } from './services/new-event.service';
import { NewEventFormField } from './new-event-form-fields';
import { NewEventDataService } from './services/new-event-data.service';
import { Observable } from 'rxjs';
import { Category } from './models/category';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss'],
  providers: [NewEventService, NewEventDataService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewEventComponent implements OnInit {
  public readonly formField = NewEventFormField;
  newEventForm = this.fb.group({
    [NewEventFormField.title]: ['', Validators.required],
    [NewEventFormField.description]: ['', [Validators.required, Validators.maxLength(140)]],
    [NewEventFormField.category]: null,
    [NewEventFormField.payment]: [false],
    [NewEventFormField.event_fee]: null,
  });

  categories: Observable<Category[]>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private newEventService: NewEventService,
    private newEventDataService: NewEventDataService
  ) {
  }

  ngOnInit(): void {
    this.categories = this.newEventDataService.categories$;

    // this.populateTestData();
  }

  onSubmit(): void {
    if (this.newEventForm.invalid) {
      this.newEventService.checkFormValidation(this.newEventForm);
      return;
    }

    this.newEventService.logFormOutputToConsole(
      new NewEvent(
        this.newEventForm.get(NewEventFormField.title).value,
        this.newEventForm.get(NewEventFormField.description).value,
        this.newEventDataService.prepareCategoryForSend(
          this.newEventForm.get(NewEventFormField.category).value
        ),
        this.newEventForm.get(NewEventFormField.payment).value,
        this.newEventForm.get(NewEventFormField.event_fee).value,
      )
    );

    this.router.navigate(['summary']);
  }

  get title() { return this.newEventForm.get(NewEventFormField.title); }
  get description() { return this.newEventForm.get(NewEventFormField.description); }
  get category() { return this.newEventForm.get(NewEventFormField.category); }
  get payment() { return this.newEventForm.get(NewEventFormField.payment); }
  get event_fee() { return this.newEventForm.get(NewEventFormField.event_fee); }

  private populateTestData(): void {
    this.newEventForm.patchValue({
      [NewEventFormField.title]: 'Sample title',
      [NewEventFormField.description]: 'Sample description',
      [NewEventFormField.category]: '',
      [NewEventFormField.payment]: false,
      [NewEventFormField.event_fee]: undefined,

    });
  }

  resetEventFee() {
    this.event_fee.reset();
  }
}
