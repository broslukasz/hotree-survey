import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewEventComponent } from './new-event/new-event.component';
import { SummaryComponent } from './summary/summary.component';

const routes: Routes = [
  { path: '', component: NewEventComponent},
  { path: 'summary', component: SummaryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
