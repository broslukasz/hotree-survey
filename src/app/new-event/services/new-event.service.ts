import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { NewEvent } from '../models/new-event';
import { NewEventFormField } from '../new-event-form-fields';
import { CoordinatorDtoRequest } from '../models/coordinator';
import { isNull } from 'util';

@Injectable()
export class NewEventService {

  constructor() { }

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
      this.prepareCoordinatorForSend(
        newEventForm.get(NewEventFormField.coordinator).value.id,
        newEventForm.get(NewEventFormField.email).value,
      ),
      this.calculateDurationInSeconds(
        newEventForm.get(NewEventFormField.duration).value
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
}
