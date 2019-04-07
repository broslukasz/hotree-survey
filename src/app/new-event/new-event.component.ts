import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
    private fb: FormBuilder
  ) {
  }

  onSubmit() {
    console.log('submited');
  }
}
