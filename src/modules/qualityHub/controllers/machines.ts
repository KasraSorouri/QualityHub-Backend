import machineServices from '../services/machines';
import { Request, Response } from 'express';
import { ExtendedRequest } from '../../usersAndAuthentication/types';

// Get All Machines
const getAllMachines = async (_req: Request, res: Response) => {
  try {
    const machines = await machineServices.getAllMachines();
    res.json(machines);
  } catch (err) {
    res.status(500).json({ error: 'No machine found' });
  }
};

// Get a Machine by Id
const getMachine = async (req: ExtendedRequest, res: Response) => {
  const id = req.params.id;
  try {
    const machine = await machineServices.getMachine(Number(id));
    res.json(machine);
  } catch (err) {
    res.status(404).json({ error: 'Machine not found' });
  }
};

// Create a New Machine
const addMachine = async (req: ExtendedRequest, res: Response) => {
  const machineData: unknown = req.body;
  try {
    const result = await machineServices.createMachine(machineData);
    res.status(201).json(result);
  } catch (err: unknown) {
    let errorMessage = 'Something went wrong.';
    if (err instanceof Error) {
      errorMessage += err.message;
    }
    res.status(409).json({ error: `${errorMessage}` });
  }
};

// Edit an Existing Machine
const editMachine = async (req: ExtendedRequest, res: Response) => {
  const id = Number(req.params.id);
  if (!((req.decodedToken && id === req.decodedToken.id) || req.permited)) {
    res.status(401).json({ error: 'Operation not allowed' });
  }
  const machineData: unknown = req.body;
  try {
    const result = await machineServices.updateMachine(id, machineData);
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
  getAllMachines,
  getMachine,
  addMachine,
  editMachine,
};
