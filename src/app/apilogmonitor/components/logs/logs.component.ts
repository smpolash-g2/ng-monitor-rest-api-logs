import { Component, OnInit } from '@angular/core';
import { AccessLogsService } from '../../../core/services/accesslog.service';
@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  accessLogs: any[] = [];

  constructor(private accessLogsService: AccessLogsService) { }

  ngOnInit(): void {
    this.accessLogsService.getAccessLogs().subscribe(
      logs => this.accessLogs = logs,
      error => console.error('Error loading access logs', error)
    );
  }
}