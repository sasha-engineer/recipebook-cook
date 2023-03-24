import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot
} from '@angular/router';

import { DataStorageService } from '../shared/data-storage.service';
import { AuditData } from '../shared/audit-data.model';

export const AUDIT_RESOLVER: ResolveFn<AuditData[]> =
  (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) => {
    return inject(DataStorageService).getAudit();
  };
