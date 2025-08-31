import { NokAnalyse, NokCode, NokDetect, Product, WorkShift } from '../../../models';
import sequelize, { Op , WhereOptions } from 'sequelize';
import dashboardDataProcessor from '../utils/dashboardDataProcessor';
import { DashboardNokData } from '../dashboardTypes';

const nokDashboard = async(params: any): Promise<DashboardNokData[]> => {
  
  // converting Parameters
  const processedParams = dashboardDataProcessor.analysedNokQuery(params);

  const detectTimeCondition = processedParams.detectTimeCondition;
  const productRange = processedParams.productRange || [];
  const shiftRange = processedParams.shiftRange || [];

  const andCondition : WhereOptions[] = [
      { 'removeReport': false },
  ]
  console.log('  ** Dashbord service * NOK Detect * ** ');
  console.log('  ** Dashbord service * NOK Detect * Product Range ->', productRange);
  console.log('  ** Dashbord service * NOK Detect * detect Time  ->', detectTimeCondition);
  console.log('  ** Dashbord service * NOK Detect * Shift Range  ->', shiftRange);

  
  if (detectTimeCondition) {
    andCondition.push({ 'detect_time': detectTimeCondition });
  }

  if (productRange.length > 0) {
    andCondition.push({ 'product_id': { [Op.in]: productRange } });
  }

  if (shiftRange.length > 0) {
    andCondition.push({ 'detectShiftId': { [Op.in]: shiftRange } });
  }

  const whereCondition: WhereOptions = {
    [Op.and]: andCondition
  }

  console.log('  ** Dashbord service * NOK Detect * Where Condition ->', whereCondition);

  // Fetching dashboard data for NOK analysis
  try {
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
        },
      ],
      where: whereCondition,
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
  const shiftRange = processedParams.shiftRange || [];

  const andCondition : WhereOptions[] = [
      { '$nokDetect.remove_report$': false },
  ]
  
  console.log('  ** Dashbord service * NOK Analysed * ** ');
  console.log('  ** Dashbord service * NOK Analysed * Product Range ->', productRange);
  console.log('  ** Dashbord service * NOK Analysed * detect Time  ->', detectTimeCondition);
  console.log('  ** Dashbord service * NOK Analysed * Shift Range  ->', shiftRange);

  
  if (detectTimeCondition) {
    andCondition.push({ '$nokDetect.detect_time$': detectTimeCondition });
  }

  
  if (productRange.length > 0) {
    andCondition.push({ '$nokDetect.product_id$': { [Op.in]: productRange } });
  }

  if (shiftRange.length > 0) {
    andCondition.push({ '$nokDetect.detect_shift_id$': { [Op.in]: shiftRange } });
  }

  const whereCondition: WhereOptions = {
    [Op.and]: andCondition
  }

  console.log('  ** Dashbord service * NOK Detect * Where Condition ->', whereCondition);


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
      where: whereCondition,
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
  const detectTimeCondition = processedParams.detectTimeCondition;
  const productRange = processedParams.productRange || [];
  const shiftRange = processedParams.shiftRange || [];
  const topN = processedParams.topN || 10;

  const andCondition : WhereOptions[] = [
      { '$nokDetect.remove_report$': false },
  ]
  
  console.log('  ** Dashbord service * TOP NOK  * ** ');
  console.log('  ** Dashbord service * TOP NOK  * Product Range ->', productRange);
  console.log('  ** Dashbord service * TOP NOK  * detect Time  ->', detectTimeCondition);
  console.log('  ** Dashbord service * TOP NOK  * Shift Range  ->', shiftRange);

  
  if (detectTimeCondition) {
    andCondition.push({ '$nokDetect.detect_time$': detectTimeCondition });
  }

  
  if (productRange.length > 0) {
    andCondition.push({ '$nokDetect.product_id$': { [Op.in]: productRange } });
  }

  if (shiftRange.length > 0) {
    andCondition.push({ 'causeShiftId': { [Op.in]: shiftRange } });
  }

  const whereCondition: WhereOptions = {
    [Op.and]: andCondition
  }

  console.log('  ** Dashbord service * NOK Detect * Where Condition ->', whereCondition);

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
          model: WorkShift,
          as: 'causeShift',
          attributes: [],
        },
        { 
          model: NokCode,
          as: 'nokCode',
          attributes: [],
        }        
      ],
      where: whereCondition,
      attributes: [
        [sequelize.col('nokDetect.product.product_name'), 'productName'],
        [sequelize.col('nokCode.nok_code'), 'nokCode'],
        [sequelize.fn('COUNT', sequelize.col('nokAnalyse.id')), 'count'],
        [sequelize.col('causeShift.shift_name'), 'shiftName'],
      ],
      group: [
        'nokCode.nok_code',
        'nokDetect.product.product_name',
        'causeShift.shift_name'
      ],
      order: [[sequelize.fn('COUNT', sequelize.col('nokAnalyse.id')), 'DESC']],
      limit: topN,
      raw: true,
    });

    // Preparing the top N NOK codes data for response
    const topNokCodesFormatted = dashboardDataProcessor.topNDataFormatter(topNokCodes);

    return topNokCodesFormatted;
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