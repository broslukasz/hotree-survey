import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NewEvent } from './models/new-event';
import { Router } from '@angular/router';
import { NewEventService } from './services/new-event.service';
import { NewEventFormField } from './new-event-form-fields';
import { NewEventDataService } from './services/new-event-data.service';
import { Observable } from 'rxjs';
import { Category } from './models/category';
import { Coordinator } from './models/coordinator';
import { AuthService } from '../../auth/auth.service';

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
    [NewEventFormField.reward]: null,
    [NewEventFormField.coordinator]: [this.authService.user$.getValue(), Validators.required],
    [NewEventFormField.email]: [null],
  });

  categories: Observable<Category[]>;
  coordinators: Observable<Coordinator[]>;
  loggedUser: Coordinator;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private newEventService: NewEventService,
    private newEventDataService: NewEventDataService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.categories = this.newEventDataService.categories$;
    this.coordinators = this.newEventDataService.coordinators$;
    this.loggedUser = this.authService.user$.getValue();

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
        this.newEventForm.get(NewEventFormField.reward).value,
        this.newEventDataService.prepareCoordinatorForSend(
          this.newEventForm.get(NewEventFormField.coordinator).value.id,
          this.newEventForm.get(NewEventFormField.email).value,
        )
      )
    );

    this.router.navigate(['summary']);
  }

  get title() { return this.newEventForm.get(NewEventFormField.title); }
  get description() { return this.newEventForm.get(NewEventFormField.description); }
  get category() { return this.newEventForm.get(NewEventFormField.category); }
  get payment() { return this.newEventForm.get(NewEventFormField.payment); }
  get event_fee() { return this.newEventForm.get(NewEventFormField.event_fee); }
  get reward() { return this.newEventForm.get(NewEventFormField.reward); }
  get coordinator() { return this.newEventForm.get(NewEventFormField.coordinator); }
  get email() { return this.newEventForm.get(NewEventFormField.email); }

  private populateTestData(): void {
    this.newEventForm.patchValue({
      [NewEventFormField.title]: 'Sample title',
      [NewEventFormField.description]: 'Sample description',
      [NewEventFormField.category]: null,
      [NewEventFormField.payment]: false,
      [NewEventFormField.event_fee]: null,
      [NewEventFormField.reward]: null,
      [NewEventFormField.coordinator]: this.authService.user$.getValue,
      [NewEventFormField.email]: '',

    });
  }

  resetEventFee() {
    this.event_fee.reset();
  }
}
