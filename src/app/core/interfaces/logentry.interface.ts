export interface ILogEntry {
  timestamp?: number;
  url?: string;
  status?: number;
  issueType?: number;
  issueDescription?: string;
  responseTime?: number;
}

export interface IssueType {
  value?: number;
  label?: string;
}

export interface IStatus {
  value?: number;
  label?: string;
}
