import {
  Component,
  OnInit,
  ChangeDetectorRef,
  inject,
  PLATFORM_ID,
  effect,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  ILogEntry,
  IStatus,
  IssueType,
} from '@core/interfaces/logentry.interface';
import { RemoveQueryParamsPipe } from '@core/pipes/removequeryparams.pipe';
import { LogService } from '@core/services/log.service';
import { ChartModule } from 'primeng/chart';
// PrimeNG Module;
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { LazyLoadEvent } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule, DatePicker } from 'primeng/datepicker';
import { FluidModule } from 'primeng/fluid';
import { Select } from 'primeng/select';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TimestampToDatePipe } from '@core/pipes/timestamp-to-date.pipe';
import { FilterService } from 'primeng/api';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [LogService, FilterService],
  imports: [
    TableModule,
    PanelModule,
    CardModule,
    // CalendarModule,
    InputNumberModule,
    InputTextModule,
    ButtonModule,
    Select,
    FormsModule,
    ReactiveFormsModule,
    DatePickerModule,
    FluidModule,
    TimestampToDatePipe,
    KeyFilterModule,
    ChartModule,
  ],
})
export class HomeComponent implements OnInit {
  logs: ILogEntry[] = [];
  virtuallogs: ILogEntry[] = [];
  cols!: ILogEntry[];

  totalRecords = 0;
  first = 0;
  rows = 10; // Adjust rows per page as needed
  // date1 = new Date() || undefined;
  // date2 = new Date() || undefined;

  IssueType: IssueType[] | undefined;
  selectedIssue: IssueType | undefined;
  StatusType: IStatus[] | undefined;
  selectedStatus: IStatus | undefined;
  urlText: string | undefined;
  rsTime: number | undefined;
  filteredLogs: ILogEntry[] = [];
  urlFilter: string = '';
  responseTimeFilter: number | null = null;
  date1: Date | null = null;
  date2: Date | null = null;
  // chart data;
  data: any;
  options: any;
  platformId = inject(PLATFORM_ID);

  constructor(
    private logService: LogService,
    private filterService: FilterService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.IssueType = [
      { value: 0, label: 'Missing Parameter' },
      { value: 1, label: 'Rate limit exceeded' },
      { value: 2, label: 'Not Found' },
      { value: 3, label: 'Unknown Parameter' },
      { value: 4, label: 'Deprecated' },
      { value: 5, label: 'Unsecure' },
    ];

    this.StatusType = [
      { value: 0, label: 'Success' },
      { value: 1, label: 'Warning' },
      { value: 2, label: 'Error' },
    ];

    this.loadData();
    console.log('HomeComponent initialized');
  }

  loadData() {
    this.logService.getData().subscribe((data) => {
      this.logs = data;
      this.applyFilters();
    });
  }

  loadLogsLazy(event: LazyLoadEvent) {
    if (!event || !this.logs) {
      console.error('Invalvalue event or logs data');
      return;
    }

    const { first, rows } = event;

    if (first == null || rows == null) {
      console.error('Invalid pagination parameters');
      return;
    }

    // Simulate remote connection with a timeout
    setTimeout(() => {
      try {
        // Load data of required page
        const startIndex = Math.max(0, first);
        const endIndex = Math.min(this.logs.length, first + rows);
        this.virtuallogs = this.logs.slice(startIndex, endIndex);
      } catch (error) {
        console.error('Error loading logs lazily', error);
      }
    }, Math.random() * 1000 + 250);
  }

  applyFilters() {
    const {
      selectedIssue,
      selectedStatus,
      urlFilter,
      responseTimeFilter,
      date1,
      date2,
    } = this;
    const date1Timestamp = date1 ? Math.floor(date1.getTime() / 1000) : null;
    const date2Timestamp = date2 ? Math.floor(date2.getTime() / 1000) : null;

    // console.log(date1Timestamp, date2Timestamp);

    this.filteredLogs = this.logs.filter((log) => {
      const matchesIssueType =
        !selectedIssue || log.issueType === selectedIssue;
      const matchesStatus = !selectedStatus || log.status === selectedStatus;
      const matchesUrl = !urlFilter || log.url?.includes(urlFilter);
      const matchesResponseTime =
        !responseTimeFilter || log.responseTime === responseTimeFilter;
      const matchesDateRange =
        (!date1Timestamp ||
          (log.timestamp && log.timestamp >= date1Timestamp)) &&
        (!date2Timestamp || (log.timestamp && log.timestamp <= date2Timestamp));

      // console.log('Date', date1Timestamp, log.timestamp);

      return (
        matchesIssueType &&
        matchesStatus &&
        matchesUrl &&
        matchesResponseTime &&
        matchesDateRange
      );
    });
    this.totalRecords = this.filteredLogs.length;
    // this.displayProportions();
    this.calculateDailyLogs(date1?.getTime() ? date1 : undefined, date2?.getTime() ? date2 : undefined);
  }

  onIssueTypeChange(event: any) {
    this.selectedIssue = event.value;
    this.applyFilters();
  }

  onStatusChange(event: any) {
    this.selectedStatus = event.value;
    this.applyFilters();
  }

  onUrlChange(event: any) {
    this.urlFilter = event.target.value;
    this.applyFilters();
  }

  onResponseTimeChange(event: any) {
    this.responseTimeFilter = event.target.value;
    this.applyFilters();
  }

  onDate1Change(event: any) {
    this.date1 = event;
    this.applyFilters();
  }

  onDate2Change(event: any) {
    this.date2 = event;
    this.applyFilters();
  }
  resetFilters() {
    this.selectedIssue = undefined;
    this.selectedStatus = undefined;
    this.urlFilter = '';
    this.responseTimeFilter = null;
    this.date1 = null;
    this.date2 = null;
    this.applyFilters();
  }
  paginate(event: any) {
    this.first = event.first;
  }


  calculateDailyLogs(startDate?: Date, endDate?: Date) {
    const dailyLogs: { [key: string]: { success: number, warning: number, error: number } } = {};
  const currentDate = endDate ? endDate : new Date();
  const startDateValue = startDate ? startDate : new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);

  for (let date = startDateValue; date <= currentDate; date.setDate(date.getDate() + 1)) {
    const dayKey = date.toISOString().split('T')[0];
    let hasLogs = false;

    this.filteredLogs.forEach(log => {
      if (log.timestamp) {
        const logDate = new Date(log.timestamp * 1000);
        if (logDate.toISOString().split('T')[0] === dayKey) {
          hasLogs = true;
          if (!dailyLogs[dayKey]) {
            dailyLogs[dayKey] = { success: 0, warning: 0, error: 0 };
          }
          if (log.status === 0) {
            dailyLogs[dayKey].success++;
          } else if (log.status === 1) {
            dailyLogs[dayKey].warning++;
          } else if (log.status === 2) {
            dailyLogs[dayKey].error++;
          }
        }
      }
    });

    if (!hasLogs) {
      delete dailyLogs[dayKey]; // remove dayKey if no logs found
    }
  }

    console.log(dailyLogs);
    this.displayProportions(dailyLogs);
  }

  displayProportions(proportions: {
    [key: string]: { success: number; warning: number; error: number };
  }) {
    const container = document.getElementById('chart-container');
    if (container) {
      container.innerHTML = '';

      // Find the maximum value across all days
      let maxValue = 0;
      for (const value of Object.values(proportions)) {
        const total = value.success + value.warning + value.error;
        if (total > maxValue) {
          maxValue = total;
        }
      }

      // Scale the heights of the bars proportionally
      for (const [key, value] of Object.entries(proportions)) {
        const total = value.success + value.warning + value.error;
        const scaleFactor = 100 / maxValue;

        const div = document.createElement('div');
        div.className = 'flex flex-col w-3rem align-items-end h-full proportion relative';
        div.innerHTML = `
          <div class="proportion-date text-xs absolute top-0 hidden">${key}</div>
          <div class="proportion-bar w-full">
            <div class="proportion-success" style="height: ${value.success * scaleFactor}px; background-color: green;"></div>
            <div class="proportion-warning" style="height: ${value.warning * scaleFactor}px; background-color: orange;"></div>
            <div class="proportion-error" style="height: ${value.error * scaleFactor}px; background-color: red;"></div>
          </div>
        `;
        container.appendChild(div);
      }
    }
  }
}
