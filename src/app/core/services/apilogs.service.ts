import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

interface Category {
  CategoryID: string;
  CategoryName: string;
  Items: { ID: string; Name: string }[];
}

interface LogEntry {
  timestamp?: number;
  url?: string;
  status?: number;
  issue_type?: number;
  issue_description?: string;
  response_time?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ApiLogsService {
  constructor(private http: HttpClient) {}

  getApiAccessLogs(): Observable<LogEntry[]> {
    return this.http
      .get<LogEntry[]>(`/assets/data/access_logs.json`);
  }
}
