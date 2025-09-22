import { Response } from 'express';
import { ExtendedRequest } from '../../usersAndAuthentication/types';
import nokAnalyseServices from '../services/nokAnalyses';

// Get All Analyses
const getAllAnalyses = async (res: Response) => {
  try {
    const rcas = await nokAnalyseServices.getAllAnalyses();
    res.json(rcas);
  } catch (err) {
    res.status(500).json({ error: 'No rca found' });
  }
};

// Get a Analyse by Id
const getAnalyse = async (req: ExtendedRequest, res: Response) => {
  const id = req.params.id;
  try {
    const rca = await nokAnalyseServices.getAnalyse(Number(id));
    res.json(rca);
  } catch (err) {
    res.status(404).json({ error: 'Analyse not found' });
  }
};

// Get RCAs by Nok Id
const getNokAnalyseByNok = async (req: ExtendedRequest, res: Response) => {
  const nokId = Number(req.params.id);
  if (!nokId) {
    res.status(400).json({ error: 'Invalid product id' });
  }
  try {
    const rcas = await nokAnalyseServices.getNokAnalyseByNok(nokId);
    res.json(rcas);
  } catch (err) {
    res.status(404).json({ error: 'No NOK found' });
  }
};

// Create a New Analyse
const addAnalyse = async (req: ExtendedRequest, res: Response) => {
  const costData: unknown[] = req.body as unknown[];
  try {
    const result = await nokAnalyseServices.createNokAnalyse(costData);
    res.status(201).json(result);
  } catch (err: unknown) {
    let errorMessage = 'Something went wrong.';
    if (err instanceof Error) {
      errorMessage += err.message;
    }
    res.status(409).json({ error: `${errorMessage}` });
  }
};

// Remove a Analyse
const deleteAnalyse = async (req: ExtendedRequest, res: Response) => {
  const id = req.params.id;
  try {
    const result = await nokAnalyseServices.deleteAnalyse(Number(id));
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: 'Analyse not found' });
  }
};

// Update Analyse Status
const updateAnalyseStatue = async (req: ExtendedRequest, res: Response) => {
  const id = req.params.id;
  const analyseStatus: unknown[] = req.body as unknown[];

  try {
    const result = await nokAnalyseServices.updateAnalyseStatue(Number(id), analyseStatus);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: 'Analyse not found' });
  }
};

export default {
  getAllAnalyses,
  getAnalyse,
  getNokAnalyseByNok,
  addAnalyse,
  deleteAnalyse,
  updateAnalyseStatue,
};
