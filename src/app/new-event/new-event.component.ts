import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
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
  readonly formField = NewEventFormField;
  title = new FormControl('', Validators.required);
  description = new FormControl('', [Validators.required, Validators.maxLength(140)]);
  category = new FormControl(null);
  payment = new FormControl(false);
  eventFee = new FormControl(null);
  reward = new FormControl(null);
  coordinator = new FormControl(this.authService.user$.getValue(), Validators.required);
  email = new FormControl(null);
  duration = new FormControl(null);

  newEventForm = this.fb.group({
    [NewEventFormField.title]: this.title,
    [NewEventFormField.description]: this.description,
    [NewEventFormField.category]: this.category,
    [NewEventFormField.payment]: this.payment,
    [NewEventFormField.event_fee]: this.eventFee,
    [NewEventFormField.reward]: this.reward,
    [NewEventFormField.coordinator]: this.coordinator,
    [NewEventFormField.email]: this.email,
    [NewEventFormField.duration]: this.duration,
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

    this.newEventService.setDynamicValidators(this.newEventForm);
  }

  onSubmit(): void {
    if (this.newEventForm.invalid) {
      this.newEventService.checkFormValidation(this.newEventForm);
      return;
    }

    this.newEventService.logFormOutputToConsole(this.newEventForm);

    this.router.navigate(['summary']);
  }

  resetEventFee() {
    this.eventFee.reset();
  }
}
