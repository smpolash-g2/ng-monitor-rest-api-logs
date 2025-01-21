import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface AccessLog {
  timestamp?: number;
  url?: string;
  status?: number;
  issue_type?: number;
  issue_description?: string;
  response_time?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AccessLogsService {

  private readonly logsUrl = 'assets/data/access_logs.json';

  constructor(private http: HttpClient) { }

  getAccessLogs(): Observable<AccessLog[]> {
    return this.http.get<AccessLog[]>(this.logsUrl).pipe(
      map(logs => logs.sort((a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0))) // Example: Sort logs by timestamp
    );
  }
}