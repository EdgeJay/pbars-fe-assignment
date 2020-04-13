export interface PBarData {
  id: string;
  name: string;
  progress?: number;
}

export interface PBarResponse {
  buttons: number[];
  bars: number[];
  limit: number;
}
