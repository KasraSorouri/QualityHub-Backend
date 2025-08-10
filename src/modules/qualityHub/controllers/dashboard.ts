  import { Response } from 'express';
  import { ExtendedRequest } from '../../usersAndAuthentication/types';

  import dashboardServices from '../services/dashboard';


  const NokDashboardController = async (req: ExtendedRequest, res: Response): Promise<void> => {
    const params = req.body || {};
    try {
      const data = await dashboardServices.nokDashboard(params);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching dashboard data.' });
    }
  };

  const nokAnalysedDashboardController = async (req: ExtendedRequest, res: Response): Promise<void> => {
    const params = req.body || {};
    try {
      const data = await dashboardServices.nokAnalysedDashboard(params);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching analysed NOK data.' });
    }
  };

  const NokDashboardControllerTopNok = async (req: ExtendedRequest, res: Response): Promise<void> => {
    const params = req.body || {};
    try {
      const data = await dashboardServices.topNokCodes(params);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching top NOK data.' });
    }
  };

  export default {
    NokDashboardController,
    nokAnalysedDashboardController,
    NokDashboardControllerTopNok
  }