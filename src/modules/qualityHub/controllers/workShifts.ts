import workShiftServices from '../services/workShifts';
import { Request, Response } from 'express';
import { ExtendedRequest } from '../../usersAndAuthentication/types';

// Get All WorkShifts
const getAllWorkShifts = async (_req: Request, res: Response) => {
  try {
    const workShifts = await workShiftServices.getAllWorkShifts();
    res.json(workShifts);
  } catch (err: unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    console.log('**** error :', errorMessage);
    throw new Error(errorMessage);
  }
};

// Get a WorkShift by Id
const getWorkShift = async (req: ExtendedRequest, res: Response) => {
  const id = req.params.id;
  try {
    const workShift = await workShiftServices.getWorkShift(Number(id));
    res.json(workShift);
  } catch (err: unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    console.log('**** error :', errorMessage);
    throw new Error(errorMessage);
  }
};

// Create a New WorkShift
const addWorkShift = async (req: ExtendedRequest, res: Response) => {
  const workShiftData: unknown = req.body;
  try {
    const result = await workShiftServices.createWorkShift(workShiftData);
    res.status(201).json(result);
  } catch (err: unknown) {
    let errorMessage = 'Something went wrong.';
    if (err instanceof Error) {
      errorMessage += err.message;
    }
    res.status(409).json({ error: `${errorMessage}` });
  }
};

// Edit an Existing WorkShift
const editWorkShift = async (req: ExtendedRequest, res: Response) => {
  const id = Number(req.params.id);
  if (!((req.decodedToken && id === req.decodedToken.id) || req.permited)) {
    res.status(401).json({ error: 'Operation not allowed' });
  }
  const workShiftData: unknown = req.body;
  try {
    const result = await workShiftServices.updateWorkShift(id, workShiftData);
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
  getAllWorkShifts,
  getWorkShift,
  addWorkShift,
  editWorkShift,
};
