export class AuthUser {
  constructor(
    public email: string,
    public userId: string,
    public token: string,
    public expirationDate: Date,
    public redirect: boolean
  ) { }
}
