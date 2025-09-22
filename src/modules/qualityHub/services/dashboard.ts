import { NokAnalyse, NokCode, NokDetect, Product, WorkShift } from '../../../models';
import sequelize, { Op, WhereOptions } from 'sequelize';
import dashboardDataProcessor from '../utils/dashboardDataProcessor';
import { DashboardNokAnalysedData, DashboardNokData, DashboardTopNokData } from '../dashboardTypes';
import { QueryParams } from '../dashboardTypes';
import { NokStatus } from '../types';

interface DashboardNokDetectDataRaw {
  product: string;
  count: number;
  nokStatus: NokStatus;
}

interface DashboardNokAnalysedDataRaw {
  productName: string;
  shiftName: string;
  count: number;
}

interface DashboardTopNokDataRaw {
  productName: string;
  nokCode: string;
  shiftName: string;
  count: number;
}

const nokDashboard = async (params: QueryParams): Promise<DashboardNokData[]> => {
  // converting Parameters
  const processedParams = dashboardDataProcessor.analysedNokQuery(params);

  const detectTimeCondition = processedParams.detectTimeCondition;
  const productRange = processedParams.productRange || [];
  const shiftRange = processedParams.shiftRange || [];

  const andCondition: WhereOptions[] = [{ removeReport: false }];

  if (detectTimeCondition) {
    andCondition.push({ detect_time: detectTimeCondition });
  }

  if (productRange.length > 0) {
    andCondition.push({ product_id: { [Op.in]: productRange } });
  }

  if (shiftRange.length > 0) {
    andCondition.push({ detectShiftId: { [Op.in]: shiftRange } });
  }

  const whereCondition: WhereOptions = {
    [Op.and]: andCondition,
  };

  // Fetching dashboard data for NOK analysis
  try {
    const dashboardNokData = (await NokDetect.findAll({
      include: [
        {
          model: Product,
          as: 'product',
          attributes: [],
        },
        {
          model: NokAnalyse,
          as: 'nokAnalyse',
          required: false,
          attributes: [],
        },
      ],
      where: whereCondition,
      attributes: [
        [sequelize.col('product.product_name'), 'product'],
        'nokStatus',
        [sequelize.fn('COUNT', sequelize.col('nokDetect.id')), 'count'],
      ],
      group: ['product', 'nokStatus'],
      raw: true,
    })) as unknown as DashboardNokDetectDataRaw[];

    // Preparing the dashboard data for response
    const rawNokData = dashboardNokData.map((item) => ({
      product: item.product,
      nokStatus: item.nokStatus,
      count: Number(item.count),
    }));

    const dashboardNokDataFormatted = dashboardDataProcessor.nokDataFormatter(rawNokData);

    return dashboardNokDataFormatted;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error('Failed to fetch NOK dashboard data: ' + error.message);
    }
    throw new Error('Failed to fetch NOK dashboard data');
  }
};

const nokAnalysedDashboard = async (params: QueryParams): Promise<DashboardNokAnalysedData> => {
  // converting Parameters
  const processedParams = dashboardDataProcessor.analysedNokQuery(params);

  const detectTimeCondition = processedParams.detectTimeCondition;
  const productRange = processedParams.productRange || [];
  const shiftRange = processedParams.shiftRange || [];

  const andCondition: WhereOptions[] = [{ '$nokDetect.remove_report$': false }];

  if (detectTimeCondition) {
    andCondition.push({ '$nokDetect.detect_time$': detectTimeCondition });
  }

  if (productRange.length > 0) {
    andCondition.push({ '$nokDetect.product_id$': { [Op.in]: productRange } });
  }

  if (shiftRange.length > 0) {
    andCondition.push({
      '$nokDetect.detect_shift_id$': { [Op.in]: shiftRange },
    });
  }

  const whereCondition: WhereOptions = {
    [Op.and]: andCondition,
  };

  // Fetching analysed dashboard data for NOK analysis
  try {
    const analysedNokData = (await NokAnalyse.findAll({
      include: [
        {
          model: NokDetect,
          as: 'nokDetect',
          required: true,
          attributes: [],
          include: [
            {
              model: Product,
              as: 'product',
              attributes: [],
            },
          ],
        },
        {
          model: WorkShift,
          as: 'causeShift',
          attributes: [],
        },
      ],
      where: whereCondition,
      attributes: [
        [sequelize.col('nokDetect.product.product_name'), 'productName'],
        [sequelize.col('causeShift.shift_name'), 'shiftName'],

        [sequelize.fn('COUNT', sequelize.col('nokAnalyse.id')), 'count'],
      ],
      group: ['nokDetect.product.product_name', 'causeShift.shift_name'],
      raw: true,
    })) as unknown as DashboardNokAnalysedDataRaw[];

    // Preparing the analysed NOK data for response
    const rawAnalysedNokData = analysedNokData.map((item) => ({
      productName: item.productName,
      shiftName: item.shiftName,
      count: item.count,
    }));
    const analysedNokDataFormatted = dashboardDataProcessor.analysedDataFormatter(rawAnalysedNokData);

    return analysedNokDataFormatted;
  } catch (error) {
    throw new Error('Failed to fetch NOK analysed dashboard data');
  }
};

// Top N NOK Codes
const topNokCodes = async (params: QueryParams): Promise<DashboardTopNokData> => {
  // converting Parameters
  const processedParams = dashboardDataProcessor.analysedNokQuery(params);
  const detectTimeCondition = processedParams.detectTimeCondition;
  const productRange = processedParams.productRange || [];
  const shiftRange = processedParams.shiftRange || [];
  const topN = processedParams.topN || 10;

  const andCondition: WhereOptions[] = [{ '$nokDetect.remove_report$': false }];

  if (detectTimeCondition) {
    andCondition.push({ '$nokDetect.detect_time$': detectTimeCondition });
  }

  if (productRange.length > 0) {
    andCondition.push({ '$nokDetect.product_id$': { [Op.in]: productRange } });
  }

  if (shiftRange.length > 0) {
    andCondition.push({ causeShiftId: { [Op.in]: shiftRange } });
  }

  const whereCondition: WhereOptions = {
    [Op.and]: andCondition,
  };

  // Fetching top N NOK codes
  try {
    const topNokCodes = (await NokAnalyse.findAll({
      include: [
        {
          model: NokDetect,
          as: 'nokDetect',
          required: true,
          attributes: [],
          include: [
            {
              model: Product,
              as: 'product',
              attributes: [],
            },
          ],
        },
        {
          model: WorkShift,
          as: 'causeShift',
          attributes: [],
        },
        {
          model: NokCode,
          as: 'nokCode',
          attributes: [],
        },
      ],
      where: whereCondition,
      attributes: [
        [sequelize.col('nokDetect.product.product_name'), 'productName'],
        [sequelize.col('nokCode.nok_code'), 'nokCode'],
        [sequelize.fn('COUNT', sequelize.col('nokAnalyse.id')), 'count'],
        [sequelize.col('causeShift.shift_name'), 'shiftName'],
      ],
      group: ['nokCode.nok_code', 'nokDetect.product.product_name', 'causeShift.shift_name'],
      order: [[sequelize.fn('COUNT', sequelize.col('nokAnalyse.id')), 'DESC']],
      limit: topN,
      raw: true,
    })) as unknown as DashboardTopNokDataRaw[];

    // Preparing the top N NOK codes data for response
    const topNokCodesMapped = topNokCodes.map((item) => ({
      productName: item.productName,
      nokCode: item.nokCode,
      shiftName: item.shiftName,
      count: item.count,
    }));
    const topNokCodesFormatted = dashboardDataProcessor.topNDataFormatter(topNokCodesMapped);

    return topNokCodesFormatted;
  } catch (error) {
    throw new Error('Failed to fetch top NOK codes');
  }
};

export default {
  nokDashboard,
  nokAnalysedDashboard,
  topNokCodes,
};
