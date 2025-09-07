import nokCodeServices from '../services/nokCodes';
import { Request, Response } from 'express';
import { ExtendedRequest } from '../../usersAndAuthentication/types';

// Get All Nok Groups
const getAllNokCodes = async (_req: Request, res: Response) => {
  try {
    const nokCodes = await nokCodeServices.getAllNokCodes();
    res.json(nokCodes);
  } catch (err) {
    res.status(500).json({ error: 'No nok group found' });
  }
};

// Get a Nok Group by Id
const getNokCode = async (req: ExtendedRequest, res: Response) => {
  const id = req.params.id;
  try {
    const nokCode = await nokCodeServices.getNokCode(Number(id));
    res.json(nokCode);
  } catch (err) {
    res.status(404).json({ error: 'Nok Group not found' });
  }
};

// Create a New Nok Group
const addNokCode = async (req: ExtendedRequest, res: Response) => {
  const nokCodeData: unknown = req.body;
  try {
    const result = await nokCodeServices.createNokCode(nokCodeData);
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
const editNokCode = async (req: ExtendedRequest, res: Response) => {
  const id = Number(req.params.id);
  if (!((req.decodedToken && id === req.decodedToken.id) || req.permited)) {
    res.status(401).json({ error: 'Operation not allowed' });
  }
  const nokCodeData: unknown = req.body;
  try {
    const result = await nokCodeServices.updateNokCode(id, nokCodeData);
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
  getAllNokCodes,
  getNokCode,
  addNokCode,
  editNokCode,
};
