export type Location = {
  id: number;
  serial?: number;
  name: string;
  dateAdded: string;
  status: "Active" | "Inactive";
};

export interface SwitchProps {
  status: string;
  toggleStatus: () => void;
  disabled?: boolean;
  disabledAll?: boolean;
  editDisable?: boolean;
  className?: string;
}