export class UserStorage {
  constructor(
    public email: string,
    public userId: string,
    public token: string,
    public expirationDate: Date
  ) { }
}
