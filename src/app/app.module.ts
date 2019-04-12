import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '../core/core.module';
import { SummaryComponent } from './summary/summary.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
  bootstrap: [AppComponent]
})
export class AppModule { }
