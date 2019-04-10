import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewEventComponent } from './new-event.component';
import { HotreeTooltipComponent } from './hotree-tooltip/hotree-tooltip.component';
import { HotreeFormFieldComponent } from './hotree-form-field/hotree-form-field.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NewEventComponent,
    HotreeTooltipComponent,
    HotreeFormFieldComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class NewEventModule { }
