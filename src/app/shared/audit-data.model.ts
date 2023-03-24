import { AuditAction } from './audit-action.model';

export class AuditData {
  constructor(
    public userId: string,
    public action: AuditAction,
    public createdOn: string
  ) { }
}
