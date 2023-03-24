import { Injectable } from '@angular/core';
import { AuditData } from '../shared/audit-data.model';

@Injectable()
export class AuditService {
  isDefaultData: boolean = true;
  private auditData: AuditData[] = [];

  getAll(): AuditData[] {
    return this.auditData.slice();
  }

  addOne(item: AuditData) {
    this.auditData.push(item);
  }

  setData(data: AuditData[]): void {
    this.auditData = data;
  }
}
