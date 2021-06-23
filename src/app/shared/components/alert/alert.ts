export enum AlertType {
  SUCCESS = 1,
  WARNING = 2,
  DANGER = 3,
  INFO = 4,
}

export class Alert {
  constructor(
    public readonly alertType: AlertType,
    public readonly message: string
  ) {}
}
