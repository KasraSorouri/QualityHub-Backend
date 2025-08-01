import { NokDetect } from '../../../models';
import sequelize from 'sequelize';

const nokDashboard = async(params: any): Promise<any> => {
  // NOK Query parameters
  console.log('Fetching dashboard data with params:', params);
  
  // Fetching dashboard data for NOK analysis
  // const dashboardNokData = dashboardData.dashboardNokQuery(params);
  try {
    console.log('Fetching NOK data from the database...');
    const dashboardNokData = await NokDetect.findAll({
      where: {
        removeReport: false,
      },
      attributes: ['nokStatus', 'productId', [sequelize.fn('COUNT', sequelize.col('nokDetect.id')), 'count']],
      group: ['nokStatus', 'productId'],
      raw: true,
    });
    console.log('Dashboard NOK Data:', dashboardNokData);

    return dashboardNokData;
  } catch (error) {
    console.error('Error fetching NOK data:', error);
    throw new Error('Failed to fetch NOK dashboard data');
  }
}

export default {
  nokDashboard
}
// This module provides services for the QualityHub dashboard, specifically for fetching NOK (Not OK) analysis data.
