export interface DayObject {
  day: number;
  isCurrentMonth: boolean;
  date: Date;
}

export interface CustomCalendarProps {
  onDateSelect: (date: Date | undefined) => void;
  selectedDate: Date | null;
  hearingDates: string[];
  upComingCallDates: string[];
  onWeeksChange?: (weeks: number) => void;
}

export type Advocate = {
  id: number;
  first_name: string;
  last_name: string;
  profile_pic?: string;
};

export interface Hearing {
  id: number;
  next_hearing_date: Date;
  organisation_name: string;
  customer_name: string;
  user: User;
  advocate_cases: AdvocateCase[];
}

export interface DueDate {
  id: number;
  due_date: Date;
  organisation_name: string;
  customer_name: string;
  user: User;
  status: string;
  advocate_cases: AdvocateCase[];
}

export interface AdvocateCase {
  advocate: Advocate;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
}
