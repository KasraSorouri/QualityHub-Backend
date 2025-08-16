import { ClassCode, NokAnalyse, NokCode, NokDetect, Product, WorkShift } from '../../../models';
import sequelize from 'sequelize';
import dashboardDataProcessor from '../utils/dashboardDataProcessor';
import { DashboardNokData } from '../dashboardTypes';

const nokDashboard = async(params: any): Promise<DashboardNokData[]> => {
  
  // converting Parameters
  const processedParams = dashboardDataProcessor.analysedNokQuery(params);

  const detectTimeCondition = processedParams.detectTimeCondition;
  const productRange = processedParams.productRange || [];

  // Fetching dashboard data for NOK analysis
  try {
    console.log('Fetching NOK data from the database...');
    const dashboardNokData = await NokDetect.findAll({
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
        }
      ],
      where: {
        [sequelize.Op.and]: [
          { 'removeReport': false },
          { 'detectTime': detectTimeCondition },
          { '$nokDetect.product_id$': productRange.length > 0 ? { [sequelize.Op.in]: productRange } : { [sequelize.Op.ne]: null } }
        ]
      },
      attributes: [ 
        [sequelize.col('product.product_name'), 'product'],
        'nokStatus',
        [sequelize.fn('COUNT', sequelize.col('nokDetect.id')), 'count']],
      group: ['product','nokStatus'],
      raw: true,
    });

    // Preparing the dashboard data for response
    const dashboardNokDataFormatted = dashboardDataProcessor.nokDataFormatter(dashboardNokData);
    
    return dashboardNokDataFormatted;
  } catch (error) {
    console.error('Error fetching NOK data:', error);
    throw new Error('Failed to fetch NOK dashboard data');
  }
}

const nokAnalysedDashboard = async(params: any): Promise<any> => {

  // converting Parameters
  const processedParams = dashboardDataProcessor.analysedNokQuery(params);

  const detectTimeCondition = processedParams.detectTimeCondition;
  const productRange = processedParams.productRange || [];

  // Fetching analysed dashboard data for NOK analysis
  try {
    const analysedNokData = await NokAnalyse.findAll({
      include: [{
          model: NokDetect,
          as: 'nokDetect',
          required: true,
          attributes: [],
          include: [
            {
              model: Product,
              as: 'product',
              attributes: [],
            }
          ]
        },
       {
          model: WorkShift,
          as: 'causeShift',
          attributes: [],
        }
      ],
      where: {
        [sequelize.Op.and]: [
          {'$nokDetect.remove_report$': false },
          {'$nokDetect.detect_time$': detectTimeCondition },
          {'$nokDetect.product_id$': productRange.length > 0 ? { [sequelize.Op.in]: productRange } : { [sequelize.Op.ne]: null } }
        ]
      },
      attributes: [
        [sequelize.col('nokDetect.product.product_name'), 'productName'],
        [sequelize.col('causeShift.shift_name'), 'shiftName'],

        [sequelize.fn('COUNT', sequelize.col('nokAnalyse.id')), 'count']
      ],
      group: [
        'nokDetect.product.product_name',
        'causeShift.shift_name',
       
      ],
      raw: true,
    });

    // Preparing the analysed NOK data for response
    const analysedNokDataFormatted = dashboardDataProcessor.analysedDataFormatter(analysedNokData);
    console.log('Analysed NOK Data:', analysedNokDataFormatted);

    return analysedNokDataFormatted;
  } catch (error) {
    console.error('Error fetching analysed NOK data:', error);
    throw new Error('Failed to fetch NOK analysed dashboard data');
  }
}

// Top N NOK Codes
const topNokCodes = async (params: any): Promise<any> => {

  // converting Parameters
  const processedParams = dashboardDataProcessor.analysedNokQuery(params);
  console.log('Processed Parameters ->', processedParams);  
  const detectTimeCondition = processedParams.detectTimeCondition;
  const productRange = processedParams.productRange || [];
  const topN = params.topN || 10; // Default to top 10 if not specified

  // Fetching top N NOK codes
  try {
    const topNokCodes = await NokAnalyse.findAll({
      include: [{
          model: NokDetect,
          as: 'nokDetect',
          required: true,
          attributes: [],
          include: [
            {
              model: Product,
              as: 'product',
              attributes: [],
            }
          ]
        },
        {
          model: ClassCode,
          as: 'classCode',
          attributes: [],
        },
        { 
          model: NokCode,
          as: 'nokCode',
          attributes: [],
        }        
      ],
      where: {
        [sequelize.Op.and]: [
          {'$nokDetect.remove_report$': false },
          {'$nokDetect.detect_time$': detectTimeCondition },
          {'$nokDetect.product_id$': productRange.length > 0 ? { [sequelize.Op.in]: productRange } : { [sequelize.Op.ne]: null } }
        ]
      },
      attributes: [
        [sequelize.col('nokAnalyse.nok_code_id'), 'nokCodeId'],
        [sequelize.col('nokDetect.product.product_name'), 'productName'],
        [sequelize.col('nokCode.nok_code'), 'nokCode'],
        [sequelize.col('nokCode.nok_desc'), 'nokDescription'],
        [sequelize.fn('COUNT', sequelize.col('nokAnalyse.id')), 'count']
      ],
      group: [
        'nokAnalyse.nok_code_id',
        'nokCode.nok_code',
        'nokCode.nok_desc',
        'classCode.class_name',
        'nokDetect.product.product_name',
      ],
      order: [[sequelize.fn('COUNT', sequelize.col('nokAnalyse.id')), 'DESC']],
      limit: topN,
      raw: true,
    });
    return topNokCodes;
  } catch (error) {
    console.error('Error fetching top NOK codes:', error);
    throw new Error('Failed to fetch top NOK codes');
  }
}

export default {
  nokDashboard,
  nokAnalysedDashboard,
  topNokCodes
}