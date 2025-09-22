import { Response } from 'express';
import { ExtendedRequest } from '../../usersAndAuthentication/types';
import nokRcaServices from '../services/nokRCAs';

// Get All Rcas
const getAllRcas = async (_req: ExtendedRequest, res: Response): Promise<void> => {
  try {
    const rcas = await nokRcaServices.getAllRcas();
    res.json(rcas);
  } catch (err) {
    res.status(500).json({ error: 'No rca found' });
  }
};

// Get a Rca by Id
const getRca = async (req: ExtendedRequest, res: Response): Promise<void> => {
  const id = req.params.id;
  try {
    const rca = await nokRcaServices.getRca(Number(id));
    res.json(rca);
  } catch (err) {
    res.status(404).json({ error: 'Rca not found' });
  }
};

// Get RCAs by Nok Id
const getNokRcaByNok = async (req: ExtendedRequest, res: Response): Promise<void> => {
  const nokId = Number(req.params.id);
  if (!nokId) {
    res.status(400).json({ error: 'Invalid product id' });
  }
  try {
    const rcas = await nokRcaServices.getNokRcaByNok(nokId);
    res.json(rcas);
  } catch (err) {
    res.status(404).json({ error: 'No NOK found' });
  }
};

// Create a New Rca
const addRca = async (req: ExtendedRequest, res: Response): Promise<void> => {
  const costData: unknown[] = req.body as unknown[];
  try {
    const result = await nokRcaServices.createNokRca(costData);
    res.status(201).json(result);
  } catch (err: unknown) {
    let errorMessage = 'Something went wrong.';
    if (err instanceof Error) {
      errorMessage += err.message;
    }
    res.status(409).json({ error: `${errorMessage}` });
  }
};

// Remove a Rca
const deleteRca = async (req: ExtendedRequest, res: Response): Promise<void> => {
  const id = req.params.id;
  try {
    const result = await nokRcaServices.deleteRca(Number(id));
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: 'Rca not found' });
  }
};

export default {
  getAllRcas,
  getRca,
  getNokRcaByNok,
  addRca,
  deleteRca,
};
