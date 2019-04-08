import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class NewEventDataService {
  categories$ = new BehaviorSubject(['first', 'second']);
}
