import rcaCodeServices from '../services/rcaCodes';
import { Request, Response } from 'express';
import { ExtendedRequest } from '../../usersAndAuthentication/types';

// Get All RcaCode
const getAllRcaCodes = async (_req: Request, res: Response): Promise<void> => {
  try {
    const rcaCode = await rcaCodeServices.getAllRcaCodes();
    res.json(rcaCode);
  } catch (err) {
    res.status(500).json({ error: 'No rcaCode found' });
  }
};

// Get a RcaCode by Id
const getRcaCode = async (req: ExtendedRequest, res: Response): Promise<void> => {
  const id = req.params.id;
  try {
    const rcaCode = await rcaCodeServices.getRcaCode(Number(id));
    res.json(rcaCode);
  } catch (err) {
    res.status(404).json({ error: 'RcaCode not found' });
  }
};

// Create a New RcaCode
const addRcaCode = async (req: ExtendedRequest, res: Response): Promise<void> => {
  const rcaCodeData: unknown = req.body;
  try {
    const result = await rcaCodeServices.createRcaCode(rcaCodeData);
    res.status(201).json(result);
  } catch (err: unknown) {
    let errorMessage = 'Something went wrong.';
    if (err instanceof Error) {
      errorMessage += err.message;
    }
    res.status(409).json({ error: `${errorMessage}` });
  }
};

// Edit an Existing RcaCode
const editRcaCode = async (req: ExtendedRequest, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  if (!((req.decodedToken && id === req.decodedToken.id) || req.permited)) {
    res.status(401).json({ error: 'Operation not allowed' });
  }
  const rcaCodeData: unknown = req.body;
  try {
    const result = await rcaCodeServices.updateRcaCode(id, rcaCodeData);
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
  getAllRcaCodes,
  getRcaCode,
  addRcaCode,
  editRcaCode,
};
