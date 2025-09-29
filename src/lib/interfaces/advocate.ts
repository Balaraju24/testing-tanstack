import { JSX } from "react";

export type heightClassProps = {
  heightClass?: string;
};
export type caseTrends = {
  month: string;
  cases_count: number;
};

export interface StatItem {
  title: string;
  count: number | string;
  icon: JSX.Element;
}
