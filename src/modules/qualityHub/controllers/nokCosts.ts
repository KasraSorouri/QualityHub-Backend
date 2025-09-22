import { Response } from 'express';
import { ExtendedRequest } from '../../usersAndAuthentication/types';
import nokCostServices from '../services/nokCosts';

// Get Dismantled Material by Nok Id
const getDismantledMaterialByNok = async (req: ExtendedRequest, res: Response): Promise<void> => {
  const nokId = Number(req.params.id);
  if (!nokId) {
    res.status(400).json({ error: 'Invalid product id' });
  }
  try {
    const costs = await nokCostServices.getDismantledMaterialByNok(nokId);
    res.json(costs);
  } catch (err) {
    res.status(404).json({ error: 'No cost found' });
  }
};

// Create a New Cost
const addCost = async (req: ExtendedRequest, res: Response): Promise<void> => {
  const costData: unknown[] = req.body as unknown[];
  try {
    const result = await nokCostServices.createNokCost(costData);
    res.status(201).json(result);
  } catch (err: unknown) {
    let errorMessage = 'Something went wrong.';
    if (err instanceof Error) {
      errorMessage += err.message;
    }
    res.status(409).json({ error: `${errorMessage}` });
  }
};

export default {
  getDismantledMaterialByNok,
  addCost,
};
