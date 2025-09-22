import sequelize from 'sequelize';
import {
  DashboardNokAnalysedData,
  DashboardNokData,
  ProductNokAnalysedData,
  DashboardTopNokData,
  TopNokData,
  DashboardNokDetect,
  DashboardNokAnalysed,
  DashboardTopNok,
} from '../dashboardTypes';
import { QueryParams } from '../dashboardTypes';
import { NokStatus } from '../types';

type DashboardParams_AnalysedQuery = {
  detectTimeCondition?: object;
  productRange?: number[];
  shiftRange?: number[];
  topN?: number;
};

const analysedNokQuery = (params: QueryParams): DashboardParams_AnalysedQuery => {
  const queryParams: DashboardParams_AnalysedQuery = {
    detectTimeCondition: {},
    productRange: [],
    shiftRange: [],
  };

  // Process Date Range
  if ('startDate' in params || 'endDate' in params) {
    const { startDate, endDate } = params as {
      startDate?: string;
      endDate?: string;
    };

    if (startDate && endDate) {
      (queryParams.detectTimeCondition as Record<symbol, unknown>)[sequelize.Op.between] = [startDate, endDate];
    } else if (startDate) {
      (queryParams.detectTimeCondition as Record<symbol, unknown>)[sequelize.Op.gte] = startDate;
    } else if (endDate) {
      (queryParams.detectTimeCondition as Record<symbol, unknown>)[sequelize.Op.lte] = endDate;
    } else {
      delete queryParams.detectTimeCondition;
    }
  } else {
    delete queryParams.detectTimeCondition;
  }

  // Process Product Range
  if (params.productId && Array.isArray(params.productId)) {
    queryParams.productRange = params.productId.map((id) => parseInt(id));
  } else if (params.productId && typeof params.productId === 'string') {
    queryParams.productRange = [parseInt(params.productId)];
  } else {
    delete queryParams.productRange;
  }

  // Process Shift Range
  if (params.shiftId && Array.isArray(params.shiftId)) {
    queryParams.shiftRange = params.shiftId.map((id) => parseInt(id));
  } else if (params.shiftId && typeof params.shiftId === 'string') {
    queryParams.shiftRange = [parseInt(params.shiftId)];
  } else {
    delete queryParams.shiftRange;
  }

  // Process Top N
  if (params.topN) {
    queryParams.topN = typeof params.topN === 'string' ? parseInt(params.topN) : params.topN;
  } else {
    delete queryParams.topN;
  }

  return queryParams;
};

const nokDataFormatter = (dashboardNokData: DashboardNokDetect[]): DashboardNokData[] => {
  const formattedData: DashboardNokData[] = [];

  const Data: DashboardNokData[] = Object.values(
    dashboardNokData.reduce(
      (acc, item) => {
        if (!acc[item.product]) {
          acc[item.product] = {
            productName: item.product,
            pending: 0,
            analysed: 0,
          };
        }
        if (item.nokStatus === NokStatus.PENDING) {
          acc[item.product].pending += Number(item.count);
        } else if (item.nokStatus === NokStatus.ANALYSED) {
          acc[item.product].analysed += Number(item.count);
        }
        return acc;
      },
      {} as Record<string, DashboardNokData>,
    ),
  );

  for (const item of Data) {
    formattedData.push(item);
  }
  return formattedData;
};

const analysedDataFormatter = (analysedNokData: DashboardNokAnalysed[]): DashboardNokAnalysedData => {
  // Collect all unique shifts
  const allShifts = Array.from(new Set(analysedNokData.map((item) => item.shiftName)));

  // Build Report Structure
  const data: ProductNokAnalysedData[] = Object.values(
    analysedNokData.reduce<Record<string, ProductNokAnalysedData>>(
      (acc, item) => {
        if (!acc[item.productName]) {
          acc[item.productName] = {
            productName: item.productName,
            shifts: {},
          };
          allShifts.forEach((shift) => {
            acc[item.productName].shifts[shift] = 0;
          });
        }
        acc[item.productName].shifts[item.shiftName] = item.count;

        return acc;
      },
      {} as Record<string, { productName: string; shifts: Record<string, number> }>,
    ),
  );

  const formattedData: DashboardNokAnalysedData = {
    shifts: allShifts,
    productsNok: data,
  };

  return formattedData;
};

// Formatting the Top N NOK Codes Data for Response

const topNDataFormatter = (topNData: DashboardTopNok[]): DashboardTopNokData => {
  // Collect all unique shifts
  const allShifts = Array.from(new Set(topNData.map((item) => item.shiftName)));

  // Build Report Structure
  const data: TopNokData[] = Object.values(
    topNData.reduce<Record<string, TopNokData>>(
      (acc, item) => {
        const key = `${item.productName}-${item.nokCode}`;
        const count = Number(item.count);
        if (!acc[key]) {
          acc[key] = {
            productName: item.productName,
            nokCode: item.nokCode,
            count: 0,
            shifts: {},
          };
          allShifts.forEach((shift) => {
            acc[key].shifts[shift] = 0;
          });
        }
        acc[key].count += count;
        acc[key].shifts[item.shiftName] = item.count;

        return acc;
      },
      {} as Record<
        string,
        {
          productName: string;
          nokCode: string;
          count: number;
          shifts: Record<string, number>;
        }
      >,
    ),
  );

  const formattedData: DashboardTopNokData = {
    shifts: allShifts,
    TopNok: data,
  };

  return formattedData;
};

export default {
  analysedNokQuery,
  nokDataFormatter,
  analysedDataFormatter,
  topNDataFormatter,
};
