import { NokStatus } from './types';

export interface DashboardNokParams {
  startDate?: string;
  endDate?: string;
  machineId?: number;
  nokGroupId?: number;
  productId?: number;
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

export interface TopNokData {
  productName: string;
  nokCode: string;
  count: number;
  shifts: { [key: string]: number };
}

export interface DashboardTopNokData {
  shifts: string[];
  TopNok: TopNokData[];
}

export interface QueryParams {
  startDate?: string;
  endDate?: string;
  productId?: string | string[];
  shiftId?: string | string[];
  topN?: string | number;
}

export interface DashboardNokDetect {
  product: string;
  count: number;
  nokStatus: NokStatus;
}

export interface DashboardNokAnalysed {
  productName: string;
  shiftName: string;
  count: number;
}

export interface DashboardTopNok {
  productName: string;
  nokCode: string;
  shiftName: string;
  count: number;
}
