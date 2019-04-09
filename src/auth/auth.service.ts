import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Coordinator } from '../app/new-event/models/coordinator';
// @ts-ignore
import jsonEmployes from '../../data/employes.json';

@Injectable()
export class AuthService {
  user$: BehaviorSubject<Coordinator> = new BehaviorSubject(new Coordinator(
    jsonEmployes[3].id,
    jsonEmployes[3].name,
    jsonEmployes[3].lastname,
    jsonEmployes[3].email
  ));
}
