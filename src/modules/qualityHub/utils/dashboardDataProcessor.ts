import sequelize from "sequelize";
import { DashboardNokAnalysedData, DashboardNokData, ProductNokAnalysedData } from "../dashboardTypes";

type QueryParams = {
  startDate?: string;
  endDate?: string;
  productId?: string | string[];
};

type DashboardParams_AnalysedQuery = {
  detectTimeCondition?: object;
  productRange?: number[];
};  

const analysedNokQuery = (params:QueryParams) : DashboardParams_AnalysedQuery => {

  const queryParams: DashboardParams_AnalysedQuery = {
    detectTimeCondition: {},
    productRange: [],
  };
  // Process the parameters as needed for the analysed NOK query

  // Process Date Range
  if (('startDate' in params) || ('endDate' in params)) {
    console.log('Processing parameters for analysed NOK query:', params);
    
    const { startDate, endDate } = params as { startDate?: string; endDate?: string };
    console.log('Start Date:', startDate, 'End Date:', endDate);
    
    if (startDate && endDate) {
      (queryParams.detectTimeCondition as Record<symbol, any>)[sequelize.Op.between] = [startDate, endDate];
    } else if (startDate) {
      (queryParams.detectTimeCondition as Record<symbol, any>)[sequelize.Op.gte] = startDate;
    } else if (endDate) {
      (queryParams.detectTimeCondition as Record<symbol, any>)[sequelize.Op.lte] = endDate;
    }
  }

  // Process Product Range
  if (params.productId && Array.isArray(params.productId)) {
    queryParams.productRange = params.productId.map((id) => parseInt(id));
  } else if (params.productId && typeof params.productId === 'string') {
    queryParams.productRange = [parseInt(params.productId)];
  } else {
    queryParams.productRange = [];
  }
    
  return queryParams;
};

const nokDataFormatter = (dashboardNokData: any[]): DashboardNokData[] => {
  const formattedData: DashboardNokData[] = [];

  const Data: DashboardNokData[] = Object.values(
    dashboardNokData.reduce((acc, item) => {
      if (!acc[item.product]) {
        acc[item.product] = { productName: item.product, pending: 0, analysed: 0 };
      }
      if (item.nokStatus === 'PENDING') {
        acc[item.product].pending += Number(item.count);
      } else if (item.nokStatus === 'ANALYSED') {
        acc[item.product].analysed += Number(item.count);
      }
      return acc;
    }, {} as Record<string, DashboardNokData>)
  );

  for (const item of Data) {
    formattedData.push(item);
  }

  return formattedData;
}

const analysedDataFormatter = (analysedNokData: any[]): DashboardNokAnalysedData => {
  console.log('Analysed Data:', analysedNokData);
  

  // Collect all unique shifts
  const allShifts = Array.from(new Set(analysedNokData.map(item => item.shiftName)));

  // Build Report Structure
  const Data: ProductNokAnalysedData[] = Object.values(
    analysedNokData.reduce<Record<string, ProductNokAnalysedData>>((acc, item) => {
      if (!acc[item.productName]) {
        acc[item.productName] = {
          productName: item.productName,
          shifts : {} 
        }
          allShifts.forEach(shift => {
            acc[item.productName].shifts[shift] = 0;  
          });      
      }
      acc[item.productName].shifts[item.shiftName] = item.count;

      return acc;
    }, {} as Record<string, { productName: string; shifts: Record<string,number> }>)
  );

  const formattedData: DashboardNokAnalysedData = {
    shifts: allShifts,
    productsNok: Data
  };

  return formattedData;
}

export default {
  analysedNokQuery,
  nokDataFormatter,
  analysedDataFormatter,
};
