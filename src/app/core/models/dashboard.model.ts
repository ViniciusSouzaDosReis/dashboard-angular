export interface Dashboard {
  clients: {
    total: number;
    lastMonth: number;
    difference: number;
    percentage: string;
    trend: 'increase' | 'decrease';
  };
  plans: {
    total: number;
    lastMonth: number;
    difference: number;
    percentage: string;
    trend: 'increase' | 'decrease';
  };
  averagePlansPerClient: {
    total: number;
    lastMonth: string;
    difference: number;
    percentage: string;
    trend: 'increase' | 'decrease';
  };
}
