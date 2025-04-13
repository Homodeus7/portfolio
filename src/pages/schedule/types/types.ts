export interface ScheduleModel {
  name: string;
  user_id?: string;
  type: "weekly" | "shift";
  homeownersAssociationId: string;
  weeklySchedule?: WeeklySchedule;
  shiftSchedule?: ShiftSchedule;
}

export interface WeeklySchedule {
  isChosen?: boolean;
  work?: TimeRange;
  lunch?: TimeRange;
}

export interface ShiftSchedule {
  workingDays: number;
  weekends: number;
  workHours: TimeNumericRange;
  lunchHours: TimeNumericRange;
  startDay?: string;
}

export interface TimeRange {
  start: string; // "09:00"
  end: string; // "18:00"
}

export interface TimeNumericRange {
  start: number; // e.g. 9
  end: number; // e.g. 18
}
