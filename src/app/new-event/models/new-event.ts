import { CoordinatorDtoRequest } from './coordinator';

export class NewEvent {
  constructor(
    public title: string,
    public description: string,
    public category_id: number,
    public paid_event: boolean,
    public event_fee: number,
    public reward: number,
    public date: string,
    public duration: number,
    public coordinator: CoordinatorDtoRequest
  ) { }
}
