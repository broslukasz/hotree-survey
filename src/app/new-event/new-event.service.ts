import { Injectable } from '@angular/core';
import { NewEvent } from './new-event';
import { AbstractControl } from '@angular/forms';

@Injectable()
export class NewEventService {

  constructor() { }

  logFormOutputToConsole(newEvent: NewEvent): void {
    console.log('Form submitted', newEvent);
  }

  checkFormValidation(newEventForm: any): void {
    Object.keys(newEventForm.controls).forEach((field: string) => {
      const control: AbstractControl = newEventForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }
}
