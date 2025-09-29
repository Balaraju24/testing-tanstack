export interface FormErrors {
  organisation_name?: string[];
  branch_name?: string[];
  branch_code?: string[];
  first_name?: string[];
  last_name?: string[];
  employee_id?: string[];
  phone?: string[];
  email?: string[];
  designation?: string[];
  location?: string[];
  location_id?: string[];
  state?: string[];
}

export interface MultiSelectLocationProps {
  value: number[];
  onValueChange: (value: number[]) => void;
  locations?: any;
}

export interface MultiSelectProps {
  value: string[];
  onValueChange: (value: string[]) => void;
}

export interface FormErrors {
  [key: string]: string[] | undefined;
}
