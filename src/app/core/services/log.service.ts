import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

export interface LogEntry {
  timestamp?: number;
  url?: string;
  status?: number;
  issueType?: number;
  issueDescription?: string;
  responseTime?: number;
}

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private data: LogEntry[] = [];

  constructor(private http: HttpClient) {}

  getData(): Observable<LogEntry[]> {
    if (this.data.length === 0) {
      return this.http.get<LogEntry[]>('assets/data/access_logs.json')
        .pipe(
          map(data => {
            if (data && Array.isArray(data)) {
              this.data = data;
              return data;
            } else {
              throw new Error('Invalid data format received');
            }
          }),
          catchError(error => {
            console.error('Error fetching data:', error);
            return of([]); // Return an empty array in case of error
          })
        );
    } else {
      return of(this.data); // Return cached data if available
    }
  }
}