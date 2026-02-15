
export enum Frequency {
  WEEKLY = 'week',
  MONTHLY = 'month',
  YEARLY = 'year'
}

export enum ActionStatus {
  KEEP = 'keep',
  CANCEL = 'cancel'
}

export interface Subscription {
  id: string;
  name: string;
  provider: string;
  amount: number;
  frequency: Frequency;
  status: ActionStatus;
  isCustom?: boolean;
}

export interface Totals {
  currentMonthly: number;
  currentYearly: number;
  potentialMonthlySavings: number;
  potentialYearlySavings: number;
}
