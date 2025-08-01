
export interface DashboardNokParams {
  startDate?: string;
  endDate?: string;
  machineId?: number;
  nokGroupId?: number;
  productId?: number;
}

export interface DashboardNokData {
  totalNOKs: number;
  openNOKs: number;
  inProgressNOKs: number;
}