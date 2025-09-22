import nokGrpServices from '../services/nokGrps';
import { Request, Response } from 'express';
import { ExtendedRequest } from '../../usersAndAuthentication/types';

// Get All Nok Groups
const getAllNokGrps = async (_req: Request, res: Response): Promise<void> => {
  try {
    const nokGrps = await nokGrpServices.getAllNokGrps();
    res.json(nokGrps);
  } catch (err) {
    res.status(500).json({ error: 'No nok group found' });
  }
};

// Get a Nok Group by Id
const getNokGrp = async (req: ExtendedRequest, res: Response): Promise<void> => {
  const id = req.params.id;
  try {
    const nokGrp = await nokGrpServices.getNokGrp(Number(id));
    res.json(nokGrp);
  } catch (err) {
    res.status(404).json({ error: 'Nok Group not found' });
  }
};

// Create a New Nok Group
const addNokGrp = async (req: ExtendedRequest, res: Response): Promise<void> => {
  const nokGrpData: unknown = req.body;
  try {
    const result = await nokGrpServices.createNokGrp(nokGrpData);
    res.status(201).json(result);
  } catch (err: unknown) {
    let errorMessage = 'Something went wrong.';
    if (err instanceof Error) {
      errorMessage += err.message;
    }
    res.status(409).json({ error: `${errorMessage}` });
  }
};

// Edit an Existing Nok
const editNokGrp = async (req: ExtendedRequest, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  if (!((req.decodedToken && id === req.decodedToken.id) || req.permited)) {
    res.status(401).json({ error: 'Operation not allowed' });
  }
  const nokGrpData: unknown = req.body;
  try {
    const result = await nokGrpServices.updateNokGrp(id, nokGrpData);
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
  getAllNokGrps,
  getNokGrp,
  addNokGrp,
  editNokGrp,
};
