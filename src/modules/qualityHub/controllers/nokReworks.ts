import { Request, Response } from 'express';
import { ExtendedRequest } from '../../usersAndAuthentication/types';
import reworkServices from '../services/nokReworks';

// Get All Reworks
const getAllReworks = async (_req: Request, res: Response): Promise<void> => {
  try {
    const reworks = await reworkServices.getAllReworks();
    res.json(reworks);
  } catch (err) {
    res.status(500).json({ error: 'No rework found' });
  }
};

// Get a Rework by Id
const getRework = async (req: ExtendedRequest, res: Response): Promise<void> => {
  const id = req.params.id;
  try {
    const rework = await reworkServices.getRework(Number(id));
    res.json(rework);
  } catch (err) {
    res.status(404).json({ error: 'Rework not found' });
  }
};

// Get Reworks by Product Id
const getReworksByNok = async (req: ExtendedRequest, res: Response): Promise<void> => {
  const nokId = Number(req.params.id);
  if (!nokId) {
    res.status(400).json({ error: 'Invalid product id' });
  }
  try {
    const reworks = await reworkServices.getReworksByNok(nokId);
    res.json(reworks);
  } catch (err) {
    res.status(404).json({ error: 'No rework found' });
  }
};

// Create a New Rework
const addRework = async (req: ExtendedRequest, res: Response): Promise<void> => {
  const reworkData: unknown = req.body;
  try {
    const result = await reworkServices.createRework(reworkData);
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
  getAllReworks,
  getRework,
  getReworksByNok,
  addRework,
  //editRework,
};
