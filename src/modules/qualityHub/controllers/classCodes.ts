import { Request, Response } from 'express';
import { ExtendedRequest } from '../../usersAndAuthentication/types';

import classCodeServices from '../services/classCodes';

// Get All ClassCode
const getAllClassCodes = async (_req: Request, res: Response) => {
  try{
    const classCode = await classCodeServices.getAllClassCodes();
    res.json(classCode);
  } catch (err) {
    res.status(500).json({ error: 'No classCode found' });
  }
};


// Get a ClassCode by Id
const getClassCode = async (req: ExtendedRequest, res: Response)=> {
  const id = req.params.id;
  try {
    const classCode = await classCodeServices.getClassCode(Number(id));
    res.json(classCode);
  } catch (err) {
    res.status(404).json({ error: 'ClassCode not found' });
  }
};

// Create a New ClassCode
const addClassCode = async (req: ExtendedRequest, res: Response) => {
  const classCodeData: unknown = req.body;
  try {
    const result = await classCodeServices.createClassCode(classCodeData);
    res.status(201).json(result);
  } catch(err : unknown) {
    let errorMessage = 'Something went wrong.';
    if (err instanceof Error) {
      errorMessage += err.message;
    }
    res.status(409).json({ error: `${errorMessage}` });
  }
};

// Edit an Existing ClassCode
const editClassCode = async (req: ExtendedRequest, res: Response) => {
  const id = Number(req.params.id);
  if (!(req.decodedToken && id === req.decodedToken.id || req.permited)) {
    res.status(401).json({ error: 'Operation not allowed' });
  }
  const classCodeData: unknown = req.body;
  try {
    const result = await classCodeServices.updateClassCode(id,classCodeData);
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
  getAllClassCodes,
  getClassCode,
  addClassCode,
  editClassCode,
};