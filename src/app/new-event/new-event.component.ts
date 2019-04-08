import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NewEvent } from './new-event';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent {
  newEventForm = this.fb.group({
    title: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
  }

  onSubmit(): void {
    if (this.newEventForm.invalid) {
      Object.keys(this.newEventForm.controls).forEach((field: string) => {
        const control: AbstractControl = this.newEventForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });

      return;
    }

    console.log('Form submited', new NewEvent(
      this.newEventForm.get('title').value
    ));

    this.router.navigate(['summary']);
  }

  get title() { return this.newEventForm.get('title'); }
}
