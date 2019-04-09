import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../models/category';
// @ts-ignore
import jsonCategories from '../../../../data/categories.json';
// @ts-ignore
import jsonEmployes from '../../../../data/employes.json';
import { Coordinator, CoordinatorDtoRequest } from '../models/coordinator';
import { isNull } from 'util';

@Injectable()
export class NewEventDataService {
  private categoriesSource = new BehaviorSubject<Category[]>(jsonCategories);
  categories$ = this.categoriesSource.asObservable();

  private coordinatorsSource = new BehaviorSubject<Coordinator[]>(jsonEmployes);
  coordinators$ = this.coordinatorsSource.asObservable();

  prepareCategoryForSend(value: string): number | undefined {
    return value ? Number(value) : undefined;
  }

  prepareCoordinatorForSend(coordinatorId: number, email: string): CoordinatorDtoRequest {
    return new CoordinatorDtoRequest(coordinatorId, email);
  }

  calculateDurationInSeconds(durationInHours: number | null): number | null {
    if (isNull(durationInHours)) {
      return null;
    }

    return durationInHours * 3600;
  }
}
