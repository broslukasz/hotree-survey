import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../models/category';
// @ts-ignore
import jsonCategories from '../../../../data/categories.json';
// @ts-ignore
import jsonEmployes from '../../../../data/employes.json';
import { Coordinator, CoordinatorDtoRequest } from '../models/coordinator';

@Injectable()
export class NewEventDataService {
  private categoriesSource = new BehaviorSubject<Category[]>(jsonCategories);
  categories$ = this.categoriesSource.asObservable();

  private coordinatorsSource = new BehaviorSubject<Coordinator[]>(jsonEmployes);
  coordinators$ = this.coordinatorsSource.asObservable();

  prepareCategoryForSend(value: string): number | undefined {
    return value ? Number(value) : undefined;
  }

  prepareCoordinatorForSend(coordinator: Coordinator): CoordinatorDtoRequest {
    return new CoordinatorDtoRequest(coordinator.id, coordinator.email);
  }
}
