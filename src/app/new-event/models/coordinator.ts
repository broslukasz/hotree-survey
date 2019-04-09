export class Coordinator {
  constructor(
    public id: number,
    public name: string,
    public lastname: string,
    public email: string
  ) {}

}

export class CoordinatorDtoRequest {
  constructor(
    public id: number,
    public email: string
  ) {}

}
