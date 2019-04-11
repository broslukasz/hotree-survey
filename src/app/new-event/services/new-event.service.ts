import { Injectable, OnDestroy } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { NewEvent } from '../models/new-event';
import { NewEventFormField } from '../new-event-form-fields';
import { CoordinatorDtoRequest } from '../models/coordinator';
import { isNull } from 'util';
import { Subscription } from 'rxjs';
import { IEventDate } from '../models/event-date';

@Injectable()
export class NewEventService implements OnDestroy {
  private dynamicValidatorsSubscription: Subscription;

  constructor() { }

  ngOnDestroy(): void {
  }

  logFormOutputToConsole(newEventForm: FormGroup): void {
    const newEventRequest: NewEvent = new NewEvent(
      newEventForm.get(NewEventFormField.title).value,
      newEventForm.get(NewEventFormField.description).value,
      this.prepareCategoryForSend(
        newEventForm.get(NewEventFormField.category).value
      ),
      newEventForm.get(NewEventFormField.payment).value,
      newEventForm.get(NewEventFormField.event_fee).value,
      newEventForm.get(NewEventFormField.reward).value,
      this.prepareDateForSend(
        newEventForm.get(NewEventFormField.date).value
      ),
      this.calculateDurationInSeconds(
        newEventForm.get(NewEventFormField.duration).value
      ),
      this.prepareCoordinatorForSend(
        newEventForm.get(NewEventFormField.coordinator).value.id,
        newEventForm.get(NewEventFormField.email).value,
      ),
    );

    console.log('Form submitted', newEventRequest);
  }

  checkFormValidation(newEventForm: any): void {
    Object.keys(newEventForm.controls).forEach((field: string) => {
      const control: AbstractControl = newEventForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  private prepareCategoryForSend(value: string): number | undefined {
    return value ? Number(value) : undefined;
  }

  private prepareCoordinatorForSend(coordinatorId: number, email: string): CoordinatorDtoRequest {
    return new CoordinatorDtoRequest(coordinatorId, email);
  }

  private calculateDurationInSeconds(durationInHours: number | null): number | null {
    if (isNull(durationInHours)) {
      return null;
    }

    return durationInHours * 3600;
  }

  setDynamicValidators(newEventForm: FormGroup): void {
    this.dynamicValidatorsSubscription = newEventForm.get([NewEventFormField.payment])
        .valueChanges.subscribe(value => {
      if (value) {
        newEventForm.get([NewEventFormField.event_fee]).setValidators([Validators.required]);
        return;
      }

      newEventForm.get([NewEventFormField.event_fee]).clearValidators();
      newEventForm.get([NewEventFormField.event_fee]).updateValueAndValidity();
    });
  }

  private prepareDateForSend(eventDate: IEventDate): string {
    const calendarDate: Date = new Date(eventDate.calendarDate);
    const isoStringDate = new Date(
      calendarDate.getFullYear(),
      calendarDate.getMonth(),
      calendarDate.getDay(),
      ).toISOString();
    return isoStringDate;
  }
}
