import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '../core/core.module';
import { NewEventComponent } from './new-event/new-event.component';
import { SummaryComponent } from './summary/summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HotreeTooltipComponent } from './new-event/hotree-tooltip/hotree-tooltip.component';
import { HotreeFormFieldComponent } from './new-event/hotree-form-field/hotree-form-field.component';
import { AuthModule } from '../auth/auth.module';
import { NewEventModule } from './new-event/new-event.module';

@NgModule({
  declarations: [
    AppComponent,
    SummaryComponent
  ],
  imports: [
    AuthModule,
    BrowserModule,
    AppRoutingModule,
    CoreModule.forRoot(),
    NgbModule,
    NewEventModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
