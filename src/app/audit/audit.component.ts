import { AuditData } from './../shared/audit-data.model';
import { AuditService } from './audit.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit {
  auditData: AuditData[] = null;

  constructor(private auditService: AuditService) { }

  ngOnInit(): void {
    this.auditData = this.auditService.getAll();
  }
}
