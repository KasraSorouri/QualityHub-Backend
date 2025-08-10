import sequelize from "sequelize";

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
    
  console.log(' ** * Processed Query Parameters:', queryParams);
  return queryParams;
};

export default {
  analysedNokQuery
};
