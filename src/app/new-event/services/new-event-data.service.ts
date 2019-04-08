import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../models/category';
// @ts-ignore
import jsonCategories from '../../../../data/categories.json';

@Injectable()
export class NewEventDataService {
  private categoriesSource = new BehaviorSubject<Category[]>(jsonCategories);
  categories$ = this.categoriesSource.asObservable();

  prepareCategoryForSend(value: any): number | undefined {
    return value ? value : undefined;
  }
}
