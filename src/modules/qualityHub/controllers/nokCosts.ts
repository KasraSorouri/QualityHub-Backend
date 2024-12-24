import { Response } from 'express';
import { ExtendedRequest } from '../../usersAndAuthentication/types';
import nokCostServices from '../services/nokCosts';

/*
// Get All Costs
const getAllCosts = async (_req: Request, res: Response) => {
  try{
    const costs = await nokCostServices.getAllCosts();
    res.json(costs);
  } catch (err) {
    res.status(500).json({ error: 'No cost found' });
  }
};


// Get a Cost by Id
const getCost = async (req: ExtendedRequest, res: Response)=> {
  const id = req.params.id;
  try {
    const cost = await nokCostServices.getCost(Number(id));
    res.json(cost);
  } catch (err) {
    res.status(404).json({ error: 'Cost not found' });
  }
};

// Get Costs by Product Id
const getCostsByNok = async (req: ExtendedRequest, res: Response) => {
  const nokId = Number(req.params.id);
  if (!nokId) {
    res.status(400).json({ error: 'Invalid product id' });
  }
  try {
    const costs = await nokCostServices.getCostsByNok(nokId);
    res.json(costs);
  } catch (err) {
    res.status(404).json({ error: 'No cost found' });
  }
};
*/
// Create a New Cost
const addCost = async (req: ExtendedRequest, res: Response) => {
  const costData: unknown[] = req.body;
  try {
    const result = await nokCostServices.createNokCost(costData);
    res.status(201).json(result);
  } catch(err : unknown) {
    let errorMessage = 'Something went wrong.';
    if (err instanceof Error) {
      errorMessage += err.message;
    }
    res.status(409).json({ error: `${errorMessage}` });
  }
};
/*
// Edit an Existing Cost
const editCost = async (req: ExtendedRequest, res: Response) => {
  const id = Number(req.params.id);
  if (!(req.decodedToken && id === req.decodedToken.id || req.permited)) {
    res.status(401).json({ error: 'Operation not allowed' });
  }
  const costData: unknown = req.body;
  try {
    const result = await nokCostServices.updateCost(id,costData);
    res.status(201).json(result);
  } catch(err : unknown) {
    let errorMessage = 'Something went wrong.';
    if (err instanceof Error) {
      errorMessage += err.message;
    }
    res.status(409).json({ error: `${errorMessage}` });
  }
};
*/
export default {
  //getAllCosts,
  //getCost,
  //getCostsByNok,
  addCost,
  //editCost,
};