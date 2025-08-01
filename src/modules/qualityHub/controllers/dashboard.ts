  import { Response } from 'express';
  import { ExtendedRequest } from '../../usersAndAuthentication/types';

  import dashboardServices from '../services/dashboard';


  const NokDashboardController = {
    getNokData: async (req: ExtendedRequest, res: Response): Promise<void> => {
      const params = req.params || {};
      try {
        const data = await dashboardServices.nokDashboard(params);
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching dashboard data.' });
      }
    },
  };

  export default {
    NokDashboardController
  }