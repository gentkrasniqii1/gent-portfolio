export interface Stat {
  id: string;
  value: number;
  /** Appended to the number, e.g. "+" or " mo". */
  suffix?: string;
  label: string;
}
