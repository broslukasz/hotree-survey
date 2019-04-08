import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NewEvent } from './models/new-event';
import { Router } from '@angular/router';
import { NewEventService } from './services/new-event.service';
import { NewEventFormField } from './new-event-form-fields';
import { NewEventDataService } from './services/new-event-data.service';
import { BehaviorSubject } from 'rxjs';
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
    [NewEventFormField.category]: ['']
  });

  private categories: BehaviorSubject<Category[]>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private newEventService: NewEventService,
    private newEventDataService: NewEventDataService
  ) {
  }

  ngOnInit(): void {
    this.categories = this.newEventDataService.categories$;
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
        this.newEventDataService.getCategory(
          this.newEventForm.get(NewEventFormField.category).value
        )
      )
    );

    this.router.navigate(['summary']);
  }

  get title() { return this.newEventForm.get(NewEventFormField.title); }
  get description() { return this.newEventForm.get(NewEventFormField.description); }
  get category() { return this.newEventForm.get(NewEventFormField.category); }
}
