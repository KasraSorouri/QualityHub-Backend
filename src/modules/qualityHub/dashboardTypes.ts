
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

export interface DashboardNokData {
  productName: string;
  pending: number;
  analysed: number;
}

export interface ProductNokAnalysedData {
  productName: string;
  shifts: { [key: string]: number };
}

export interface DashboardNokAnalysedData {
  shifts: string[];
  productsNok: ProductNokAnalysedData[];
} 