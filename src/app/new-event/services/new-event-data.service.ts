import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../models/category';

@Injectable()
export class NewEventDataService {
  categories$ = new BehaviorSubject<Category[]>([{id: 1, name: 'first'}]);

  getCategory(value: any): number | undefined {
    return value ? value : undefined;
  }
}
