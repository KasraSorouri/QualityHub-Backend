import { Request, Response } from 'express';
import { ExtendedRequest } from '../../usersAndAuthentication/types';
import reworkServices from '../services/reworks';


// Get All Reworks
const getAllReworks = async (_req: Request, res: Response) => {
  try{
    const reworks = await reworkServices.getAllReworks();
    res.json(reworks);
  } catch (err) {
    res.status(500).json({ error: 'No rework found' });
  }
};


// Get a Rework by Id
const getRework = async (req: ExtendedRequest, res: Response)=> {
  const id = req.params.id;
  try {
    const rework = await reworkServices.getRework(Number(id));
    res.json(rework);
  } catch (err) {
    res.status(404).json({ error: 'Rework not found' });
  }
};

// Get Reworks by Product Id
const getReworksByProduct = async (req: ExtendedRequest, res: Response) => {
  const productId = Number(req.params.id);
  if (!productId) {
    res.status(400).json({ error: 'Invalid product id' });
  }
  try {
    const reworks = await reworkServices.getReworksByProduct(productId);
    res.json(reworks);
  } catch (err) {
    res.status(404).json({ error: 'No rework found' });
  }
};

// Create a New Rework
const addRework = async (req: ExtendedRequest, res: Response) => {
  const reworkData: unknown = req.body;
  try {
    const result = await reworkServices.createRework(reworkData);
    res.status(201).json(result);
  } catch(err : unknown) {
    let errorMessage = 'Something went wrong.';
    if (err instanceof Error) {
      errorMessage += err.message;
    }
    res.status(409).json({ error: `${errorMessage}` });
  }
};

// Edit an Existing Rework
const editRework = async (req: ExtendedRequest, res: Response) => {
  const id = Number(req.params.id);
  if (!(req.decodedToken && id === req.decodedToken.id || req.permited)) {
    res.status(401).json({ error: 'Operation not allowed' });
  }
  const reworkData: unknown = req.body;
  try {
    const result = await reworkServices.updateRework(id,reworkData);
    res.status(201).json(result);
  } catch(err : unknown) {
    let errorMessage = 'Something went wrong.';
    if (err instanceof Error) {
      errorMessage += err.message;
    }
    res.status(409).json({ error: `${errorMessage}` });
  }
};

export default {
  getAllReworks,
  getRework,
  getReworksByProduct,
  addRework,
  editRework,
};