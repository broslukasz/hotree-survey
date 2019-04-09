export interface Coordinator {
  id: number;
  name: string;
  lastname: string;
  email: string;
}

export class CoordinatorDtoRequest {
  constructor(
    public id: number,
    public email: string
  ) {}

}
